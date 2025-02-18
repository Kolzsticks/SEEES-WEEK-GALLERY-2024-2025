"use client"; // This must be a Client Component to use `useState`

import { useState } from "react";
import Confetti from "react-confetti-boom";
import React from "react";
import { createPortal } from "react-dom"; // Import createPortal for rendering outside the component

export default function GalleryButton() {
  const [isExploding, setIsExploding] = React.useState(false); // State to control confetti explosion

  // Handle button click to trigger confetti
  const handleCelebrate = () => {
    setIsExploding(true); // Activate confetti explosion

    // Deactivate confetti after 3 seconds (default duration of the explosion)
    setTimeout(() => {
      setIsExploding(false);
    }, 10000); // Confetti explosion runs for 3 seconds
  };

  return (
    <>
      {/* Confetti Explosion Component */}
      {isExploding && createPortal(
        <Confetti
        particleCount={500}
        shapeSize={12}
        mode='boom'
        colors={['#ff577f', '#ff884b', '#ffd384', '#781bbb']}
       spreadDeg={360}
       effectCount={3}
        />,
         document.body)}

      {/* Button */}
      <button
        className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
        onClick={handleCelebrate} // Trigger confetti on click
      >
        Celebrate the Moment! {/* Updated button text */}
      </button>
    </>
  );
}
