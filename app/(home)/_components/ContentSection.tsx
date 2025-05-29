import { IItemSection } from "@/app/constants";
import Image from "next/image";
import React from "react";

type TypeMedia = {
  type: "video" | "image";
  name: "mobile" | "desktop";
  src: string;
};
interface IContentSectionProps {
  title: string;
  description: string;
  items?: IItemSection[];
  media: TypeMedia[];
}
const ContentSection: React.FC<IContentSectionProps> = ({
  title,
  description,
  items,
  media,
}) => {
  const mediaMobile = media.find((v) => v.name === "mobile");
  const mediaDesktop = media.find((v) => v.name === "desktop");

  if (!mediaMobile || !mediaDesktop) {
    throw new Error("ContentSection requires both mobile and desktop medias.");
  }

  const renderListItemSection = () => {
    return items?.map((item) => {
      return (
        <div
          key={item.id}
          className="flex gap-x-5 p-4 md:flex-col md:h-[250px] "
        >
          <div>
            <div className="lg:!text-[80px]">{item.icon}</div>
          </div>
          <div>
            <div className="text-xl font-semibold">{item.title}</div>
            <div className="text-gray-500">{item.description}</div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="max-w-7xl flex flex-col sm:justify-center md:flex-row md:flex-wrap gap-y-5">
      <div className="order-1 w-full flex flex-col justify-center pt-[80px] gap-y-3 md:w-[50%] md:items-center lg:items-start lg:justify-start lg:w-[50%]">
        <h1 className="title-h1 md:text-start">
          {title}
          <br />
        </h1>
        <p className="text-xl text-gray-500 font-normal md:max-w-md md:text-center lg:text-left lg:max-w-none">
          {description}
        </p>
      </div>
      <div className="order-2 md:order-3 w-full rounded-xl overflow-hidden border border-gray-200 shadow-lg  flex lg:items-end lg:justify-end">
        {mediaMobile.type === "image" ? (
          <Image
            src={mediaMobile.src}
            alt="media"
            height={1080}
            width={1920}
            className="block md:hidden h-full w-full object-cover"
          />
        ) : (
          <video
            width="100%"
            preload="metadata"
            playsInline
            muted
            autoPlay
            className="block md:hidden "
            src={mediaMobile.src}
          ></video>
        )}

        {mediaDesktop.type === "image" ? (
          <Image
            src={mediaDesktop.src}
            alt="media"
            height={1080}
            width={1920}
            className="hidden md:block h-full w-full object-cover"
          />
        ) : (
          <video
            width="100%"
            preload="metadata"
            playsInline
            muted
            autoPlay
            className="hidden md:block"
            src={mediaDesktop.src}
          >

          </video>
        )}
      </div>

      <div className="order-3 md:order-2 md:w-[50%] md:flex md:items-end">
        {renderListItemSection()}
      </div>
    </div>
  );
};

export default ContentSection;
