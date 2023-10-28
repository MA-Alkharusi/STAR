import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/rocket.json';

function RocketAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="rocket-animation">
      <Lottie options={defaultOptions} height={250} width={250} />
    </div>
  );
}

export default RocketAnimation;
