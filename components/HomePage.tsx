"use client";

import { useState } from "react";

export default function HomePage() {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center w-full h-screen max-h-[1080px] overflow-hidden">
        {/* Video Background */}
        <video
          src="/videos/Innovative Disruption.mp4"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoReady ? "opacity-100" : "opacity-0"} -z-10`}
          autoPlay
          muted
          loop
          onCanPlay={() => setIsVideoReady(true)}
        />

        {/* Image Placeholder */}
        {!isVideoReady && (
          <img
            src="/video-placeholder.png"
            alt="Video placeholder"
            className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          />
        )}

        {/* Hero Text */}
        <div className="relative z-10 text-center text-white max-w-[700px] p-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            Where Innovation Knows No Bounds
          </h1>
          <p className="text-lg md:text-2xl mt-4">
            ...driving the future, today
          </p>
        </div>
      </section>

      {/* Top Solutions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[700px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Top Solutions</h2>
          <div className="grid grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Solution One</h3>
              <p>Placeholder text for the first top solution.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Solution Two</h3>
              <p>Placeholder text for the second top solution.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Solution Three</h3>
              <p>Placeholder text for the third top solution.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
