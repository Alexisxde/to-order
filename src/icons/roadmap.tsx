import type { SVGProps } from "react"

export default function RoadMapIcon({
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
			<path d="M4,22c0,1.105-.895,2-2,2s-2-.895-2-2,.895-2,2-2,2,.895,2,2Zm6.5-6c0,1.105,.895,2,2,2s2-.895,2-2-.895-2-2-2-2,.895-2,2Zm-4,1h1.5c.552,0,1-.447,1-1s-.448-1-1-1h-1.5c-1.378,0-2.5-1.121-2.5-2.5s1.122-2.5,2.5-2.5H15c.553,0,1-.448,1-1s-.447-1-1-1H6.5c-2.481,0-4.5,2.019-4.5,4.5s2.019,4.5,4.5,4.5Zm13.5-2h-3c-.553,0-1,.447-1,1s.447,1,1,1h3c1.103,0,2,.897,2,2s-.897,2-2,2H7c-.552,0-1,.447-1,1s.448,1,1,1h13c2.206,0,4-1.794,4-4s-1.794-4-4-4Zm-1-5c.553,0,1-.448,1-1v-3.75l3.565-1.885c.581-.399,.581-1.329,0-1.729l-2.813-1.259c-.556-.249-1.151-.377-1.751-.377-.553,0-1,.448-1,1V9c0,.552,.447,1,1,1Z" />
		</svg>
	)
}
