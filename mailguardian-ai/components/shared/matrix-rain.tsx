'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GLYPHS = '01ABCDEF0123456789<>/{}#$%'.split('');

/**
 * Very low-contrast falling-glyph canvas. Pauses when off-screen and is
 * skipped entirely when the visitor prefers reduced motion.
 */
export function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 15;
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.ceil(width / fontSize) }, () => Math.random() * -40);
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || time - last < 70) return;
      last = time;

      // Fade previous frame while keeping the canvas transparent
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.font = `${fontSize}px "JetBrains Mono Variable", ui-monospace, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillStyle = Math.random() > 0.96 ? '#9a64f7' : '#31dff6';
        ctx.fillText(glyph, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
}
