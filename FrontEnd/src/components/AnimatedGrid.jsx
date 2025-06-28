import React from 'react';
import './AnimatedGrid.css'; 

const AnimatedGrid = () => {
  const dots = Array.from({ length: 100 });

  return (
    <div className="animated-grid">
      {dots.map((_, i) => (
        <span key={i} className="dot" />
      ))}
    </div>
  );
};

export default AnimatedGrid;
