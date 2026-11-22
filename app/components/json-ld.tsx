import projects from '@/app/data/projects.json'
import skills from '@/app/data/skills.json'
import { PERSON, SITE_DESCRIPTION, SITE_URL, SOCIALS } from '@/app/lib/site'

// schema.org graph so search and AI engines can resolve "Muzammil Siddiqui" as
// one entity: who, where they work, what they know, what they have built.
export default function JsonLd() {
	const personId = `${SITE_URL}/#person`

	const graph = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: PERSON.name,
				jobTitle: PERSON.jobTitle,
				description: SITE_DESCRIPTION,
				url: SITE_URL,
				image: `${SITE_URL}${PERSON.image}`,
				email: `mailto:${PERSON.email}`,
				address: {
					'@type': 'PostalAddress',
					addressLocality: PERSON.location.city,
					addressRegion: PERSON.location.region,
					addressCountry: PERSON.location.country,
				},
				worksFor: { '@type': 'Organization', name: PERSON.worksFor.name },
				alumniOf: { '@type': 'CollegeOrUniversity', name: PERSON.alumniOf.name },
				knowsAbout: Object.values(skills).flat().map((s) => s.name),
				sameAs: SOCIALS.map((s) => s.link),
			},
			{
				'@type': 'WebSite',
				'@id': `${SITE_URL}/#website`,
				url: SITE_URL,
				name: PERSON.name,
				publisher: { '@id': personId },
				inLanguage: 'en',
			},
			{
				'@type': 'ProfilePage',
				'@id': `${SITE_URL}/#profile`,
				url: SITE_URL,
				name: `${PERSON.name} – ${PERSON.jobTitle}`,
				isPartOf: { '@id': `${SITE_URL}/#website` },
				mainEntity: { '@id': personId },
			},
			...projects.projects.map((p) => ({
				'@type': 'CreativeWork',
				name: p.name,
				description: p.description,
				url: p.link,
				image: `${SITE_URL}${p.imagePath}`,
				keywords: p.techStack.join(', '),
				creator: { '@id': personId },
				...(p.code ? { hasPart: { '@type': 'SoftwareSourceCode', codeRepository: p.code } } : {}),
			})),
		],
	}

	return (
		<script
			type="application/ld+json"
			// Escape "<" so no string in the data can close the script tag.
			dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }}
		/>
	)
}
