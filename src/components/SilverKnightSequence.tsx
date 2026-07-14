import React, { useEffect, useRef, useState, useCallback } from "react";

interface SilverKnightSequenceProps {
  onLoadProgress?: (loaded: number, total: number) => void;
  onReady?: () => void;
}

export default function SilverKnightSequence({ onLoadProgress, onReady }: SilverKnightSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Cache for all 240 preloaded HTMLImageElements
  const cachedFramesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  const TOTAL_FRAMES = 240;
  const readyFiredRef = useRef(false);

  // Render the current frame onto the canvas
  const drawCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const frames = cachedFramesRef.current;
    if (!canvas || frames.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure maximum crispness and high-quality scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const total = frames.length;
    const currentIndex = currentFrameIndexRef.current;
    let img = frames[currentIndex];

    // Progressive loading optimization:
    // If the target frame is not yet fully loaded, search backwards for the nearest complete frame to avoid flickering
    if (!img || !img.complete) {
      let fallbackImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < total; offset++) {
        const prevIdx = (currentIndex - offset + total) % total;
        const checkImg = frames[prevIdx];
        if (checkImg && checkImg.complete) {
          fallbackImg = checkImg;
          break;
        }
      }
      if (fallbackImg) {
        img = fallbackImg;
      }
    }

    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate "object-fit: cover" positioning
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      
      // Align to the top of the canvas (y = 0) so that the knight's head is not cropped on wide viewports
      const y = 0;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, []);

  // Preload all 240 frames sequentially before starting playback
  useEffect(() => {
    let active = true;
    const total = TOTAL_FRAMES;
    const images: HTMLImageElement[] = new Array(total);
    let loaded = 0;

    // Immediately cache the references array so the fallback search can inspect them as they load
    cachedFramesRef.current = images;

    const checkComplete = () => {
      if (!active) return;
      loaded++;
      onLoadProgress?.(loaded, total);

      // Draw the first frame as soon as it arrives so the canvas isn't blank
      if (loaded === 1) {
        setTimeout(() => {
          if (active) drawCurrentFrame();
        }, 0);
      }

      // Only transition to ready once ALL frames are loaded for a smooth experience
      if (loaded === total && !readyFiredRef.current) {
        readyFiredRef.current = true;
        setIsLoaded(true);
        drawCurrentFrame();
        onReady?.();
      }
    };

    for (let i = 1; i <= total; i++) {
      const paddedIndex = String(i).padStart(3, "0");
      const url = `/assets/silver-knight/ezgif-frame-${paddedIndex}.jpg`;
      const img = new Image();

      img.onload = () => {
        checkComplete();
      };
      img.onerror = () => {
        console.warn(`Failed to load frame ${paddedIndex}, retrying...`);
        const retryImg = new Image();
        retryImg.onload = () => {
          images[i - 1] = retryImg;
          checkComplete();
        };
        retryImg.onerror = () => {
          // If retry fails, resolve with fallback to prevent preloader from hanging
          console.error(`Failed to load frame ${paddedIndex} on retry`);
          checkComplete();
        };
        retryImg.src = url;
      };

      images[i - 1] = img;
      img.src = url;
    }

    return () => {
      active = false;
    };
  }, [drawCurrentFrame, onLoadProgress, onReady]);

  // Listen for resize using ResizeObserver to match parent bounds and scale with devicePixelRatio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      const dpr = window.devicePixelRatio || 1;

      const targetWidth = Math.round(width * dpr);
      const targetHeight = Math.round(height * dpr);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        drawCurrentFrame();
      }
    });

    resizeObserver.observe(parent);

    // Initial sizing
    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    drawCurrentFrame();

    return () => {
      resizeObserver.disconnect();
    };
  }, [drawCurrentFrame, isLoaded]);

  // Locked FPS loop playback with ping-pong/yoyo behavior
  useEffect(() => {
    if (!isLoaded || cachedFramesRef.current.length === 0) return;

    // Reset back to 30 FPS
    const targetInterval = 1000 / 30; // ~33.33ms per frame
    let lastFrameTime = performance.now();
    let animationFrameId: number;
    let isForward = true;

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastFrameTime;

      if (elapsed >= targetInterval) {
        // Adjust for timer drift
        lastFrameTime = timestamp - (elapsed % targetInterval);

        const total = cachedFramesRef.current.length;
        if (total > 1) {
          if (isForward) {
            if (currentFrameIndexRef.current < total - 1) {
              currentFrameIndexRef.current++;
            } else {
              isForward = false;
              currentFrameIndexRef.current--;
            }
          } else {
            if (currentFrameIndexRef.current > 0) {
              currentFrameIndexRef.current--;
            } else {
              isForward = true;
              currentFrameIndexRef.current++;
            }
          }
        }
        drawCurrentFrame();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded, drawCurrentFrame]);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ filter: "none", backdropFilter: "none" }}
    >
      {/* Hardware-accelerated canvas with object-cover */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          filter: "none",
          backdropFilter: "none"
        }}
        className="pointer-events-none"
      />
    </div>
  );
}
