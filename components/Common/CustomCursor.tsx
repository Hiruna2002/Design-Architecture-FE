'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = {
    damping: 25,
    stiffness: 250,
    mass: 0.5,
  };

  const circleX = useSpring(mouseX, springConfig);
  const circleY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on devices with a real mouse
    const mediaQuery = window.matchMedia('(pointer: fine)');

    if (!mediaQuery.matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const interactiveElement = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      );

      setHovering(!!interactiveElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Small center dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 0.6 : 1,
        }}
        transition={{
          duration: 0.15,
        }}
        className="
          hidden
          md:block
          fixed
          top-0
          left-0
          z-[100000]
          w-2
          h-2
          -ml-1
          -mt-1
          rounded-full
          bg-[#a3e635]
          pointer-events-none
        "
      />

      {/* Smooth outer circle */}
      <motion.div
        style={{
          x: circleX,
          y: circleY,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.6 : 1,
          backgroundColor: hovering
            ? 'rgba(163, 230, 53, 0.12)'
            : 'rgba(163, 230, 53, 0)',
        }}
        transition={{
          opacity: {
            duration: 0.2,
          },
          scale: {
            duration: 0.2,
          },
          backgroundColor: {
            duration: 0.2,
          },
        }}
        className="
          hidden
          md:block
          fixed
          top-0
          left-0
          z-[99999]
          w-9
          h-9
          -ml-[18px]
          -mt-[18px]
          rounded-full
          border
          border-[#a3e635]
          pointer-events-none
        "
      />
    </>
  );
}