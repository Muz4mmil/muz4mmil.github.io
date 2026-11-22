'use client';
import React from 'react';
import projects from '@/app/data/projects.json';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const EASE = [0.22, 1, 0.36, 1] as const;

// Card opens from a deep inset; triggered at 40% visibility so the whole
// reveal happens on screen rather than at the bottom edge.
const cardReveal = {
	hidden: { clipPath: 'inset(18% 14% 18% 14% round 2rem)', opacity: 0.3 },
	shown: { clipPath: 'inset(0% 0% 0% 0% round 0rem)', opacity: 1, transition: { duration: 1.2, ease: EASE } },
};

const imageSettle = {
	hidden: { scale: 1.25 },
	shown: { scale: 1, transition: { duration: 1.4, ease: EASE } },
};

export default function Projects() {
	const reduce = useReducedMotion();

	return (
		<section id="projects" className="relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white min-h-screen">
			<div className="section-bar">
				<h2 className="section-label w-max">Projects</h2>
				<hr className='mt-4' />
			</div>

			<div className="flex flex-col">
				{projects.projects.map((project, index) => {
					const isEven = index % 2 === 0;
					return (
						<div
							key={project.name}
							className={`flex flex-col-reverse lg:flex-row items-center gap-10 mt-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
						>
							{/* Copy fades up just behind the image reveal. */}
							<motion.div
								className="lg:w-1/2 w-full space-y-5"
								initial={reduce ? false : { opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
							>
								<div className="flex items-baseline">
									<span className='text-[4.5rem] font-bold leading-none tracking-tighter text-hairline'>0{index + 1}</span>
									<h3 className="heading -ml-5">{project.name}</h3>
								</div>
								<p className="text-body md:text-body-l leading-[1.6]">{project.description}</p>

								<div className="flex gap-3 flex-wrap text-caps font-medium text-meta">
									{project.techStack.map((tech, i) => (
										<span key={i} className="flex gap-3">
											{tech}{i !== project.techStack.length - 1 && <span>/</span>}
										</span>
									))}
								</div>

								<div className="flex gap-4 pt-4">
									{project.code && (
										<a href={project.code} target='_blank' rel='noopener noreferrer' className='btn-secondary group/buttons'>Code <ArrowUpRight size={18} strokeWidth={2} className='group-hover/buttons:rotate-45 duration-300' /></a>
									)}
									<a href={project.link} target='_blank' rel='noopener noreferrer' className='btn-secondary group/buttons'>Preview <ArrowUpRight size={18} strokeWidth={2} className='group-hover/buttons:rotate-45 duration-300' /></a>
								</div>
							</motion.div>

							{/* Image opens out from an inset, rounded clip to the full card. The card's own
							    rounded-media corners still apply once the clip reaches 0. */}
							<motion.div
								className="media-card lg:w-1/2 w-full h-52 sm:h-96"
								variants={cardReveal}
								initial={reduce ? false : 'hidden'}
								whileInView="shown"
								viewport={{ once: true, amount: 0.4 }}
							>
								{/* Image settles from a slight zoom while the clip opens. */}
								<motion.div className="absolute inset-0" variants={imageSettle}>
									<Image
										src={project.imagePath}
										alt={`${project.name} screenshot`}
										fill
										sizes="(min-width: 1024px) 50vw, 100vw"
										className={`grayscale hover:grayscale-0 transition-all duration-700 ease-in-out ${project.imageFit === 'cover' ? 'object-cover' : 'object-contain p-10'}`}
									/>
								</motion.div>
							</motion.div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
