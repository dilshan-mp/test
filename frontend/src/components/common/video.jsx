import React from "react";

const Video = () => {
  return (
    <video
      autoPlay
      muted
      loop
      className="rotate-180  z-[-10] w-full h-full object-cover "
    >
      <source src="/blackhole.webm" type="video/webm" />
    </video>
  );
};

export default Video;
