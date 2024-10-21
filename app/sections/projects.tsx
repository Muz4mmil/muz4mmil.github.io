import React from 'react'
import projects from '@/app/data/projects.json'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function Projects() {
	return (
		<section id='#PROJECTS' className='relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white'>
			<div className="sticky top-0 z-10 bg-white">
				<h1 className="text-4xl font-semibold mt-8 max-sm:mt-20 w-max">Projects</h1>
				<hr className='mt-4' />
			</div>

			<div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12 my-10">
				{projects.projects.map((project, index) => (
					<motion.div
						initial={{ scale: 0.2, opacity: 0 }}
						whileInView={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.5 + (index * 0.3) }}
						viewport={{ once: true }}
						key={index} className="group/card">
						<div className="p-5 pb-2 h-80 max-sm:h-56 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 border rounded-lg">
							<div className="w-full h-full relative">
								<Image src={project.imagePath} layout='fill' objectFit='contain' className=' grayscale group-hover/card:grayscale-0 duration-200' alt={project.name} />
							</div>
						</div>

						<div className="flex justify-between items-end">
							<h4 className="text-2xl font-medium mt-3">{project.name}</h4>
							<div className="flex">
								<Link href={project.code} target='_blank' className='flex items-center border border-white hover:border-neutral-300 rounded-full px-3 group/buttons'>Code <ArrowUpRight size={16} className='ml-1 group-hover/buttons:rotate-45 duration-300' /></Link>
								<Link href={project.link} target='_blank' className='flex items-center border border-white hover:border-neutral-300 rounded-full px-3 group/buttons'>Preview <ArrowUpRight size={16} className='ml-1 group-hover/buttons:rotate-45 duration-300' /></Link>
							</div>
						</div>

						<p className='my-3 text-justify text-neutral-600'>{project.description}</p>
						<div className="flex gap-3 flex-wrap">
							{project.techStack.map((item, i) => (
								<div key={i} className='flex gap-3'>
									<div className="text-xs">{item}</div>
									{i !== project.techStack.length - 1 && <span className='text-xs'>/</span>}
								</div>
							))}
						</div>
					</motion.div>
				))}
			</div>
		</section>
	)
}
