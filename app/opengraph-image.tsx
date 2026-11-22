import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { PERSON } from './lib/site'

// Static Geist cuts from the `geist` package — the site's variable woff can't be
// used here, and the default OG font has no bold for the display line.
const fontDir = join(process.cwd(), 'node_modules/geist/dist/fonts/geist-sans')

export const dynamic = 'force-static'
export const alt = `${PERSON.name} – ${PERSON.jobTitle}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Social share card in the site's own language: white ground, two-tone
// ink / ink-muted headline, left-aligned, nothing else.
export default async function OpengraphImage() {
	const [regular, bold] = await Promise.all([
		readFile(join(fontDir, 'Geist-Regular.ttf')),
		readFile(join(fontDir, 'Geist-Bold.ttf')),
	])

	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '72px 80px',
					background: '#FFFFFF',
					color: '#000000',
					fontFamily: 'Geist',
				}}
			>
				<div style={{ fontSize: 28, color: '#8A9099' }}>muz4mmil</div>
				<div style={{ display: 'flex', flexDirection: 'column', fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.035em' }}>
					<span>{PERSON.name}</span>
					<span style={{ color: '#A9AFB8' }}>{PERSON.jobTitle}</span>
				</div>
				<div style={{ fontSize: 28, color: '#56606B' }}>React · Next.js · Node.js · PostgreSQL</div>
			</div>
		),
		{
			...size,
			fonts: [
				{ name: 'Geist', data: regular, weight: 400, style: 'normal' },
				{ name: 'Geist', data: bold, weight: 700, style: 'normal' },
			],
		},
	)
}
