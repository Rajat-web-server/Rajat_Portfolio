import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <div className="space-y-6">
      <Hero />
      <Skills />
    </div>
  );
}