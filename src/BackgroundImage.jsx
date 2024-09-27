// BackgroundImage.jsx
import React from 'react';
import backGroundImage from './assets/bunker-neonwhite.jpg';

const BackgroundImage = () => {
  return (
    <div
      className="w-screen h-screen bg-center bg-cover bg-no-repeat brightness-[0.1]"
      style={{
        backgroundImage: `url(${backGroundImage})`,
      }}
    />
  );
};

export default BackgroundImage;