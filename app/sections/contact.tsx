'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion';

import { PERSON, SOCIALS } from '@/app/lib/site'
import WordReveal from '@/app/components/word-reveal'

const EMAIL = PERSON.email
const PHONE = PERSON.phone
const LOCATION = PERSON.location.label

export default function Contact() {
	return (
		<section id='contact' className='min-h-[100dvh] max-sm:pt-24 max-sm:pb-10 relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white'>
			{/* Mobile: the section is one viewport tall, padded past the fixed nav (~76px)
			    so the headline is never hidden behind it. min-h, not h, so a tall
			    headline on a short phone pushes the page instead of overflowing. */}
			<div className="sticky top-0 z-10 bg-white max-sm:hidden" aria-hidden="true">
				<div className="section-label mt-8 mb-4 w-max text-white">. </div>
			</div>
			<div className=" flex flex-col flex-1 lg:gap-20">
				<div className="relative">
					<WordReveal
						as="p"
						inline
						onView
						delay={0.1}
						step={0.07}
						className="display-l text-ink-muted max-w-[18ch] md:max-w-[22ch]"
						lines={[
							{ text: 'Feel free to reach out. I’m always excited to' },
							{ text: 'connect, collaborate, learn, and grow!', className: 'text-ink' },
						]}
					/>
				</div>

				<div className="lg:mt-20 mt-auto w-full flex max-sm:flex-col justify-between gap-10">
					<div>
					<motion.h2
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 1 }}
						viewport={{ once: true }}
						className="heading">Get in touch</motion.h2>

					{/* Contact details. <address> is the semantic element for a person's contact info. */}
					<address className="mt-5 flex flex-col gap-2 not-italic">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2, duration: 0.6 }}
							viewport={{ once: true }}
							className="flex flex-col gap-1">
							<div>
								<a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-2 lg:text-2xl text-lg font-medium tracking-[-0.01em] text-ink break-all">
									{EMAIL}
									<ArrowUpRight size={20} strokeWidth={2} className="shrink-0 group-hover:rotate-45 duration-300" />
								</a>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.2, duration: 0.6 }}
							viewport={{ once: true }}
							className="flex flex-col gap-1">
							<div>
								<a href={`tel:${PHONE}`} className="group inline-flex items-center gap-2 lg:text-2xl text-lg font-medium tracking-[-0.01em] text-ink break-all">
									{PHONE}
									<ArrowUpRight size={20} strokeWidth={2} className="shrink-0 group-hover:rotate-45 duration-300" />
								</a>
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.35, duration: 0.6 }}
							viewport={{ once: true }}
							className="flex flex-col gap-1">
							<div className="lg:text-2xl text-lg tracking-[-0.01em] text-meta">{LOCATION}</div>
						</motion.div>

					</address>
					</div>

					{/* Socials — same links and arrow treatment as the hero, stacked in a column on the right. */}
					<ul className="caps text-ink flex flex-col gap-3 sm:self-end">
						{SOCIALS.map((s, i) => (
							<motion.li
								key={s.name}
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 1.2 + i * 0.1 }}>
								<a href={s.link} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center group sm:justify-end">
									{s.name}
									<ArrowUpRight size={18} strokeWidth={2} className="group-hover:rotate-45 duration-300" />
								</a>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</section>
	)
}
