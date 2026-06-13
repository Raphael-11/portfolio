'use client';
import { cn } from '@/lib/utils';
import { type ReactNode, createRef, useRef } from 'react';

interface ImageMouseTrailProps {
  items: string[];
  children?: ReactNode;
  className?: string;
  imgClass?: string;
  distance?: number;
  maxNumberOfImages?: number;
  fadeAnimation?: boolean;
}
export default function ImageMouseTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = 'w-20 h-28',
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()));
  const currentZIndexRef = useRef(1);
  const globalIndexRef = useRef(0);
  const lastRef = useRef({ x: 0, y: 0 });

  const activate = (image: HTMLImageElement, x: number, y: number) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;

    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;

    image.dataset.status = 'active';
    image.style.opacity = '1';
    image.style.transform = 'translate(-50%, -50%) scale(1)';
    if (fadeAnimation) {
      setTimeout(() => {
        image.dataset.status = 'inactive';
        image.style.opacity = '0';
        image.style.transform = 'translate(-50%, -50%) scale(0)';
      }, 1500);
    }
    lastRef.current = { x, y };
  };

  const distanceFromLast = (x: number, y: number) => {
    return Math.hypot(x - lastRef.current.x, y - lastRef.current.y);
  };

  const deactivate = (image: HTMLImageElement) => {
    image.dataset.status = 'inactive';
    image.style.opacity = '0';
    image.style.transform = 'translate(-50%, -50%) scale(0)';
  };

  const handleOnMove = (e: { clientX: number; clientY: number }) => {
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / distance) {
      const globalIndex = globalIndexRef.current;

      const lead = refs.current[globalIndex % refs.current.length].current;

      const tailIndex = globalIndex - maxNumberOfImages;
      const normalizedTailIndex =
        tailIndex >= 0 ? tailIndex % refs.current.length : -1;
      const tail =
        normalizedTailIndex >= 0
          ? refs.current[normalizedTailIndex]?.current
          : null;

      if (lead) activate(lead, e.clientX, e.clientY);
      if (tail) deactivate(tail);
      globalIndexRef.current += 1;
    }
  };

  return (
    <section
      onMouseMove={handleOnMove}
      onTouchMove={(e) => handleOnMove(e.touches[0])}
      ref={containerRef}
      className={cn(
        'grid place-content-center h-[600px] w-full bg-[#e0dfdf] relative overflow-hidden rounded-lg',
        className
      )}
    >
      {items.map((item, index) => (
        <img
          key={`${item}-${index}`}
          className={cn(
            "absolute -translate-x-[50%] -translate-y-[50%] scale-0 object-cover opacity-0 transition-[transform,opacity] duration-300 ease-out data-[status='active']:scale-100 data-[status='active']:opacity-100 data-[status='active']:duration-500 data-[status='active']:[transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
            imgClass
          )}
          data-index={index}
          data-status='inactive'
          src={item}
          alt={`image-${index}`}
          ref={refs.current[index]}
          style={{
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        />
      ))}
      {children}
    </section>
  );
}
