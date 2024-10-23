import React from 'react'
import skills from '@/app/data/skills.json'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id='#ABOUT' className='relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white'>
      <div className="sticky top-0 z-10 bg-white">
        <h1 className="text-4xl font-semibold mt-8 max-sm:mt-20 w-max">About</h1>
        <hr className='mt-4' />
      </div>

      <div className="flex flex-1 gap-8 my-7 max-lg:flex-col">
        <div className="relative bg-gray-200 lg:sticky lg:top-28 rounded-lg lg:w-2/5 w-full lg:h-[540px] h-96 overflow-hidden">
          <Image src={'/me1.png'} layout='fill' alt='me' objectFit='cover' />
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            transition={{ duration: 0.7, bounce: 0, ease: 'easeInOut' }}
            viewport={{ once: true }}
            className='absolute top-0 left-0 h-full w-full origin-top bg-white'
          ></motion.div>
        </div>

        <div className="lg:w-3/5 h-full">
          <h2 className="text-5xl font-bold max-w-[500px] leading-tight">
            {
              ['Crafting', 'Ideas', 'with', 'Code', '&', 'Creativity'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 48, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.7 + (i * 0.1) }}
                  viewport={{ once: true }}
                  className='inline-block mr-2'
                >
                  {word}
                </motion.span>
              ))
            }
            {/* Crafting Ideas with Code & Creativity */}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 mt-5 leading-normal">
            I’m a Developer who loves bringing cool ideas to life on the internet. I’m all about crafting simple, user-friendly designs that look great and work smoothly. Outside of coding, you’ll find me snapping photos, gaming, or just hanging out with friends. Let’s connect and make something awesome!
          </motion.p>

          <div className="flex flex-col w-full justify-between mt-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              viewport={{ once: true }}
              className='border-b  border-neutral-300 pb-8 text-neutral-900'>
              <h3 className="mb-3 font-semibold">Education</h3>
              <p className='text-lg text-neutral-800'>I{"'"}m currently pursuing a <span className='font-medium'>Bachelor{"'"}s degree of Computer Science</span> at the <span className='font-medium'>Maharashtra Institute of Technology, Aurangabad</span>, expected to graduate in 2025.</p>
            </motion.div>



            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
              viewport={{ once: true }}
              className='mt-8 text-neutral-900'>
              <h3 className="mb-3 font-semibold">Experiences</h3>
              {/* <p className='text-lg text-neutral-600'>I’ve worked as a <strong>Full-Stack Developer Intern at DermaQ</strong> (Mar 2024 - Apr 2024), where I redesigned a responsive dashboard to enhance user experience. Earlier, I was a <strong>Web Developer at Morfeed</strong> (Feb 2023 - Apr 2023), building responsive components and integrating Firebase for secure data handling.</p> */}
              <div className="flex max-sm:flex-col gap-2">
                <div className="rounded-2xl border p-4 text-neutral-800">
                  <p className="text-xs">(Mar 2024 - Apr 2024)</p>
                  <p className="font-semibold text-neutral-900">Full-Stack Developer Intern</p>
                  <p className="">DermaQ</p>
                  <p className="mt-2">Developed some key pages & Redesigned a responsive dashboard to enhance user experience</p>
                </div>
                <div className="rounded-2xl border p-4 text-neutral-800">
                  <p className="text-xs">(Feb 2023 - Apr 2023)</p>
                  <p className="font-semibold text-neutral-900">Web Developer Intern</p>
                  <p className="">Morfeed</p>
                  <p className="mt-2">Built responsive components and integrated Firebase for secure data handling.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="my-20">
            <h1 className="text-3xl font-semibold">Stuff I know...</h1>

            <div className="mt-4">
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
                      transition={{ delay: 0.3 + (i * 0.06) }}
                      viewport={{ once: true }}
                      key={item}
                      className="rounded-full border border-neutral-400 px-5 py-2 text-lg w-max">
                      {item}
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
                      key={item}
                      className="rounded-full border border-neutral-400 px-5 py-2 text-lg w-max">
                      {item}
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
                      key={item}
                      className="rounded-full border border-neutral-400 px-5 py-2 text-lg w-max">
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
