// src/components/CanvasAnimation.tsx
import React, { useRef, useEffect } from 'react';

/**
 * This component renders a gradient background and a single white circle at the center
 * that pulsates. The circle slowly shrinks from a larger radius to a smaller one,
 * then quickly expands back again, creating a "shockwave" ring each time it expands.
 * The rendering is done on an offscreen canvas with a low resolution and then
 * scaled up for performance optimization.
 */
const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define the base simulation size for the offscreen canvas
  const BASE_SIM_SIZE = 55;
  const ifMobile = window.innerWidth <= 768; // Adjust breakpoint as needed

  useEffect(() => {
    // --- Offscreen Canvas Setup ---
    const mainCanvas = canvasRef.current;
    if (!mainCanvas) return;
    const mainCtx = mainCanvas.getContext('2d');
    if (!mainCtx) return;

    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    if (!offCtx) return;

    let simWidth = 0;
    let simHeight = 0;

    // Circle pulsation parameters
    let circleRadius = 0; // Will be set in setCanvasSize
    let minRadius = 0;    // Will be set in setCanvasSize
    let maxRadius = 0;    // Will be set in setCanvasSize
    let shrinking = true;

    // Define speeds and thresholds
    const shrinkSpeed = 0.1;
    const expandSpeed = 0.8;

    // Shockwave ring interface
    interface Shockwave {
      radius: number;
      alpha: number;
    }
    const shockwaves: Shockwave[] = [];

    // Draw gradient on the offscreen canvas
    const drawGradient = () => {
      const width = offCanvas.width;
      const height = offCanvas.height;

      // Create linear gradient (top -> bottom)
      const gradient = offCtx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(1, 'turquoise'); // Top
      gradient.addColorStop(0.3, 'white');   // Middle
      gradient.addColorStop(0.7, 'white');   // Middle
      gradient.addColorStop(0, 'coral');     // Bottom

      offCtx.fillStyle = gradient;
      offCtx.fillRect(0, 0, width, height);
    };

    // Set canvas size and update simulation dimensions
    const setCanvasSize = () => {
      if (!mainCanvas.parentElement) return;

      const parentWidth = mainCanvas.parentElement.clientWidth;
      const parentHeight = mainCanvas.parentElement.clientHeight;

      // Set main canvas size
      mainCanvas.width = parentWidth;
      mainCanvas.height = parentHeight;

      // Determine aspect ratio
      const aspect = parentWidth / parentHeight;

      if (aspect >= 1) {
        // Wide or square
        simWidth = BASE_SIM_SIZE;
        simHeight = Math.round(BASE_SIM_SIZE / aspect);
      } else {
        // Tall
        simWidth = Math.round(BASE_SIM_SIZE * aspect);
        simHeight = BASE_SIM_SIZE;
      }

      // Set offscreen canvas size
      offCanvas.width = simWidth;
      offCanvas.height = simHeight;

      // Define initial circle sizes based on simWidth
      // You can tweak these numbers to get the desired pulsation range
      circleRadius = ifMobile ? simWidth / 3 : simWidth / 6;
      minRadius = circleRadius / 2;
      maxRadius = circleRadius * 2;

      // Redraw background gradient
      drawGradient();
    };

    // Update the center circle's radius
    const updateCenterCircle = () => {
      if (shrinking) {
        circleRadius -= shrinkSpeed;
        if (circleRadius <= minRadius) {
          // Switch to expanding
          shrinking = false;

          // Create a shockwave ring
          shockwaves.push({
            radius: circleRadius,
            alpha: 1.0,
          });
        }
      } else {
        circleRadius += expandSpeed;
        if (circleRadius >= maxRadius) {
          // Switch to shrinking
          shrinking = true;
        }
      }
    };

    // Draw the center circle on the offscreen canvas
    const drawCenterCircle = () => {
      offCtx.beginPath();
      offCtx.arc(
        offCanvas.width / 2,
        offCanvas.height / 2,
        circleRadius,
        0,
        2 * Math.PI,
        false
      );
      offCtx.fillStyle = 'white';
      offCtx.fill();
    };

    // Update and draw all shockwave rings
    const updateAndDrawShockwaves = () => {
      // Each shockwave expands outward and fades
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const ring = shockwaves[i];
        ring.radius += 1.0;      // expand ring
        ring.alpha -= 0.01;      // fade out

        // Draw ring
        offCtx.beginPath();
        offCtx.arc(
          offCanvas.width / 2,
          offCanvas.height / 2,
          ring.radius,
          0,
          2 * Math.PI,
          false
        );
        if(ifMobile){
          offCtx.lineWidth = 4;
        }else{
          offCtx.lineWidth = 2;
        }
        offCtx.strokeStyle = `rgba(255, 255, 255, ${ring.alpha})`;
        offCtx.stroke();

        // Remove ring if fully transparent
        if (ring.alpha <= 0) {
          shockwaves.splice(i, 1);
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear the offscreen canvas
      offCtx.clearRect(0, 0, offCanvas.width, offCanvas.height);

      // Redraw the gradient background
      drawGradient();

      // Update states
      updateCenterCircle();

      // Draw the center circle
      drawCenterCircle();

      // Update & draw shockwaves
      updateAndDrawShockwaves();

      // Draw the offscreen canvas onto the main canvas
      mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      mainCtx.imageSmoothingEnabled = true; // Enable scaling smoothness
      mainCtx.drawImage(
        offCanvas,
        0, 
        0, 
        simWidth, 
        simHeight,
        -60, 
        0, 
        mainCanvas.width + 120, 
        mainCanvas.height
      );

      // Optional filter usage
      mainCtx.filter = 'url(#discrete) hue-rotate(0deg) grayscale(0%)';

      requestAnimationFrame(animate);
    };

    // Initialize
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <>
      {/* SVG Filter Definitions (optional, can be kept or removed) */}
      <svg height="0" width="0">
        <defs>
          <filter id="discrete">
            <feGaussianBlur stdDeviation="32"></feGaussianBlur>
            <feComponentTransfer>
                <feFuncR type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9"></feFuncR>
                <feFuncG type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9"></feFuncG>
                <feFuncB type="discrete" tableValues="0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9"></feFuncB>
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="1"></feGaussianBlur>
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
          backgroundColor: 'white', // Optional background color
        }}
      />
    </>
  );
};

export default CanvasAnimation;