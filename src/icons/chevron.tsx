import type { SVGProps } from "react"

export default function ChevronArrowIcon({
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
			fill="currentColor"
			{...rest}>
			<path d="M15.75 19.5 8.25 12l7.5-7.5" />
		</svg>
	)
}
