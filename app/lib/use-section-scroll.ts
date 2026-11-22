'use client'

import { useCallback } from 'react'
import type { MouseEvent } from 'react'
import { useLenis } from 'lenis/react'

// Smooth-scrolls same-page `#section` links through Lenis. The links stay real
// anchors (crawlable, middle-clickable, work without JS); this only swaps the
// browser's jump for Lenis's scroll, which native smooth-scrolling fights.
export function useSectionScroll() {
	const lenis = useLenis()

	const scrollTo = useCallback((hash: string) => {
		if (lenis) lenis.scrollTo(hash)
		else document.querySelector(hash)?.scrollIntoView()
	}, [lenis])

	const onAnchorClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
		const { hash } = e.currentTarget
		// Leave modified clicks (new tab/window) to the browser.
		if (!hash || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
		e.preventDefault()
		scrollTo(hash)
	}, [scrollTo])

	return { scrollTo, onAnchorClick }
}
