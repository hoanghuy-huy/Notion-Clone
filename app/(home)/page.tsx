import { Heading, SuperDuperHero } from "./_components";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center gap-y-6 flex-1 px-9 pb-10 md:px-14 lg:px-28">
        <Heading />
        <SuperDuperHero />
      </div>
    </div>
  );
}
