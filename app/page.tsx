'use client'

import Hero from "./sections/hero";
import About from "./sections/about";
import Projects from "./sections/projects";
import Contact from "./sections/contact";
import { useRef } from "react";
import { motion } from 'framer-motion'

export default function Home() {
  const home = useRef<HTMLDivElement>(null)
  const about = useRef<HTMLDivElement>(null)
  const projects = useRef<HTMLDivElement>(null)
  const contact = useRef<HTMLDivElement>(null)

  const nav = [
    { name: 'HOME', ref: home },
    { name: 'ABOUT', ref: about },
    { name: 'PROJECTS', ref: projects },
    { name: 'CONTACT', ref: contact },
  ]

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='font-geist'>
      <nav className="fixed top-0 w-max pt-10 pb-6 right-[5%] bg-white z-50">
        <ul className='relative w-max ml-auto flex font-semibold text-neutral-800 gap-5 justify-end max-sm:text-sm max-sm:gap-3 z-50'>
          {nav.map((n, i) => (
            <div key={i} className="flex gap-5">
              <li className="h-5 overflow-y-hidden">
                <button
                  onClick={() => scrollToSection(n.ref)}
                  // href={`#${n}`}
                  className="flex flex-col hover:-translate-y-5 duration-300"
                >
                  <span className="h-5">{n.name}</span>
                  <span className="h-5">{n.name}</span>
                </button>
              </li> {i !== nav.length - 1 && <>/</>}
            </div>
          ))}
          <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ delay: 1.5, duration: 0.6 }} className="w-full h-full bg-white absolute top-0 right-0 origin-right"></motion.div>
        </ul>
      </nav>

      <div ref={home}>
        <Hero contactRef={contact}/>
      </div>
      <div className="bg-white w-full h-28"></div>
      <div ref={about}>
        <About />
      </div>
      <div className="bg-white w-full h-28 max-sm:h-10"></div>
      <div ref={projects}>
        <Projects />
      </div>
      <div className="bg-white w-full h-28"></div>
      <div className="bg-white md:hidden w-full h-10"></div>
      <div ref={contact}>
        <Contact />
      </div>
    </div>
  );
}
