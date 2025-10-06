import React, { useState, useEffect, useCallback, useRef } from 'react';

const NUM_PARTICLES = 30; // Number of stars/particles to render

// Utility function to get a random number within a range
const random = (min, max) => Math.random() * (max - min) + min;

const StarryCursorFollower = () => {
  const [stars, setStars] = useState([]);
  const cursorRef = useRef(null);

  // 1. Initial Star Generation
  useEffect(() => {
    const initialStars = Array.from({ length: NUM_PARTICLES }, (_, index) => ({
      id: index,
      // Initial position across the screen
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight),
      // Random size for variety
      size: random(1.5, 3.5),
      // Random animation delay/duration for the twinkle
      duration: random(1, 3),
      delay: random(0, 5),
    }));
    setStars(initialStars);
  }, []);

  // 2. Mouse Movement Handler (Follower Logic)
  const handleMouseMove = useCallback((e) => {
    if (cursorRef.current) {
      // Set the follower position slightly offset to center the visual
      cursorRef.current.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  // 3. Render the Component
  return (
      <div ref={cursorRef} className="cursor-follower">
        {/* Optional small "star" inside the follower for effect */}
        <div className="follower-inner-star" />
      </div>
  );
};

export default StarryCursorFollower;