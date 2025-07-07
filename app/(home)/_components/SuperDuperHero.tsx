"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { ISlide } from "@/types/ui";
import { BookText, CalendarDays, Target, TrainFront } from "lucide-react";
import { type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
const HeroItems: ISlide[] = [
  {
    id: 0,
    src: "/slide-docs.avif",
    alt: "Docs",
    icon: <BookText />,
  },
  {
    id: 1,
    src: "/slide-ai.avif",
    alt: "Ai",
    icon: <TrainFront />,
  },
  {
    id: 2,
    src: "/slide-calender.avif",
    alt: "Calender",
    icon: <CalendarDays />,
  },
  {
    id: 3,
    src: "/slide-project.avif",
    alt: "Projects",
    icon: <Target />,
  },
];

const renderSlider = () => {
  return HeroItems.map((item) => {
    return (
      <CarouselItem key={item.id}>
        <Image
          src={item.src}
          alt={item.alt}
          width={1920}
          height={1080}
          className="object-cover"
        />
      </CarouselItem>
    );
  });
};

const renderButtons = (
  api: CarouselApi,
  currentIndex: number,
  autoplay: AutoplayType
) => {
  return HeroItems.map((item) => {
    return (
      <Button
        onClick={() => {
          api?.scrollTo(item.id);
          autoplay.reset();
        }}
        className={cn({
          "dark:bg-black dark:text-white": true,
          "mx-2": true,
          "!bg-gray-300 !text-black": currentIndex === item.id,
        })}
        key={item.id}
        variant={"outline"}
      >
        {item.icon} {item.alt}
      </Button>
    );
  });
};
const SuperDuperHero = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const autoplay = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
  });

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full mt-5">
      <div className="rounded-xl border overflow-hidden shadow-md">
        <Carousel
          setApi={setApi}
          plugins={[autoplay]}
          className="pt-12 ps-12 bg-neutral-100 rounded-xl lg:pt-0 lg:ps-0"
        >
          <CarouselContent className="rounded-xl">
            {renderSlider()}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="w-full mt-3 flex justify-center">
        {renderButtons(api, current, autoplay)}
      </div>
    </div>
  );
};

export default SuperDuperHero;
