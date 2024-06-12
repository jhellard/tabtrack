"use client";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

// TODO: Add skeleton for thumbnail card to avoid layout shift
const VideoCard = ({ url }) => {
  return (
    <div className="w-[202px] border border-black shadow-lg">
      {/* Div to block playing the video in 'thumbnail' form */}
      <div className="absolute w-[200px] h-[113px] z-10"></div>
      <ReactPlayer
        width="200px"
        height="113px"
        light
        playIcon={<span></span>}
        url={url}
      />
      <button className="w-full bg-gray-500 text-white">Continue</button>
    </div>
  );
};

export default VideoCard;
