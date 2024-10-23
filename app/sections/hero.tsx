import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  contactRef: React.RefObject<HTMLDivElement>;
}

export default function Hero({ contactRef }: HeroProps) {
  const socials = [
    { name: 'LINKEDIN', link: 'https://www.linkedin.com/in/muz4mmil', delay: 1 },
    { name: 'GITHUB', link: 'https://github.com/muz4mmil', delay: 1.1 },
    { name: 'INSTAGRAM', link: 'https://instagram.com/muz4mmil.s', delay: 1.2 },
    { name: 'X (TWITTER)', link: 'https://x.com/Muz4mmil_', delay: 1.3 },
  ]

  return (
    <section id='#HOME' className='h-[100dvh] relative max-w-[1366px] mx-auto w-full flex flex-col bg-white'>
      <div className="sticky top-0 z-10 bg-white">
        <h1 className="text-4xl font-semibold mt-8 mb-4 max-sm:mt-20 w-max text-white max-sm:h-0 max-sm:overflow-hidden">. </h1>
      </div>

      <div className="ml-[5%] max-sm:mb-40 mb-24 flex-1 flex flex-col justify-center gap-2 font-extrabold text-5xl md:text-head">
        <div className="h-[5.35rem] max-sm:h-[6rem] overflow-y-hidden">
          <motion.h1 whileInView={{ y: 0, opacity: 1 }} initial={{ y: 80, opacity: 0 }} viewport={{ once: true }} transition={{ bounce: 0 }}>I{"'"}m Muzammil Siddiqui</motion.h1>
        </div>
        <div className="h-[5.35rem] max-sm:h-[6rem] overflow-y-hidden">
          <motion.h1 whileInView={{ y: 0, opacity: 1 }} initial={{ y: 80, opacity: 0 }} viewport={{ once: true }} transition={{ delay: 0.25, bounce: 0 }}>Full Stack Developer who</motion.h1>
        </div>
        <div className="h-[5.35rem] max-sm:h-[6rem] overflow-y-hidden">
          <motion.h1 whileInView={{ y: 0, opacity: 1 }} initial={{ y: 80, opacity: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, bounce: 0 }} className="text-gray-400">create great experiences</motion.h1>
        </div>
      </div>

      <div className="absolute w-full bottom-4 md:bottom-10 px-[5%] flex justify-between md:items-center max-sm:flex-col-reverse gap-6">
        <ul className='grid grid-cols-2 md:grid-cols-4 font-semibold text-neutral-800 gap-14 max-sm:text-sm max-sm:gap-3 max-sm:gap-x-12'>
          {socials.map((s, i) => (
            <motion.li key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: s.delay }}><a href={s.link} target='_blank' className='flex gap-2 items-center group'>{s.name} <ArrowUpRight className='group-hover:rotate-45 duration-300' /></a></motion.li>
          ))}
        </ul>

        <div className="flex gap-3">
          <motion.a
            href='/Resume-Oct.pdf' download={'Resume-Muzammil'}
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.55 }} viewport={{ once: true }}
            onClick={() => console.log('')}
            className='flex gap-2 items-center border border-black hover:bg-black hover:text-white font-medium rounded-full px-5 py-3'
          >
            Resume <ArrowDown size={22} />
          </motion.a>
          <motion.button
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8 }} viewport={{ once: true }}
            onClick={() => contactRef.current?.scrollIntoView()}
            className='flex gap-2 items-center border border-black bg-black text-white rounded-full px-5 py-3'
          >
            Let{"'"}s Talk <ArrowRight size={22} />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
