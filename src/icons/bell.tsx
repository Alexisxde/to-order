import type { SVGProps } from "react"

export default function BellIcon({
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
			<path d="M22.555,13.662l-1.9-6.836A9.321,9.321,0,0,0,2.576,7.3L1.105,13.915A5,5,0,0,0,5.986,20H7.1a5,5,0,0,0,9.8,0h.838a5,5,0,0,0,4.818-6.338ZM12,22a3,3,0,0,1-2.816-2h5.632A3,3,0,0,1,12,22Zm8.126-5.185A2.977,2.977,0,0,1,17.737,18H5.986a3,3,0,0,1-2.928-3.651l1.47-6.616a7.321,7.321,0,0,1,14.2-.372l1.9,6.836A2.977,2.977,0,0,1,20.126,16.815Z" />
		</svg>
	)
}
