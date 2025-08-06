"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export function VideoHero() {
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 1000); // Delay typing animation to allow page to settle
    return () => clearTimeout(timer);
  }, []);

  const text1 = "We build Innovative Technology";
  const text2 = "for a better future";

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="https://videos.pexels.com/video-files/854132/854132-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: startTyping ? 'blur(0px)' : 'blur(10px)', opacity: startTyping ? 1 : 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="space-y-4"
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
              <h2 className="text-3xl md:text-5xl font-semibold">
                <TypeAnimation
                  sequence={[text2]}
                  wrapper="span"
                  speed={50}
                  cursor={true}
                />
              </h2>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
