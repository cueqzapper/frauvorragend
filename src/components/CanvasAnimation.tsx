// src/components/CanvasAnimation.tsx
import React, { useRef, useEffect } from 'react';

/**
 * This component renders a gradient background with 7 white circles at the center.
 * These circles move slowly in random directions but are always attracted back to the center,
 * ensuring they remain near the center and never disappear. The rendering is done on an offscreen
 * canvas with a low resolution and then scaled up to the main canvas for performance optimization.
 */
const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define the base simulation size for the offscreen canvas
  const BASE_SIM_SIZE = 55;

  useEffect(() => {
    // --- Utility Functions ---

    /**
     * Converts HSL color to RGB.
     * @param h Hue [0, 360)
     * @param s Saturation [0, 100]
     * @param l Lightness [0, 100]
     * @returns RGB object with r, g, b values [0, 255]
     */
    const hslToRgb = (h: number, s: number, l: number) => {
      s /= 100;
      l /= 100;

      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let r = 0,
        g = 0,
        b = 0;

      if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      }

      return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
      };
    };

    /**
     * Generates a random number between min and max.
     * @param min Minimum value
     * @param max Maximum value
     * @returns Random number
     */
    const randomBetween = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    // --- Circle Class ---
    class Circle {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, initialRadius: number) {
        this.x = x;
        this.y = y;
        this.radius = initialRadius;

        const angle = randomBetween(0, 2 * Math.PI);
        const speed = randomBetween(0.15, 0.8); // Slow speed for gentle movement
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
      }

      /**
       * Updates the circle's position by applying attraction towards the center.
       * @param centerX The x-coordinate of the center.
       * @param centerY The y-coordinate of the center.
       */
      update(centerX: number, centerY: number) {
        // Calculate the vector from the circle to the center
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1; // Prevent division by zero

        // Define the strength of the attraction
        const attractionStrength = 0.009; // Tune this value for desired effect
        const ax = (dx / distance) * attractionStrength;
        const ay = (dy / distance) * attractionStrength;

        // Add random noise to the attraction
        const noiseFactor = 0.002; // Tune this value for randomness
        const randomNoiseX = (Math.random() - 0.5) * noiseFactor;
        const randomNoiseY = (Math.random() - 0.5) * noiseFactor;

        // Update velocity with attraction and noise
        this.speedX += ax + randomNoiseX;
        this.speedY += ay + randomNoiseY;

        // Apply damping to slow down over time and prevent oscillation
        const damping = 0.9975;
        this.speedX *= damping;
        this.speedY *= damping;

        // Update position based on velocity
        this.x += this.speedX;
        this.y += this.speedY;
      }

      /**
       * Draws the circle on the canvas context.
       * @param ctx CanvasRenderingContext2D
       */
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
      }
    }

    // --- Main Canvas Setup ---
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) return;
    const mainCtx = mainCanvas.getContext('2d');
    if (!mainCtx) return;

    // --- Offscreen Canvas Setup ---
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    // Initialize simulation parameters
    let simWidth = 0;
    let simHeight = 0;

    // Initialize circles array with 7 circles
    const circles: Circle[] = [];
    const initialCircleCount = 7;

    /**
     * Initializes 7 circles at the center with different sizes.
     * @param centerX The x-coordinate of the center.
     * @param centerY The y-coordinate of the center.
     */
    const initializeCircles = (centerX: number, centerY: number) => {
      for (let i = 0; i < initialCircleCount; i++) {
        const initialRadius = randomBetween(Math.round(((centerX+centerY)/8)), Math.round(((centerX+centerY)/2.8))); // Different initial sizes
        circles.push(new Circle(centerX, centerY, initialRadius));
      }
    };

    // --- Set Canvas Sizes ---
    const setCanvasSize = () => {
      if (!mainCanvas.parentElement) return;

      const parentWidth = mainCanvas.parentElement.clientWidth;
      const parentHeight = mainCanvas.parentElement.clientHeight;

      // Set main canvas size
      mainCanvas.width = parentWidth;
      mainCanvas.height = parentHeight;

      // Determine aspect ratio
      const aspect = parentWidth / parentHeight;

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
      offCanvas.width = simWidth;
      offCanvas.height = simHeight;

      // Redraw gradient after resizing
      drawGradient();

      // Reinitialize circles at the new center
      circles.length = 0; // Clear existing circles
      initializeCircles(offCanvas.width / 2, offCanvas.height / 2);
    };

    // --- Draw Gradient on Offscreen Canvas ---
    const drawGradient = () => {
      const width = offCanvas.width;
      const height = offCanvas.height;

      // Create linear gradient from top to bottom
      const gradient = offCtx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(1, 'turquoise'); // Top
      gradient.addColorStop(0.3, 'white'); // Middle
      gradient.addColorStop(0.7, 'white'); // Middle
      gradient.addColorStop(0, 'coral'); // Bottom

      offCtx.fillStyle = gradient;
      offCtx.fillRect(0, 0, width, height);
    };

    // --- Animation Loop ---
    const animate = () => {
      // Clear the offscreen canvas
      offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);

      // Redraw the gradient background
      drawGradient();

      // Get the current center of the offscreen canvas
      const centerX = offCanvas.width / 2;
      const centerY = offCanvas.height / 2;

      // Update and draw circles
      updateAndDrawCircles(centerX, centerY);

      // Draw the offscreen canvas onto the main canvas with scaling
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCtx.imageSmoothingEnabled = true; // Enable smoothing for better scaling
      mainCtx.drawImage(
        offCanvas,
        0,
        0,
        simWidth,
        simHeight,
        -60,
        0,
        mainCanvas.width+120,
        mainCanvas.height
      );
      mainCtx.filter = 'url(#discrete) hue-rotate(0deg) grayscale(0%)';

      requestAnimationFrame(animate);
    };

    /**
     * Updates and draws all circles on the offscreen canvas.
     * @param centerX The x-coordinate of the center.
     * @param centerY The y-coordinate of the center.
     */
    const updateAndDrawCircles = (centerX: number, centerY: number) => {
      circles.forEach((circle) => {
        circle.update(centerX, centerY);
        circle.draw(offCtx);
      });
    };

    // --- Initialize Canvas Sizes and Start Animation ---
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    animate();

    // --- Cleanup on Unmount ---
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <>
      {/* SVG Filter Definitions */}
      <svg height="0" width="0">
        <defs>
          <filter id="discrete">
            <feGaussianBlur stdDeviation="15"></feGaussianBlur>
            <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9"></feFuncR>
                <feFuncG type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9"></feFuncG>
                <feFuncB type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9"></feFuncB>
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="4"></feGaussianBlur>
            <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0.07 0.37 0.89 95"></feFuncR>
                <feFuncG type="discrete" tableValues="0.07 0.37 0.89 95"></feFuncG>
                <feFuncB type="discrete" tableValues="0.07 0.37 0.89 95"></feFuncB>
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
