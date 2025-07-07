import { AtSign, Images, Smile } from "lucide-react";
import { ContentSection, Header, Heading, SuperDuperHero } from "./_components";
import { IItemSection } from "../../constants/ui";

export default function Home() {
  const dataListItem: IItemSection[] = [
    {
      id: 1,
      title: "Building blocks",
      description: "100+ content types to communicate any idea.",
      icon: <Images size={50} strokeWidth={1} />,
    },
    {
      id: 2,
      title: "Collaborative tools",
      description: "Built for teams to share, suggest, and comment.",
      icon: <AtSign size={50} strokeWidth={1} />,
    },
    {
      id: 3,
      title: "AI-assisted",
      description: "Edit, draft, translate. Ask and AI will help.",
      icon: <Smile size={50} strokeWidth={1} />,
    },
  ];
  const dataListItemSection2: IItemSection[] = [
    {
      id: 1,
      title: "Teamspaces",
      description: "Dedicated spaces for every team & project.",
      icon: <Images size={50} strokeWidth={1} />,
    },
    {
      id: 2,
      title: "Integrations",
      description: "Connected to all your other tools.",
      icon: <AtSign size={50} strokeWidth={1} />,
    },
    {
      id: 3,
      title: "Just ask AI",
      description: "Trusted answers across your apps.",
      icon: <Smile size={50} strokeWidth={1} />,
    },
  ];
  return (
    <div className="min-h-full flex flex-col ">
      <Header />
      <div className="flex flex-col items-center gap-y-12 flex-1 px-9 pb-10 md:px-14 lg:px-28 dark:text-black dark:bg-white ">
        <Heading />
        <SuperDuperHero />
        <ContentSection
          title="Build perfect docs, together."
          description="Capture your ideas, get feedback from teammates, and ask AI to add the
          finishing touches."
          items={dataListItem}
          media={[
            { type: "video", name: "mobile", src: "/write-screen-mobile.mp4" },
            {
              type: "video",
              name: "desktop",
              src: "/write-screen-desktop.mp4",
            },
          ]}
        />

        <ContentSection
          title="Find everything. Instantly."
          description="No more endless searching. Our built-in AI finds what you're looking for, whether its stored in Notion or one of your other apps."
          items={dataListItemSection2}
          media={[
            {
              type: "image",
              name: "mobile",
              src: "/organize-screen-mobile.avif",
            },
            {
              type: "image",
              name: "desktop",

              src: "/contentSection-2-desktop.png",
            },
          ]}
        />
      </div>
    </div>
  );
}
