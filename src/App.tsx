import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDown,
  Terminal,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ParticleImage } from './sections/ParticleImage';

// --- 1. TYPE DEFINITIONS ---

interface Project {
  id: number;
  title: string;
  category: string;
  stack: string;
  color: string;
  img: string;
  desc: string;
}

// --- 2. UTILITY COMPONENTS ---

// Moving Grain Overlay
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-difference">
    <svg className="w-full h-full">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

// Velocity Text Component (Skews on scroll)
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const VelocityText = ({ children, baseVelocity = 100, className = "" }: { children: React.ReactNode; baseVelocity?: number; className?: string }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1000, 1000], [-15, 15]);

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap">
      <motion.div className={`flex flex-nowrap ${className}`} style={{ x, skewX }}>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
        <span className="block mr-8">{children}</span>
      </motion.div>
    </div>
  );
};

// Custom Cursor that blends
const BlendedCursor = ({ isHovered }: { isHovered: boolean }) => {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };
  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 150, damping: 15, mass: 0.1 }),
    y: useSpring(mouse.y, { stiffness: 150, damping: 15, mass: 0.1 })
  };

  useEffect(() => {
    const manageMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <motion.div
      style={{ left: smoothMouse.x, top: smoothMouse.y }}
      animate={{ scale: isHovered ? 3 : 1 }}
      className="fixed w-4 h-4 bg-black rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-exclusion"
    />
  );
};

// --- NEW COMPONENT: Static Skill Category ---
const SkillCategory = ({ title, items }: { title: string; items: string[] }) => {
  return (
    <div className="mb-16">
      <h3 className="text-white/40 font-mono text-sm uppercase tracking-widest mb-8 border-l-2 border-white/20 pl-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-x-8 gap-y-6">
        {items.map((item, i) => (
          <div key={i} className="group relative cursor-default">
            <span className="text-4xl md:text-6xl font-display font-bold text-transparent stroke-text group-hover:text-white transition-colors duration-300">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


// --- 2. MAIN APPLICATION 

export default function App() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorVariant, setCursorVariant] = useState(false);

  // Smooth Scroll Container Ref
  // const containerRef = useRef(null);

  // Projects Data
  const projects = [
    {
      id: 1,
      title: "Buddy",
      category: "SaaS Platform",
      stack: "Next.js / Node.js / Stripe / AWS",
      color: "#E0E7FF", // Soft Indigo
      img: "/projects/buddy.webp", // Placeholder for actual abstract UI
      desc: "A Part-time focused full fledged job portal for students and businesses",
      projectLink: 'https://test.buddy-fr.com',
    },
    {
      id: 2,
      title: "CoGlider",
      category: "Mobile Application",
      stack: "React Native / Expo /Firebase",
      color: "#FCE7F3", // Soft Pink
      img: "/projects/coglider.webp",
      desc: "A Tinder-inspired app designed to connect like-minded individuals by matching them based on skills and proximity",
      projectLink: 'https://coglider.vercel.app',
      githubLink: 'https://github.com/Muz4mmil/CoGlider',
    },
    {
      id: 3,
      title: "FileGlide",
      category: "Web Utility",
      stack: "React.js / Node.js / Firebase",
      color: "#DCFCE7", // Soft Emerald
      img: "/projects/fileglide.webp",
      desc: "A no-login, no-setup file sharing tool built for speed and simplicity.",
      projectLink: 'https://fileglide.web.app',
      githubLink: 'https://github.com/Muz4mmil/FileGlide',
    }
  ];

  return (
    <div className="bg-[#EAEAEA] min-h-screen text-[#111] font-sans selection:bg-black selection:text-white cursor-none">

      {/* GLOBAL STYLES */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');
        
        body { font-family: 'Inter', sans-serif; background-color: #EAEAEA; overflow-x: hidden; }
        h1, h2, h3, .font-display { font-family: 'Syne', sans-serif; }
        
        .grid-lines {
          background-size: 100px 100px;
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
        }

        .text-stroke {
          -webkit-text-stroke: 1px rgba(0,0,0,0.2);
          color: transparent;
        }

        /* Specific stroke for the dark section */
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
        }
        .stroke-text:hover {
          -webkit-text-stroke: 0;
        }
      `}} />

      <NoiseOverlay />
      <BlendedCursor isHovered={cursorVariant} />

      {/* GRID BACKGROUND */}
      <div className="fixed inset-0 grid-lines pointer-events-none h-[200vh]" />

      {/* HEADER / NAV */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 mix-blend-difference text-white cursor-auto">
        <div className="flex flex-col">
          <span className="font-display font-bold text-xl tracking-tighter">M.</span>
          {/* <span className="text-xs uppercase tracking-widest opacity-50 mt-1">Portfolio ©2025</span> */}
        </div>

        <nav className="flex gap-8 text-sm font-medium">
          <a
            href="#work"
            onMouseEnter={() => setCursorVariant(true)}
            onMouseLeave={() => setCursorVariant(false)}
            className="h-5 overflow-y-hidden"
          >
            <div
              className="flex flex-col hover:-translate-y-5 duration-300"
            >
              <span className="h-5">WORK</span>
              <span className="h-5">WORK</span>
            </div>
          </a>
          <a
            href="#about"
            onMouseEnter={() => setCursorVariant(true)}
            onMouseLeave={() => setCursorVariant(false)}
            className="h-5 overflow-y-hidden"
          >
            <div
              className="flex flex-col hover:-translate-y-5 duration-300"
            >
              <span className="h-5">PROFILE</span>
              <span className="h-5">PROFILE</span>
            </div>
          </a>
          <a
            href="#contact"
            onMouseEnter={() => setCursorVariant(true)}
            onMouseLeave={() => setCursorVariant(false)}
            className="h-5 overflow-y-hidden"
          >
            <div
              className="flex flex-col hover:-translate-y-5 duration-300"
            >
              <span className="h-5">CONTACT</span>
              <span className="h-5">CONTACT</span>
            </div>
          </a>
        </nav>
      </header>

      {/* IMPROVED HERO SECTION */}
      <section className="relative min-h-svh flex flex-col p-6 md:p-10 pt-32 cursor-auto">

        <div className="flex flex-1 max-sm:flex-col-reverse">
          {/* Top Part: Name */}
          <div className="flex-1 flex flex-col justify-center md:justify-end pb-4 md:pb-12 z-10">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1 className="text-[10vw] md:text-[5vw] leading-[0.85] font-display font-bold tracking-tighter uppercase text-[#111] -ml-[0.5vw]">
                Muzammil
              </h1>
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="mt-2"
            >
              <h1 className="text-[10vw] md:text-[5vw] leading-[0.85] font-display font-bold tracking-tighter uppercase text-[#111] -ml-[0.5vw] opacity-80">
                Siddiqui
              </h1>
            </motion.div>
          </div>
          <div className="h-72 md:h-auto max-sm:mb-5 md:flex-1 justify-center md:justify-end z-10">
            <ParticleImage src={'/me3.webp'} mouseRadius={30} springSpeed={0.01} repelForce={5} />
          </div>
        </div>

        {/* Bottom Part: Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-black/10 pt-4 md:pt-8 z-10">

          {/* Col 1: Status */}
          {/* <div className="md:col-span-3 flex flex-col justify-between h-full mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Available for work</span>
            </div>
          </div> */}

          {/* Col 2: Description */}
          <div className="md:col-span-6 mb-0">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl font-light text-[#111] leading-relaxed"
            >
              <span className="font-medium border-b border-black/20">Full Stack Developer</span> who create great experiences. transforming ideas into digital reality. Based in <span className="font-medium border-b border-black/20">Aurangabad, India</span>.
            </motion.p>
          </div>

          {/* Col 3: Scroll */}
          <div className="md:col-span-6 md:justify-end flex flex-wrap gap-3">
            <motion.a
              href='/Resume-Muzammil-Nov 25.pdf' download={'Resume-Muzammil'}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 }} viewport={{ once: true }}
              className='flex gap-2 items-center border border-black hover:bg-[#111] hover:text-white font-medium rounded-full px-5 py-3 h-max'
            >
              Resume <ArrowDown size={22} />
            </motion.a>
            <motion.a
              href="#contact"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2 }} viewport={{ once: true }}
              className='flex gap-2 items-center border border-black bg-[#111] text-white rounded-full px-5 py-3 h-max'
            >
              Let{"'"}s Talk <ArrowRight size={22} />
            </motion.a>
          </div>
        </div>
      </section>

      {/* VELOCITY STRIP */}
      <div className="py-20 border-y border-black/5 bg-[#EAEAEA] overflow-hidden cursor-auto">
        <VelocityText baseVelocity={2} className="font-display text-8xl md:text-9xl font-bold text-[#2b2b2b] opacity-10">
          FULL STACKDEVELOPER • MOBILE DEVELOPER • ENGINEER •
        </VelocityText>
      </div>

      {/* PROJECTS LIST */}
      <section id="work" className="py-32 px-6 md:px-10 relative z-20 cursor-auto">
        <div className="mb-16 border-b border-black border-opacity-10 pb-4 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase">Selected Works</h2>
          <span className="font-mono text-sm">(03)</span>
        </div>

        <div className="flex flex-col">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => { setHoveredProject(project); setCursorVariant(true); }}
              onMouseLeave={() => { setHoveredProject(null); setCursorVariant(false); }}
              className="group relative border-b border-black/10 py-12 md:py-16 transition-colors hover:bg-white/40 px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
                <div className="">
                  <h3 className="text-4xl md:text-7xl font-display font-bold uppercase text-[#111] group-hover:-skew-x-12 group-hover:translate-x-2 transition-all duration-300 origin-left">
                    {project.title}
                  </h3>
                  <p className="mt-1 md:ml-2 text-sm md:text-base font-mono font-medium text-zinc-400">{project.desc}</p>
                </div>
                <div className="flex flex-col md:items-end mt-4 md:mt-0 gap-1">
                  <span className="text-sm font-mono uppercase tracking-widest text-zinc-500">{project.category}</span>
                  <span className="text-xs font-mono text-zinc-400">{project.stack}</span>
                  {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="max-sm:hidden text-sm mt-3 underline underline-offset-2 font-mono text-zinc-600 hover:text-zinc-500 transition-colors duration-300 flex items-center gap-1">
                    View Code <ArrowUpRight size={14} />
                  </a>}
                </div>
              </div>

              {/* Hover Reveal Button (Mobile friendly fallback) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="md:hidden mt-6 gap-4"
              >
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold underline decoration-1 underline-offset-4">
                  VIEW PROJECT <ArrowUpRight size={14} />
                </a>
                {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="md:hidden text-sm mt-3 underline underline-offset-2 font-mono text-zinc-600 hover:text-zinc-500 transition-colors duration-300 flex items-center gap-1">
                  View Code <ArrowUpRight size={14} />
                </a>}
              </motion.div>
            </div>
          ))}
        </div>

        {/* FLOATING IMAGE REVEAL (Desktop Only) */}
        <ProjectPreview project={hoveredProject} />
      </section>

      {/* --- TOOLKIT SECTION (STATIC & READABLE) --- */}
      <section className="py-32 bg-[#111] text-white cursor-default relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute right-10 top-10 w-64 h-64 rounded-full bg-white blur-[100px]" />
        </div>

        <div className="px-6 md:px-10 mb-20 flex items-center gap-4">
          <span className="w-3 h-3 rounded-full bg-white animate-pulse" />
          <h2 className="text-white font-mono text-sm uppercase tracking-widest">The Toolkit</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SkillCategory
            title="Core Languages"
            items={["JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "SQL"]}
          />
          <SkillCategory
            title="Frameworks & Ecosystem"
            items={["React.js", "Next.js", "React Native", "Node.js", "Express", "Redux"]}
          />
          <SkillCategory
            title="Databases, Cloud & DevOps"
            items={["PostgreSQL", "MongoDB", "Firebase/Supabase/Appwrite", "AWS", "Git / Github"]}
          />
          <SkillCategory
            title="Additional"
            items={["Tailwind CSS", "Figma", "Stripe"]}
          />
        </div>
      </section>

      {/* REDESIGNED PROFILE / ABOUT SECTION */}
      <section id="about" className="py-40 px-6 md:px-10 bg-[#111] text-[#EAEAEA] -mx-1 border-t border-white/10 cursor-auto">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:items-start">

            {/* LEFT COLUMN - ID CARD AESTHETIC */}
            <div className="md:col-span-4 md:sticky md:top-10 md:self-start">
              <div className="border border-white/20 p-6 rounded-lg relative overflow-hidden group">
                {/* Decorative Scanning Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/50 blur-sm animate-[scan_4s_ease-in-out_infinite] opacity-50" />

                <div className="flex justify-between items-start mb-8">
                  <Terminal size={32} className="text-white" />
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-xs text-white/50">ID-8264</span>
                    <span className="font-mono text-xs text-emerald-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* Abstract Avatar */}
                <div className="w-full aspect-square bg-white/5 rounded border border-white/10 mb-6 relative flex items-center justify-center overflow-hidden">
                  {/* <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-purple-500/20" />
                  <div className="w-24 h-24 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="w-16 h-16 border border-white/40 rounded-full absolute animate-[spin_8s_linear_infinite_reverse]" />
                  <Code2 className="absolute text-white/80" size={24} /> */}
                  <img src='/muzammil.webp' className="w-full h-full object-cover" />
                </div>

                <h3 className="text-2xl font-display font-bold uppercase mb-1">Muzammil</h3>
                <h3 className="text-2xl font-display font-bold uppercase text-white/40 mb-4">Siddiqui</h3>

                <div className="space-y-2 text-sm font-mono text-white/60 border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>Role</span>
                    <span className="text-white">Full Stack Dev</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Base</span>
                    <span className="text-white">Aurangabad, IN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exp</span>
                    <span className="text-white">1+ Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - CONTENT LOG */}
            <div className="md:col-span-8 flex flex-col gap-20 pl-0 md:pl-10">

              {/* Intro */}
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.9] mb-8">
                  ARCHITECTING <br />
                  <span className="text-white/40">DIGITAL REALITY</span>
                </h2>
                <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed max-w-2xl">
                  I bridge the gap between <span className="text-white font-medium border-b border-white/30">design intent</span> and <span className="text-white font-medium border-b border-white/30">engineering reality</span>.
                  My approach is rooted in minimalism, performance, and scalability.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-8">
                <div className="p-4">
                  <div className="text-5xl font-display font-bold text-white mb-2">01+</div>
                  <div className="text-xs font-mono text-white/50 uppercase tracking-widest">Years Experience</div>
                </div>
                <div className="p-4 border-l border-white/10">
                  <div className="text-5xl font-display font-bold text-white mb-2">05+</div>
                  <div className="text-xs font-mono text-white/50 uppercase tracking-widest">Projects Shipped</div>
                </div>
              </div>

              {/* Career Log */}
              <div>
                <h3 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Zap size={12} /> Career Log
                </h3>

                <div className="relative border-l border-white/10 ml-2 space-y-12">

                  {/* Role 1 */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#111] border border-white/50 group-hover:bg-white group-hover:border-white transition-colors" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Sleeksky Technologies</h4>
                      <span className="font-mono text-xs text-white/40">MAY 2025 - PRESENT</span>
                    </div>
                    <div className="text-sm text-white/60 mb-4 font-mono uppercase tracking-wider">Software Developer</div>
                    <p className="text-white/70 leading-relaxed max-w-xl">
                      Built new features including dashboard components, data visualization charts, and email templates.
                      Fixed numerous high-impact bugs and optimized complex, role-based modules across multiple sub-platforms.
                      Contributed to the migration from React (CRA) to Vite+React, resolving upgrade issues and improving performance.
                    </p>
                  </div>

                  {/* Role 2 */}
                  <div className="relative pl-8 group">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#111] border border-white/50 group-hover:bg-white group-hover:border-white transition-colors" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h4 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">Penguin Apps</h4>
                      <span className="font-mono text-xs text-white/40">JAN 2025 - APR 2025</span>
                    </div>
                    <div className="text-sm text-white/60 mb-4 font-mono uppercase tracking-wider">Software Developer Intern</div>
                    <p className="text-white/70 leading-relaxed max-w-xl">
                      Integrated new features and resolved bugs in a school management system, enhancing overall usability.
                      Contributed to the development of key features for a mobile app, improving functionality and user experience.
                      Built and integrated RESTful APIs with Strapi Headless CMS for a high-performance, content-driven platform.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="min-h-screen flex flex-col justify-between p-6 md:p-10 bg-[#EAEAEA] text-[#111] relative z-10 cursor-auto">

        <div className="pt-32">
          <h2 className="text-[10vw] leading-[0.8] font-display font-bold uppercase tracking-tighter mb-8">
            Let's Talk
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:items-center">
            <a
              href="mailto:muzammilsiddiqui826@gmail.com"
              onMouseEnter={() => setCursorVariant(true)}
              onMouseLeave={() => setCursorVariant(false)}
              className="text-2xl md:text-4xl font-light hover:-skew-x-12 hover:translate-x-1 transition-all border-b border-black pb-1 w-fit"
            >
              muzammilsiddiqui826@gmail.com
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase text-zinc-500">Socials</span>
            <a href="https://linkedin.com/in/muz4mmil" target='_blank' className="hover:text-zinc-500 transition-colors">LinkedIn</a>
            <a href="https://github.com/Muz4mmil" target='_blank' className="hover:text-zinc-500 transition-colors">Github</a>
            <a href="https://x.com/Muz4mmil_" target='_blank' className="hover:text-zinc-500 transition-colors">X (Twitter)</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono uppercase text-zinc-500">Navigation</span>
            <a href="#home" className="hover:text-zinc-500 transition-colors">Home</a>
            <a href="#work" className="hover:text-zinc-500 transition-colors">Work</a>
            <a href="#about" className="hover:text-zinc-500 transition-colors">About</a>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <span className="text-xs font-mono uppercase text-zinc-500">Location</span>
            <p>Aurangabad, MH<br />India</p>
            <p className="mt-4 text-sm text-zinc-500">Local Time: {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-black/10 pt-6">
          {/* <span className="text-[10px] md:text-xs font-mono uppercase text-zinc-400">
            © 2025 Muzammil Siddiqui. All Rights Reserved.
          </span>
          <span className="text-[10px] md:text-xs font-mono uppercase text-zinc-400">
            Designed & Engineered
          </span> */}
        </div>
      </footer>

    </div>
  );
}

// --- 3. FLOATING IMAGE COMPONENT ---

const ProjectPreview = ({ project }: { project: Project | null }) => {
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  const x = useSpring(mouse.x, { stiffness: 200, damping: 20 });
  const y = useSpring(mouse.y, { stiffness: 200, damping: 20 });

  if (!project) return null;

  return (
    <motion.div
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed z-30 hidden md:block pointer-events-none -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg shadow-2xl"
    >
      {/* Preview Card */}
      <div className="w-[400px] h-[250px] bg-white p-2 relative">
        <div className="w-full h-full relative overflow-hidden rounded bg-zinc-100">
          {/* Placeholder Abstract Visuals if Image Fails */}
          {/* <div
            className="w-full h-full absolute inset-0"
            style={{ backgroundColor: project.color }}
          >
            {project.title === "Buddy" && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white shadow-lg rounded-lg p-4 space-y-2">
                  <div className="w-1/3 h-4 bg-zinc-200 rounded" />
                  <div className="w-full h-32 bg-zinc-100 rounded" />
                </div>
              </div>
            )}
            {project.title === "CoGlider" && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[100px] h-[180px] bg-black rounded-[20px] p-1">
                  <div className="w-full h-full bg-white rounded-[16px] overflow-hidden relative">
                    <div className="absolute top-4 left-2 w-8 h-8 rounded-full bg-pink-200" />
                  </div>
                </div>
              </div>
            )}
            {project.title === "FileGlide" && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 border-2 border-dashed border-emerald-500 rounded-full flex items-center justify-center animate-spin-slow">
                  <ArrowUpRight className="text-emerald-500" />
                </div>
              </div>
            )}
          </div> */}
          <div className="w-full h-full flex items-center justify-center">
            <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Label Overlay */}
          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
            View Project
          </div>
        </div>
      </div>
    </motion.div>
  );
};