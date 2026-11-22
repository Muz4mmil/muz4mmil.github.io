import Nav from "./components/nav";
import JsonLd from "./components/json-ld";
import Hero from "./sections/hero";
import About from "./sections/about";
import Projects from "./sections/projects";
import Contact from "./sections/contact";

// Server component: only <Nav /> and the animated sections ship as client code.
export default function Home() {
  return (
    <div>
      <JsonLd />
      <Nav />

      <main>
        <Hero />
        <div className="bg-white w-full h-28"></div>
        <About />
        <div className="bg-white w-full h-28 max-sm:h-10"></div>
        <Projects />
        <div className="bg-white w-full h-28 max-sm:hidden"></div>
        <Contact />
      </main>
    </div>
  );
}
