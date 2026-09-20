'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface InitialLoaderProps {
  children: React.ReactNode;
}

export default function InitialLoader({
  children,
}: InitialLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: 'easeInOut',
              },
            }}
            className="fixed inset-0 z-[9999] bg-[#0f172a] flex items-center justify-center"
          >
            <div className="flex flex-col items-center px-6">

              {/* Logo */}
              <motion.img
                src="/images/111.png"
                alt="LS Master Builders"
                initial={{
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
                className="w-52 sm:w-60 md:w-72 h-auto object-contain"
              />

              {/* Loading Line */}
              <div className="relative mt-8 w-52 sm:w-64 h-[3px] overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    x: '-100%',
                  }}
                  animate={{
                    x: '100%',
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-[#a3e635] rounded-full"
                />

              </div>

              {/* Loading Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="mt-5 text-sm tracking-[0.3em] uppercase text-gray-400"
              >
                Loading
              </motion.p>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}