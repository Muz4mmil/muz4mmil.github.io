'use client'

import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import skills from '@/app/data/skills.json'
import journey from '@/app/data/journey.json'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { PERSON } from '@/app/lib/site'
import WordReveal from '@/app/components/word-reveal'

// Every group starts at the same moment; each then fades its own pills in one by one.
const skillGroups = [
  { label: 'Languages', items: skills.languages, delay: 0.3, step: 0.1 },
  { label: 'Frameworks, Libraries & Tools', items: skills.frameworks_libraries_tools, delay: 0.3, step: 0.06 },
  { label: 'Databases', items: skills.databases, delay: 0.3, step: 0.06 },
  { label: 'Tools & Platforms', items: skills.tools_platforms, delay: 0.3, step: 0.06 },
]

const EASE = [0.16, 1, 0.3, 1] as const

const PARAGRAPH = 'text-base md:text-body-l text-body leading-[1.6]'

// Instagram-caption truncation: the text stops at the last whole word that fits in
// 4 lines (3 from md up) with "… more" inline after it; expanded, it ends in " less".
// The cut is measured on a hidden copy and re-measured when the width changes.
// Before the first measurement (and without JS) it falls back to a CSS line clamp.
function ClampedText({ text, className }: { text: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLParagraphElement>(null)
  const id = useId()
  const words = useMemo(() => text.split(' '), [text])
  const [open, setOpen] = useState(false)
  // undefined: not measured yet · null: fits, no toggle · n: words shown when collapsed
  const [cut, setCut] = useState<number | null | undefined>(undefined)

  useEffect(() => {
    const wrap = wrapRef.current
    const el = measureRef.current
    if (!wrap || !el) return

    // Mirror the visible markup: running text, then a medium-weight "more".
    const body = document.createTextNode('')
    const tail = document.createElement('span')
    tail.className = 'font-medium'
    tail.textContent = 'more'
    el.replaceChildren(body, tail)

    const measure = () => {
      const lines = window.matchMedia('(min-width: 768px)').matches ? 3 : 4
      const max = parseFloat(getComputedStyle(el).lineHeight) * lines + 1
      const fits = (n: number | null) => {
        body.data = n === null ? text : `${words.slice(0, n).join(' ')}… `
        tail.style.display = n === null ? 'none' : ''
        return el.offsetHeight <= max
      }
      if (fits(null)) return setCut(null)
      let lo = 0
      let hi = words.length - 1
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2)
        if (fits(mid)) lo = mid
        else hi = mid - 1
      }
      setCut(lo)
    }

    measure()
    // Only width matters; the wrapper's height changes with the cut itself.
    let lastWidth = wrap.clientWidth
    const ro = new ResizeObserver(() => {
      if (wrap.clientWidth === lastWidth) return
      lastWidth = wrap.clientWidth
      measure()
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [text, words])

  const truncated = typeof cut === 'number'
  // Inline text button; the pseudo-element widens the tap area without moving the line.
  // Phones have no hover, so the link is always underlined there, in grey.
  const toggle = 'relative font-medium text-ink underline-offset-4 hover:underline max-sm:underline max-sm:decoration-line after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[""]'

  return (
    <div ref={wrapRef} className={`relative max-w-[62ch] ${className ?? ''}`}>
      <p id={id} className={`${PARAGRAPH} ${cut === undefined ? 'line-clamp-4 md:line-clamp-3' : ''}`}>
        {truncated && !open ? `${words.slice(0, cut).join(' ')}… ` : text}
        {truncated && (
          <>
            {open && ' '}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={id}
              className={toggle}
            >
              {open ? 'less' : 'more'}
            </button>
          </>
        )}
      </p>
      {/* Hidden copy used only for measuring; filled imperatively above. */}
      <p
        ref={measureRef}
        aria-hidden="true"
        className={`${PARAGRAPH} pointer-events-none invisible absolute inset-x-0 top-0`}
      />
    </div>
  )
}

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section id='about' className='relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white min-h-screen overflow-x-clip'>
      <div className="section-bar">
        <h2 className="section-label w-max">About</h2>
        <hr className='mt-4' />
      </div>

      <div className="flex flex-col py-16 gap-32 max-sm:gap-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <WordReveal
              as="h3"
              onView
              className="text-5xl md:text-7xl font-extralight leading-none mb-8 text-black"
              lines={[
                { text: 'Web & App' },
                { text: 'Developer', className: 'font-light italic' },
              ]}
            />
            <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed">
              Crafting digital experiences through clean code and thoughtful design
            </p>
          </div>

          <div className="relative w-full h-80 md:h-96 rounded-none overflow-hidden">
            <Image
              src={PERSON.image}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              alt={`Portrait of ${PERSON.name}`}
              className='object-cover brightness-110 hover:grayscale-0 transition-all duration-700 rounded-2xl'
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

        {/* Phones: 40px gap + 56px = 96px of air before the journey. */}
        <div className="grid lg:grid-cols-12 gap-x-12 max-sm:mt-14">
          <div className="lg:col-span-4">
            <h3 className="heading lg:sticky lg:top-28">My Journey</h3>
          </div>

          <div className="lg:col-span-8 mt-8 lg:mt-0 flex flex-col gap-20 max-sm:gap-14">
            {journey.journey.map((entry, i) => (
              <motion.article
                key={entry.title}
                initial={reduce ? false : { opacity: 0, x: 160 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.4, delay: i * 0.1, ease: EASE }}
              >
                <p className="caps text-meta">{entry.period}</p>
                {/* Caption pair (§2.4): bold title over a grey descriptor. */}
                <h4 className="mt-4 text-title font-bold text-ink">{entry.title}</h4>
                <p className="mt-1 text-base text-meta">{entry.org}</p>
                <ClampedText className="mt-5" text={entry.description} />
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <div className="">
            <h3 className="heading">Stuff I know...</h3>

            <div className="mt-8">
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: group.delay }}
                  viewport={{ once: true }}
                  className={gi === 0 ? '' : 'mt-8'}
                >
                  <p className="text-sm font-medium text-ink">{group.label}</p>
                  <div className="flex gap-3 max-sm:gap-2 mt-3 flex-wrap">
                    {group.items.map((item, i) => (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: group.delay + (i * group.step) }}
                        viewport={{ once: true }}
                        key={item.name}
                        className="rounded-full border border-line flex items-center gap-2 px-6 py-3 text-xl w-max max-sm:px-4 max-sm:py-2 max-sm:text-base">
                        <div className="flex items-center brightness-0 opacity-40">
                          {/* Decorative — the name sits right beside it. Plain <img>: next/image adds nothing for local SVGs. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.icon} alt="" width={20} height={20} className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                        </div>
                        {item.name}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}