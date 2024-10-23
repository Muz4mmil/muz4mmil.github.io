'use client'

import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

export default function Contact() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [sending, setSending] = useState(false)

	const sendEmail = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name && !email && !message) return;

		setSending(true)
		const data = { name, email, message }

		emailjs
			.send(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
				data,
				{
					publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
				})
			.then(
				() => {
					alert("Message Sent Successfully! I'll reach out to you ASAP ;)");
					setSending(false)
				},
				(error) => {
					console.log('FAILED TO SEND MESSAGE...', error.text);
					setSending(false)
				},
			);
	};

	return (
		<section id='#CONTACT' className='h-[100dvh] relative max-w-[1366px] mx-auto px-[5%] w-full flex flex-col bg-white'>
			<div className="sticky top-0 z-10 bg-white">
				<h1 className="text-4xl font-semibold mt-8 mb-4 max-sm:mt-20 w-max text-white max-sm:h-0 max-sm:overflow-hidden">. </h1>
			</div>
			<div className="lg:mb-36 grid lg:grid-cols-2 grid-cols-1 place-items-center lg:gap-20 h-full">
				<div className="relative">
					<p className="text-6xl max-sm:text-4xl leading-[1.2] text-gray-400 font-extrabold">
						Feel free to reach out—I{"'"}m always excited to <span className="text-black">connect, collaborate, learn, and grow!</span>
					</p>
					<motion.div
						initial={{ scaleX: 1 }}
						whileInView={{ scaleX: 0 }}
						transition={{ delay: 0.5, duration: 0.8, ease: 'easeIn' }}
						viewport={{ once: true }}
						className="absolute top-0 left-0 h-full w-full origin-right bg-white">

					</motion.div>
				</div>

				<div className="lg:mt-20 mt-8 w-full">
					<motion.h3
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 1 }}
						viewport={{ once: true }}
						className="text-3xl font-medium text-neutral-800">Get in touch</motion.h3>
					<form onSubmit={sendEmail} className='mt-4 flex flex-col gap-3'>
						<div className="flex flex-col rounded-3xl">
							<motion.input
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 1.2 }}
								viewport={{ once: true }}
								value={name} onChange={(e) => setName(e.target.value)} type="text" className="text-2xl max-sm:text-xl border border-neutral-400 px-6 py-4 rounded-full" placeholder='Name' required />
							<motion.input
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 1.35 }}
								viewport={{ once: true }}
								value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="text-2xl max-sm:text-xl border border-neutral-400 px-6 py-4 rounded-full" placeholder='Email' required />
							<motion.textarea
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ delay: 1.5 }}
								viewport={{ once: true }}
								value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="text-2xl max-sm:text-xl border border-neutral-400 px-6 py-4 rounded-3xl" placeholder='Message' required />
						</div>

						<motion.button
							initial={{ scale: 0 }}
							whileInView={{ scale: 1 }}
							transition={{ delay: 1.8 }}
							viewport={{ once: true }}
							type='submit' className={`w-max ml-auto flex gap-2 items-center border border-black ${sending ? 'bg-white text-black' : 'bg-black text-white'}  rounded-full px-5 py-3`}
							disabled={sending}
						>
							{sending ? 'Sending . . .' : <>Send <ArrowRight size={22} /></>}
						</motion.button>
					</form>
				</div>
			</div>
		</section>
	)
}
