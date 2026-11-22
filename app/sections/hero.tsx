'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { PERSON, SOCIALS } from '@/app/lib/site'
import { useSectionScroll } from '@/app/lib/use-section-scroll'
import WordReveal from '@/app/components/word-reveal'

// Resume (outlined) and Let's Talk (solid) at the same height, side by side.
function Actions({ className }: { className: string }) {
  const { onAnchorClick } = useSectionScroll()
  const reduce = useReducedMotion()
  const pop = (delay: number) => ({
    initial: reduce ? false : { scale: 0.5, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { delay },
    viewport: { once: true },
  })

  return (
    <div className={className}>
      <motion.a
        href={PERSON.resume} target='_blank' rel='noopener noreferrer'
        {...pop(1.55)}
        className='btn-secondary group h-14 px-7 text-base border-ink'
      >
        Resume <ArrowUpRight size={20} strokeWidth={2} className='group-hover:rotate-45 duration-300' />
      </motion.a>
      <motion.a
        href='#contact'
        onClick={onAnchorClick}
        {...pop(1.8)}
        className='btn-primary px-7'
      >
        Let’s Talk <ArrowRight size={20} strokeWidth={2} />
      </motion.a>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id='home' className='h-[100dvh] relative max-w-[1366px] mx-auto w-full flex flex-col bg-white'>
      {/* Spacer matching the sticky section bars' height. Sticky on desktop only: on
          phones it would pin a white band over the headline while scrolling. */}
      <div className="sticky top-0 z-10 bg-white max-sm:static" aria-hidden="true">
        <div className="section-label mt-8 mb-4 max-sm:mt-20 w-max text-white max-sm:h-0 max-sm:overflow-hidden">. </div>
      </div>

      <div className='h-full flex flex-col justify-center max-sm:mb-28'>
        <WordReveal
          as="h1"
          className="display-xl mx-[5%] mb-24 max-sm:mb-10 [word-spacing:0.08em]"
          lines={[
            { text: 'I’m Muzammil Siddiqui' },
            { text: 'Full Stack Developer who' },
            { text: 'creates great experiences', className: 'text-ink-muted' },
          ]}
        />
        <Actions className="ml-[5%] flex gap-3 md:hidden" />
      </div>

      <div className="absolute w-full bottom-4 md:bottom-10 px-[5%] flex justify-between md:items-center max-sm:flex-col-reverse gap-6">
        <ul className='caps text-ink grid grid-cols-2 md:grid-cols-4 gap-14 max-sm:gap-y-4 max-sm:gap-x-12'>
          {SOCIALS.map((s, i) => (
            <motion.li key={s.name} initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 + i * 0.1 }}>
              <a href={s.link} target='_blank' rel='noopener noreferrer' className='flex gap-2 items-center group'>
                {s.name} <ArrowUpRight size={18} strokeWidth={2} className='group-hover:rotate-45 duration-300' />
              </a>
            </motion.li>
          ))}
        </ul>

        <Actions className="flex gap-3 max-sm:hidden" />
      </div>
    </section>
  )
}
