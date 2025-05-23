"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Heading = () => {
  return (
    <div className="max-w-7xl flex flex-col sm:justify-center lg:flex-row">
      <div className="w-full flex flex-col justify-center pt-[80px] gap-y-3 md:items-center lg:items-start lg:justify-start  lg:w-[60%] ">
        <h1 className="text-5xl font-semibold sm:text-6xl md:max-w-md md:text-center lg:text-left lg:text-7xl lg:font-bold lg:max-w-none">
          The happier workspace
          <br />
        </h1>
        <p className="text-2xl font-medium md:max-w-md md:text-center  lg:text-left lg:max-w-none">
          Write. Plan. Collaborate. With a little help from AI.
        </p>
        <div>
          <Button className="w-full" variant={"blue"} size="lg">
            Get Notion Free
          </Button>
        </div>
        <div className="mt-6 md:text-center lg:text-start">
          <span className="text-gray-400">Trusted by teams at</span>
          <div className="flex gap-x-3 pt-2 sm:justify-evenly">
            <Image src={"/openai-v2.svg"} alt="openai" width={84} height={23} />
            <Image
              src={"/figma-color.svg"}
              alt="openai"
              width={84}
              height={23}
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[40%] flex lg:items-end lg:justify-end">
        <video width="100%" preload="metadata" playsInline muted autoPlay>
          <source src="/homepage-hero.mp4" type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
    </div>
  );
};

export default Heading;
