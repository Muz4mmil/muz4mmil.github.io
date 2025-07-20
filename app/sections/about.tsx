import React from 'react'
import skills from '@/app/data/skills.json'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id='#ABOUT' className='relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white min-h-screen'>
      <div className="sticky top-0 z-10 bg-white">
        <h1 className="text-4xl font-semibold mt-8 max-sm:mt-20 w-max">About</h1>
        <hr className='mt-4' />
      </div>

      <div className="flex flex-col py-16 space-y-32 max-sm:space-y-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-extralight leading-none mb-8 text-black">
              Developer
              <br />
              <span className="font-light italic">& Creator</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
              Crafting digital experiences through clean code and thoughtful design
            </p>
          </div>

          <div className="relative w-full h-80 md:h-96 rounded-none overflow-hidden">
            <Image
              src={'/me1.png'}
              layout='fill'
              alt='me'
              objectFit='cover'
              className='grayscale hover:grayscale-0 transition-all duration-700'
            />
            <motion.div
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              viewport={{ once: true }}
              className='absolute top-0 left-0 h-full w-full origin-bottom bg-white'
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <p className="text-2xl md:text-4xl font-light leading-relaxed text-neutral-600">
            I’m a developer who transforms ideas into digital reality. My approach centers on
            <em className="font-normal text-neutral-800"> simplicity, functionality, and user experience</em>.
            Outside of coding, you’ll find me snapping photos, gaming, or just hanging out with friends.
          </p>
        </motion.div>

        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl font-semibold max-sm:mt-10">My Journey</h1>

            <div className="space-y-12 max-sm:space-y-5 mt-10 max-sm:mt-4">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-4 gap-8 py-6 border-b border-gray-100">
                <div className="text-sm font-light text-gray-500 uppercase tracking-wide">
                  May 2025 — Present
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl font-normal mb-2">Software Developer</h4>
                  <p className="text-gray-600 mb-3">SleekSky</p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Building scalable APIs with headless CMS, developing mobile app interfaces,
                    and enhancing school management systems through feature integration and bug resolution.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-4 gap-8 py-6 border-b border-gray-100">
                <div className="text-sm font-light text-gray-500 uppercase tracking-wide">
                  Jan 2025 — Apr 2025
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl font-normal mb-2">Software Developer Intern</h4>
                  <p className="text-gray-600 mb-3">Penguin Apps</p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Building scalable APIs with headless CMS, developing mobile app interfaces,
                    and enhancing school management systems through feature integration and bug resolution.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-4 gap-8 py-6 border-b border-gray-100">
                <div className="text-sm font-light text-gray-500 uppercase tracking-wide">
                  Mar — Apr 2024
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl font-normal mb-2">Full-Stack Developer Intern</h4>
                  <p className="text-gray-600 mb-3">DermaQ</p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Redesigned responsive dashboards and developed key application pages
                    to enhance overall user experience and interface functionality.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-4 gap-8 py-6">
                <div className="text-sm font-light text-gray-500 uppercase tracking-wide">
                  2021 — 2025
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl font-normal mb-2">Bachelor of Computer Science</h4>
                  <p className="text-gray-600 mb-3">Maharashtra Institute of Technology, Aurangabad</p>
                  <p className="text-gray-700 font-light leading-relaxed">
                    Pursuing comprehensive computer science education with focus on
                    software development, algorithms, and modern technology stack.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <div className="">
            <h1 className="text-3xl font-semibold">Stuff I know...</h1>

            <div className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="">
                <p className="font-medium ">Languages</p>
                <div className="flex gap-4 max-sm:gap-2 mt-2 flex-wrap">
                  {skills.languages.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      viewport={{ once: true }}
                      key={item.name}
                      className="rounded-full border flex items-center gap-2 border-neutral-400 px-5 py-2 text-lg w-max">
                      <i className={item.icon + " text-neutral-400"}></i>
                      {item.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-5">
                <p className="font-medium ">Frameworks, Libraries & Tools</p>
                <div className="flex gap-4 max-sm:gap-2 mt-2 flex-wrap">
                  {skills.frameworks_libraries_tools.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6 + (i * 0.06) }}
                      viewport={{ once: true }}
                      key={item.name}
                      className="rounded-full border flex items-center gap-2  border-neutral-400 px-5 py-2 text-lg w-max">
                      <i className={item.icon + " text-neutral-400"}></i>
                      {item.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                viewport={{ once: true }}
                className="mt-5">
                <p className="font-medium ">Databases</p>
                <div className="flex gap-4 max-sm:gap-2 mt-2 flex-wrap">
                  {skills.databases.map((item, i) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.3 + (i * 0.06) }}
                      viewport={{ once: true }}
                      key={item.name}
                      className="rounded-full border flex items-center gap-2  border-neutral-400 px-5 py-2 text-lg w-max">
                      <i className={item.icon + " text-neutral-400"}></i>
                      {item.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}