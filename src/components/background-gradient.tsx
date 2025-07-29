export default function BackgroundGradient() {
	return (
		<div className="bg-background absolute inset-0">
			<svg
				className="absolute inset-0 size-full opacity-[0.15] dark:opacity-[0.07]"
				xmlns="http://www.w3.org/2000/svg">
				<filter id="noise">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.65"
						numOctaves="3"
						stitchTiles="stitch"></feTurbulence>
					<feColorMatrix type="saturate" values="0"></feColorMatrix>
				</filter>
				<rect width="100%" height="100%" filter="url(#noise)"></rect>
			</svg>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(153,146,228,0.15),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(106,189,248,0.12),transparent_40%)]"></div>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(253,24,71,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(120,144,121,0.08),transparent_40%)]"></div>
		</div>
	)
}
