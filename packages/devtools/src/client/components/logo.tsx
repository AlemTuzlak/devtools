import type { JSX } from "solid-js"

interface LogoProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
	class?: string
}

const Logo = (props: LogoProps) => {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 634 633" viewBox="0 0 634 633">
			<title>Devtools logo</title>
			<g transform="translate(1)">
				<linearGradient
					x1="-641.486"
					x2="-641.486"
					y1="856.648"
					y2="855.931"
					gradientTransform="matrix(633 0 0 -633 406377 542258)"
					gradientUnits="userSpaceOnUse"
					id="a-cl-0"
				>
					<stop offset="0" stop-color="#6bdaff" />
					<stop offset="0.319" stop-color="#f9ffb5" />
					<stop offset="0.706" stop-color="#ffa770" />
					<stop offset="1" stop-color="#ff7373" />
				</linearGradient>
				<circle cx="316.5" cy="316.5" r="316.5" fill-rule="evenodd" clip-rule="evenodd" fill="url(#a-cl-0)" />
				<defs>
					<filter width="454" height="396.9" x="-137.5" y="412" filterUnits="userSpaceOnUse" id="b-cl-0">
						<feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
					</filter>
				</defs>
				<mask width="454" height="396.9" x="-137.5" y="412" maskUnits="userSpaceOnUse" id="c-cl-0">
					<g filter="url(#b-cl-0)">
						<circle cx="316.5" cy="316.5" r="316.5" fill="#FFF" fill-rule="evenodd" clip-rule="evenodd" />
					</g>
				</mask>
				<ellipse
					cx="89.5"
					cy="610.5"
					fill="#015064"
					fill-rule="evenodd"
					stroke="#00CFE2"
					stroke-width="25"
					clip-rule="evenodd"
					rx="214.5"
					ry="186"
					mask="url(#c-cl-0)"
				/>
				{/* Additional SVG content truncated for brevity */}
			</g>
		</svg>
	)
}

export { Logo }
