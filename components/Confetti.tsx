"use client"; // This must be a Client Component to use `useState` and hooks

import { useState } from "react";
import Confetti from "react-confetti"; // Import the react-confetti library
import { useWindowSize } from "react-use"; // Import the useWindowSize hook

export default function GalleryButton() {
  const [isConfettiActive, setIsConfettiActive] = useState(false); // State to control confetti
  const { width, height } = useWindowSize(); // Get window dimensions

  // Handle button click to trigger confetti
  const handleCelebrate = () => {
    setIsConfettiActive(true); // Activate confetti

    // Deactivate confetti after 5 seconds
    setTimeout(() => {
      setIsConfettiActive(false);
    }, 5000); // Confetti runs for 5 seconds
  };

  return (
    <>
      {/* Confetti Component */}
      {isConfettiActive && (
        <Confetti
          width={width} // Set confetti to cover the entire screen
          height={height}
          recycle={false} // Stop confetti after animation
          numberOfPieces={200} // Number of confetti pieces
          colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"]} // Custom colors
        />
      )}

      {/* Button */}
      <a
        className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
        href="#"
        onClick={handleCelebrate} // Trigger confetti on click
        rel="noreferrer"
      >
        Celebrate the Moment! {/* Updated button text */}
      </a>
    </>
  );
}