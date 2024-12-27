// src/components/CanvasAnimation.tsx
import React, { useRef, useEffect } from 'react';

/**
 * This component renders a dynamic Perlin noise-based colorful background.
 * The noise is generated on a low-resolution offscreen canvas (max 100px in the short dimension),
 * maintaining the aspect ratio of the main canvas. The result is upscaled onto the main canvas
 * with a gradient between turquoise, white, and coral colors.
 * An SVG filter is applied to enhance the visual aesthetics.
 */

/** Base resolution in the "short" dimension for the simulation. */
const BASE_SIM_SIZE = 64;

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // --- ImprovedNoise Class Implementation ---
    class ImprovedNoise {
      p: number[] = [];

      constructor() {
        const permutation: number[] = [
          151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,
          8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
          35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
          134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,
          55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,
          18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,
          250,124,123,5,202,38,147,118,126,255,82,85,12,207,206,59,227,47,16,58,17,182,
          189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,
          172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
          228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
          107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
          138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
        ];

        // Initialize permutation array
        for (let i = 0; i < 256; i++) {
          this.p[256 + i] = this.p[i] = permutation[i];
        }
      }

      noise(x: number, y: number, z: number): number {
        const X = Math.floor(x) & 255,
              Y = Math.floor(y) & 255,
              Z = Math.floor(z) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x),
              v = this.fade(y),
              w = this.fade(z);
        const A = this.p[X] + Y,
              AA = this.p[A] + Z,
              AB = this.p[A + 1] + Z,
              B = this.p[X + 1] + Y,
              BA = this.p[B] + Z,
              BB = this.p[B + 1] + Z;

        return this.lerp(
          w,
          this.lerp(
            v,
            this.lerp(u, this.grad(this.p[AA], x, y, z), this.grad(this.p[BA], x - 1, y, z)),
            this.lerp(u, this.grad(this.p[AB], x, y - 1, z), this.grad(this.p[BB], x - 1, y - 1, z))
          ),
          this.lerp(
            v,
            this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1), this.grad(this.p[BA + 1], x - 1, y, z - 1)),
            this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1), this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))
          )
        );
      }

      fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }

      lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
      }

      grad(hash: number, x: number, y: number, z: number): number {
        const h = hash & 15;
        const u = h < 8 ? x : y,
              v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
      }
    }

    // --- HSL to RGB Conversion Function ---
    const hslToRgb = (h: number, s: number, l: number) => {
      s /= 100;
      l /= 100;

      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;

      if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }

      return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
      };
    };

    // --- Main Canvas Setup ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Offscreen canvas for Perlin noise background
    const perlinOffCanvas = document.createElement('canvas');
    const perlinOffCtx = perlinOffCanvas.getContext('2d');
    if (!perlinOffCtx) return;

    // Perlin noise generator
    const noise = new ImprovedNoise();
    let perlinT = 0;

    // Current dimensions of the simulation
    let simWidth = 0;
    let simHeight = 0;
    let cols = 0;
    let rows = 0;

    // Initialize simulation grids
    const initGrids = () => {
      // No grids needed for Perlin noise; this function is kept for potential future use
    };

    // Dynamically size the main canvas and keep the simulation ratio consistent
    const setCanvasSize = () => {
      if (!canvas.parentElement) return;

      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;

      // Maintain same aspect ratio in the simulation as the main canvas
      const aspect = canvas.width / canvas.height;

      // Define the "short" dimension as BASE_SIM_SIZE
      if (aspect >= 1) {
        // Wide or square
        simWidth = BASE_SIM_SIZE;
        simHeight = Math.round(BASE_SIM_SIZE / aspect);
      } else {
        // Tall
        simWidth = Math.round(BASE_SIM_SIZE * aspect);
        simHeight = BASE_SIM_SIZE;
      }

      // Set offscreen canvas size based on simulation dimensions
      perlinOffCanvas.width = simWidth;
      perlinOffCanvas.height = simHeight;

      // Update the number of columns and rows based on offscreen canvas size
      cols = simWidth;
      rows = simHeight;

      // Initialize grids if necessary
      initGrids();
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Draw the Perlin noise background to the offscreen context
    const drawPerlinNoise = () => {
        const imageData = perlinOffCtx.createImageData(cols, rows);
      
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const index = (j * cols + i) * 4;
      
            // Generate a Perlin noise value for the current grid cell
            const value = noise.noise(i / 50, j / 50, perlinT / 1200); // Increased divisor from 200 to 500 for slower movement
      
            // Normalize the noise value to [0, 1]
            const normalizedValue = (value + 1) / 2;
      
            // Map the noise value to a gradient between turquoise, white, and coral
            // Turquoise: RGB(72, 219, 193)
            // White: RGB(255, 255, 255)
            // Coral: RGB(255, 133, 113)
      
            let r: number, g: number, b: number;
      
            if (normalizedValue < 0.5) {
              // Transition from turquoise to white
              const t = normalizedValue / 0.5; // [0,1]
              r = 72 + t * (255 - 72);
              g = 219 + t * (255 - 219);
              b = 193 + t * (255 - 193);
            } else {
              // Transition from white to coral
              const t = (normalizedValue - 0.5) / 0.5; // [0,1]
              r = 255; // Remains 255
              g = 255 + t * (133 - 255);
              b = 255 + t * (113 - 255);
            }
      
            imageData.data[index + 0] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = 255; // Full alpha
          }
        }
      
        perlinOffCtx.putImageData(imageData, 0, 0);
      };
      

    // Animation loop
    const animate = () => {
      // Draw Perlin noise for the current frame
      drawPerlinNoise();
      perlinT++;

      // Composite the offscreen Perlin noise canvas onto the main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply the SVG filter
      ctx.filter = 'url(#discrete) hue-rotate(190deg) grayscale(40%)';

      // Draw Perlin noise background
      ctx.imageSmoothingEnabled = true; // Smooth scaling for Perlin noise
      ctx.drawImage(perlinOffCanvas, 0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <>

<svg height="0" width="0">
  <defs>
    <filter id="discrete">
      <feGaussianBlur stdDeviation="50"></feGaussianBlur>
      <feComponentTransfer>
      <feFuncR type="discrete" tableValues="0.8 0.44559 0.129 0.787 0.9 0.78"></feFuncR>
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="60"></feGaussianBlur>
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="1 1 0.9 0.8 1 0.7"></feFuncR>
        <feFuncG type="discrete" tableValues="0.77 0.777 0.7 0.98 0.8777 0.9988"></feFuncG>
        <feFuncB type="discrete" tableValues="0.45 0.2222 0.11 0.7 0.45 0.9 0.97"></feFuncB>
      </feComponentTransfer>

      <feGaussianBlur stdDeviation="40"></feGaussianBlur>
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0.5451 1 1 0.5 0.74 0.9657"></feFuncR>
        <feFuncG type="discrete" tableValues="0.45 0.7811 0.8777 0.98 0.8777 0.9988"></feFuncG>
        <feFuncB type="discrete" tableValues="0.78 0.999 0.812 0.974154 0.7847 0.878 0.95"></feFuncB>
      </feComponentTransfer>

    </filter>
  </defs>
</svg>



      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: 'white', // Optional: Set a background color
        }}
      />
    </>
  );
};

export default CanvasAnimation;
