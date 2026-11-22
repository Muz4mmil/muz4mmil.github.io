// Single source for identity, URLs and outbound links. Used by metadata,
// JSON-LD, robots/sitemap and the hero/contact socials.

// Set NEXT_PUBLIC_SITE_URL when deploying to a custom domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://muz4mmil.github.io').replace(/\/$/, '')

export const PERSON = {
	name: 'Muzammil Siddiqui',
	jobTitle: 'Full Stack Developer',
	email: 'muzammilsiddiqui826@gmail.com',
	phone: '+91 9146368803',
	location: { city: 'Aurangabad', region: 'Maharashtra', country: 'IN', label: 'Aurangabad, MH, India' },
	worksFor: { name: 'Sleeksky Technologies' },
	alumniOf: { name: 'Maharashtra Institute of Technology, Aurangabad' },
	image: '/me.webp',
	resume: '/Resume-Muzammil.pdf',
}

export const SITE_TITLE = `${PERSON.name} – Full Stack Developer | React & Next.js`

export const SITE_DESCRIPTION =
	'Muzammil Siddiqui is a full stack developer in India building web and mobile apps with React, Next.js, Node.js and PostgreSQL. See projects and get in touch.'

export const SOCIALS = [
	{ name: 'LINKEDIN', link: 'https://www.linkedin.com/in/muz4mmil' },
	{ name: 'GITHUB', link: 'https://github.com/muz4mmil' },
	{ name: 'INSTAGRAM', link: 'https://instagram.com/muz4mmil.s' },
	{ name: 'X (TWITTER)', link: 'https://x.com/Muz4mmil_' },
]

export const SECTIONS = [
	{ id: 'home', name: 'HOME' },
	{ id: 'about', name: 'ABOUT' },
	{ id: 'projects', name: 'PROJECTS' },
	{ id: 'contact', name: 'CONTACT' },
]
