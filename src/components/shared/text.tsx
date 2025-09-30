"use client"
import { motion } from "motion/react"

interface Props {
	label: string
}

export default function Text({ label }: Props) {
	const words = label.split(" ")

	return (
		<h1 className="z-2 cursor-default text-7xl lg:text-9xl h-fit">
			{words.map((word, wordIndex) => (
				<span key={wordIndex} className="whitespace-nowrap">
					{word.split("").map((letter, index) => (
						<motion.span
							style={{ display: "inline-block" }}
							whileHover={{ scale: 1.15, marginInline: "8px" }}
							transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
							key={index}
							className="font-normal transition-all duration-150 ease-out hover:font-extrabold">
							{letter}
						</motion.span>
					))}
					{wordIndex < words.length - 1 && (
						<span className="inline-block">&nbsp;</span>
					)}
				</span>
			))}
		</h1>
	)
}
