'use client';
import React from 'react';
import projects from '@/app/data/projects.json';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
	return (
		<section id="projects" className="relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white min-h-screen">
			<div className="sticky top-0 z-10 bg-white">
				<h1 className="text-4xl font-semibold mt-8 max-sm:mt-20 w-max">Projects</h1>
				<hr className='mt-4' />
			</div>

			<div className="flex flex-col">
				{projects.projects.map((project, index) => {
					const isEven = index % 2 === 0;
					return (
						<motion.div
							key={index}
							className={`flex flex-col-reverse lg:flex-row items-center gap-10 mt-16 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: index * 0.15 }}
						>
							<div className="lg:w-1/2 w-full text-black space-y-5">
								<div className="flex items-end">
									<span className='text-7xl font-bold text-neutral-200 tracking-tighter' style={{ lineHeight: '3.5rem'}}>0{index + 1}</span>
									<h3 className="text-3xl -ml-4 font-medium bg-white tracking-tight" style={{ lineHeight: '1.5rem'}}>{project.name}</h3>
								</div>
								<p className="text-neutral-600 leading-relaxed md:text-lg">{project.description}</p>

								<div className="flex gap-3 flex-wrap text-sm text-neutral-500 tracking-wide">
									{project.techStack.map((tech, i) => (
										<span key={i} className="uppercase flex gap-3">
											{tech}{i !== project.techStack.length - 1 && <span className="">/</span>}
										</span>
									))}
								</div>

								<div className="flex gap-4 pt-4">
									<Link href={project.code} target='_blank' className='flex items-center border border-white hover:border-neutral-300 rounded-full px-3 py-1 group/buttons'>Code <ArrowUpRight size={16} className='ml-1 group-hover/buttons:rotate-45 duration-300' /></Link>
									<Link href={project.link} target='_blank' className='flex items-center border border-white hover:border-neutral-300 rounded-full px-3 py-1 group/buttons'>Preview <ArrowUpRight size={16} className='ml-1 group-hover/buttons:rotate-45 duration-300' /></Link>
								</div>
							</div>

							<div className="relative lg:w-1/2 w-full h-72 sm:h-96 overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-md">
								<Image
									src={project.imagePath}
									alt={project.name}
									fill
									className={`object-contain p-10 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out ${!index && 'object-cover p-0 scale-[1.10] max-sm:scale-125 mt-5'}`}
								/>
							</div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
