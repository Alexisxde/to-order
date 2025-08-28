import { motion } from "motion/react"

interface Props {
	message: string | undefined
}

export default function Error({ message }: Props) {
	return (
		<motion.p
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.5 }}
			className="text-destructive text-xs">
			{message}
		</motion.p>
	)
}
