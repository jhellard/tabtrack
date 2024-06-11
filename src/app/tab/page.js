"use client";
import React from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Tab = () => {
  const url = "https://www.youtube.com/watch?v=xfxHeZV8BEY";

  return (
    <section>
      <h1>Tab</h1>
      <ReactPlayer url={url} controls="true" />
    </section>
  );
};

export default Tab;
