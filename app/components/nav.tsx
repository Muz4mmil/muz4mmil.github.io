'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { SECTIONS } from '@/app/lib/site'
import { useSectionScroll } from '@/app/lib/use-section-scroll'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollTo, onAnchorClick } = useSectionScroll()

  // Section to scroll to once the mobile menu has finished animating out.
  const pendingHash = useRef<string | null>(null)

  const handleMenuNav = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    pendingHash.current = e.currentTarget.hash
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    // The menu and its toggle are sm:hidden — if the viewport grows past the
    // breakpoint while open, close it so scroll isn't left locked with no
    // visible way to release it.
    const desktop = window.matchMedia('(min-width: 640px)')
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', onBreakpoint)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [menuOpen])

  return (
    <>
      {/* Phone: just the menu button, so the sticky section label shares its row.
          Desktop: the link row, on white so it masks content scrolling beneath. */}
      <nav aria-label="Primary" className="fixed top-0 w-max pt-10 pb-6 max-sm:pt-5 max-sm:pb-0 right-[5%] sm:bg-white z-50">
        <div className="relative w-max ml-auto max-sm:hidden z-50">
          <ul className="caps text-ink flex gap-5 justify-end">
            {SECTIONS.map((s, i) => (
              <li key={s.id} className="flex gap-5">
                <span className="block h-5 overflow-y-hidden">
                  <a
                    href={`#${s.id}`}
                    onClick={onAnchorClick}
                    className="flex flex-col hover:-translate-y-5 duration-300"
                  >
                    <span className="h-5">{s.name}</span>
                    <span className="h-5" aria-hidden="true">{s.name}</span>
                  </a>
                </span>
                {i !== SECTIONS.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ul>
          <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ delay: 1.5, duration: 0.6 }} className="w-full h-full bg-white absolute top-0 right-0 origin-right"></motion.div>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="btn-icon ml-auto sm:hidden"
        >
          {menuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
        </button>
      </nav>

      <AnimatePresence
        onExitComplete={() => {
          if (pendingHash.current) scrollTo(pendingHash.current)
          pendingHash.current = null
        }}
      >
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-paper px-[5%] pt-32 pb-10 flex flex-col sm:hidden"
          >
            <ul className="flex flex-col">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  className="border-b border-hairline"
                >
                  <a
                    href={`#${s.id}`}
                    onClick={handleMenuNav}
                    className="block w-full py-5 text-left text-3xl font-bold tracking-[-0.03em] text-ink"
                  >
                    {s.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + SECTIONS.length * 0.05, duration: 0.3 }}
              onClick={handleMenuNav}
              className="btn-primary mt-auto w-full justify-center"
            >
              Let’s Talk <ArrowRight size={20} strokeWidth={2} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
