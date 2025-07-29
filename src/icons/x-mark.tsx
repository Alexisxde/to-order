import type { SVGProps } from "react"

export default function XMarkIcon({
	width = 24,
	height = 24,
	className,
	...rest
}: SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={width}
			height={height}
			className={className}
			stroke="currentColor"
			strokeWidth="1.5"
			{...rest}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18 18 6M6 6l12 12"
			/>
		</svg>
	)
}
