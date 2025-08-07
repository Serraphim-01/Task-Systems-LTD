"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export function VideoHero() {
  const [startTyping, setStartTyping] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const [videoHeight, setVideoHeight] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const text1 = "We build Innovative Technology";
  const text2 = "for a better future";

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (startTyping) {
      const timer = setTimeout(() => {
        setShowSecondText(true);
      }, text1.length * 50 + 500);
      return () => clearTimeout(timer);
    }
  }, [startTyping]);

  // Measure the video height dynamically
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (video && container) {
        const height = video.getBoundingClientRect().height;
        setVideoHeight(height);
        container.style.height = `${height}px`;
      }
    });

    resizeObserver.observe(video);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-all duration-500 ease-in-out overflow-hidden"
      style={{ height: videoHeight ?? 'auto' }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto object-cover"
      >
        <source src="/videos/Innovative Disruption.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-start justify-center text-left text-white">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: startTyping ? 'blur(0px)' : 'blur(10px)', opacity: startTyping ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="max-w-[600px] ml-8 space-y-4"
        >
          {startTyping && (
            <>
              <h1 className="text-5xl md:text-7xl font-bold" style={{ color: '#ffbb00' }}>
                <TypeAnimation
                  sequence={[text1]}
                  wrapper="span"
                  speed={50}
                  cursor={false}
                />
              </h1>
              {showSecondText && (
                <h2 className="text-3xl md:text-5xl font-semibold">
                  <TypeAnimation
                    sequence={[text2]}
                    wrapper="span"
                    speed={50}
                    cursor={false}
                  />
                </h2>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
