// @ts-nocheck
import React, { useRef, useEffect } from 'react';

export function ParticleImage({
  src,
  resolution = 4,
  particleSize = 2,
  mouseRadius = 80,
  repelForce = 15,
  springSpeed = 0.06,
  friction = 0.85,
  className = "w-full h-full block "
}) {
  const canvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);
  const particlesRef = useRef([]);
  const imageObjRef = useRef(null);
  
  // Store config in a ref so the animation loop always has the latest values
  // without needing to restart or re-bind closures on every render.
  const configRef = useRef({ resolution, particleSize, mouseRadius, repelForce, springSpeed, friction });

  // Interaction state
  const mouseRef = useRef({
    x: null,
    y: null,
    vx: 0,
    vy: 0,
    lastX: null,
    lastY: null
  });

  // Update config ref when props change
  useEffect(() => {
    configRef.current = { resolution, particleSize, mouseRadius, repelForce, springSpeed, friction };
  }, [resolution, particleSize, mouseRadius, repelForce, springSpeed, friction]);

  // Handle re-rendering particles if the resolution or image changes
  useEffect(() => {
    if (!src) return;

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = src;

    image.onload = () => {
      imageObjRef.current = image;
      initParticles();
    };

    // Clean up on unmount
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [src, resolution]); // Re-run if src or resolution (density) changes

  // Particle Class
  class Particle {
    constructor(x, y, color) {
      this.originX = x;
      this.originY = y;
      this.x = x + (Math.random() * 200 - 100);
      this.y = y + (Math.random() * 200 - 100);
      this.color = color;
      
      this.vx = 0;
      this.vy = 0;
      this.randomEaseOffset = Math.random() * 0.05 - 0.025;
      this.randomDensityOffset = Math.random() * 5;
      this.radiusOffset = (Math.random() - 0.5) * 40; // Fuzziness of the hover edge
    }

    update(mouse, config) {
      if (mouse.x != null && mouse.y != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let effectiveRadius = config.mouseRadius + this.radiusOffset;

        if (distance < effectiveRadius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          
          let normalizedDist = distance / effectiveRadius;
          let baseForce = Math.max(0, 1 - normalizedDist);
          let force = baseForce * baseForce; // Quadratic soft falloff
          
          let mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
          let speedMultiplier = Math.min(mouseSpeed * 0.4, 3);
          let dynamicForce = force * speedMultiplier;
          
          let directionX = forceDirectionX * dynamicForce * (config.repelForce + this.randomDensityOffset);
          let directionY = forceDirectionY * dynamicForce * (config.repelForce + this.randomDensityOffset);
          
          this.vx -= directionX;
          this.vy -= directionY;

          this.vx += mouse.vx * force * 0.15;
          this.vy += mouse.vy * force * 0.15;
        }
      }

      let currentEase = Math.max(0.01, config.springSpeed + this.randomEaseOffset);
      this.vx += (this.originX - this.x) * currentEase;
      this.vy += (this.originY - this.y) * currentEase;

      this.vx *= config.friction;
      this.vy *= config.friction;

      this.x += this.vx;
      this.y += this.vy;
    }

    draw(ctx, config) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, config.particleSize, config.particleSize);
    }
  }

  const initParticles = () => {
    const canvas = canvasRef.current;
    const image = imageObjRef.current;
    if (!canvas || !image || image.width === 0 || image.height === 0) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Set actual canvas size to match its CSS display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    particlesRef.current = [];
    
    const maxSize = Math.max(100, Math.min(canvas.width, canvas.height, 500));
    const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    
    const processWidth = Math.max(1, Math.floor(image.width * scale));
    const processHeight = Math.max(1, Math.floor(image.height * scale));

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = processWidth;
    offscreenCanvas.height = processHeight;
    const offCtx = offscreenCanvas.getContext('2d');
    
    offCtx.drawImage(image, 0, 0, processWidth, processHeight);
    const imageData = offCtx.getImageData(0, 0, processWidth, processHeight);
    const data = imageData.data;

    const offsetX = (canvas.width - processWidth) / 2;
    const offsetY = (canvas.height - processHeight) / 2;

    const step = configRef.current.resolution;

    for (let y = 0; y < processHeight; y += step) {
      for (let x = 0; x < processWidth; x += step) {
        const index = (y * processWidth + x) * 4;
        const alpha = data[index + 3];
        
        if (alpha > 128) {
          const red = data[index];
          const green = data[index + 1];
          const blue = data[index + 2];
          const color = `rgb(${red}, ${green}, ${blue})`;
          
          particlesRef.current.push(new Particle(x + offsetX, y + offsetY, color));
        }
      }
    }

    // Start animation if not already running
    if (!animationFrameIdRef.current) {
      animate();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const mouse = mouseRef.current;
    const config = configRef.current;

    // Calculate smooth mouse velocity
    if (mouse.x !== null) {
      let instVx = mouse.x - (mouse.lastX !== null ? mouse.lastX : mouse.x);
      let instVy = mouse.y - (mouse.lastY !== null ? mouse.lastY : mouse.y);
      
      mouse.vx = (mouse.vx * 0.7) + (instVx * 0.3);
      mouse.vy = (mouse.vy * 0.7) + (instVy * 0.3);

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    } else {
      mouse.vx *= 0.7;
      mouse.vy *= 0.7;
      mouse.lastX = null;
      mouse.lastY = null;
    }
    
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(mouse, config);
      particles[i].draw(ctx, config);
    }
    
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  // Event Handlers for pointer interactions
  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    
    // Handle both touch and mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const mouse = mouseRef.current;
    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;

    if (e.type === 'touchstart') {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    }
  };

  const handlePointerLeave = () => {
    const mouse = mouseRef.current;
    mouse.x = null;
    mouse.y = null;
  };

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (imageObjRef.current) {
        initParticles();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handlePointerMove}
      onTouchMove={(e) => {
        // e.preventDefault() is often needed on canvas to stop scrolling, 
        // but React synthetic events are passive by default. 
        // Best handled via CSS `touch-action: none` on the wrapper if needed.
        handlePointerMove(e);
      }}
      onTouchEnd={handlePointerLeave}
      style={{ touchAction: 'none' }} // Prevents mobile scrolling while swiping on the canvas
    />
  );
}