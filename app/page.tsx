import { Hero } from "@/components/hero";
import { HomeCta } from "@/components/home-cta";
import { HomeJobMarket } from "@/components/home-job-market";
import { HomeMethod } from "@/components/home-method";
import { HomePrograms } from "@/components/home-programs";
import { HomeProjects } from "@/components/home-projects";
import { HomeSupport } from "@/components/home-support";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <HomeJobMarket />
      <HomePrograms />
      <HomeMethod />
      <HomeProjects />
      <HomeSupport />
      <HomeCta />
    </main>
  );
}
