'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

type Line = { text: string; className?: string }

interface WordRevealProps {
  lines: Line[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  /** Let lines run together and wrap naturally (for one sentence with mixed styling)
   *  instead of stacking one line per entry. */
  inline?: boolean
  /** Play when scrolled into view (once) instead of on mount. */
  onView?: boolean
  /** Seconds before the first word; each following word adds `step`. */
  delay?: number
  step?: number
}

// Word-by-word masked reveal, shared by the hero and section headings. Lines keep
// their explicit breaks and per-line styling; the stagger runs continuously
// across lines so the heading reads as one sentence.
//
// The parent owns the trigger and children inherit it through variants. A word
// can't own a whileInView itself: it starts fully below its mask, so the browser
// reports it as clipped (never visible) and it would never fire.
export default function WordReveal({
  lines,
  as = 'h2',
  className,
  inline = false,
  onView = false,
  delay = 0.25,
  step = 0.15,
}: WordRevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  let wordIndex = 0

  const trigger = onView
    ? { whileInView: 'shown', viewport: { once: true, amount: 0.6 } }
    : { animate: 'shown' }

  return (
    <MotionTag className={className} initial={reduce ? false : 'hidden'} {...trigger}>
      {lines.map((line) => {
        const words = line.text.split(' ')
        return (
          <span key={line.text} className={`${inline ? 'inline' : 'block'} ${line.className ?? ''}`}>
            {words.map((word, i) => {
              const wordDelay = delay + wordIndex++ * step
              return (
                <React.Fragment key={i}>
                  {/* pb / pr give descenders and slanted (italic) glyph edges room inside the
                      mask; the matching negative margins keep line spacing unchanged. */}
                  <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] pr-[0.1em] -mr-[0.1em] align-bottom">
                    {/* Starts fully below the mask. Rotating from the top-left keeps the
                        tilt from lifting the far end into view. */}
                    <motion.span
                      className="inline-block origin-top-left"
                      custom={wordDelay}
                      variants={{
                        hidden: { y: '115%', rotate: 4 },
                        shown: (d: number) => ({
                          y: 0,
                          rotate: 0,
                          transition: { duration: 0.8, delay: d, ease: EASE },
                        }),
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {/* Space sits outside the inline-block, where it can't be collapsed. */}
                  {i < words.length - 1 ? ' ' : null}
                </React.Fragment>
              )
            })}
            {' '}
          </span>
        )
      })}
    </MotionTag>
  )
}
