import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Hero } from "../components/Hero";
import { Leadership } from "../components/Leadership";
import { Services } from "../components/Services";
import { Stats } from "../components/Stats";
import { Trajectory } from "../components/Trajectory";
import { Waypoint } from "../components/Waypoint";
import { Why } from "../components/Why";

export function HomePage() {
  return (
    <div className="relative">
      <Trajectory />
      <Hero />
      <About />
      <Waypoint />
      <Stats />
      <Services />
      <Why />
      <Leadership />
      <Contact />
    </div>
  );
}
