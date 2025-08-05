import Button from "@/components/ui/button"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useId, useState } from "react"
import { createPortal } from "react-dom"

export default function Test() {
	const [isOpen, setIsOpen] = useState(false)
	const _id = useId()

	return (
		<div>
			<motion.button
				layoutId={`dialog-${_id}`}
				onClick={() => setIsOpen(true)}
				className="h-[40px] w-[100px] rounded-lg bg-neutral-900">
				Open
			</motion.button>

			{createPortal(
				<AnimatePresence initial={false} mode="sync">
					{isOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="bg-background/25 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
							<motion.div
								layoutId={`dialog-${_id}`}
								initial={{
									filter: "blur(16px)",
									transition: {
										when: "afterChildren",
										staggerChildren: 0.1,
										type: "spring",
										stiffness: 150,
										damping: 24
									}
								}}
								animate={{
									filter: "blur(0px)",
									transition: {
										when: "beforeChildren",
										staggerChildren: 0.1,
										type: "spring",
										stiffness: 150,
										damping: 24
									}
								}}
								exit={{
									filter: "blur(0px)",
									transition: {
										when: "afterChildren",
										staggerChildren: 0.1,
										type: "spring",
										stiffness: 150,
										damping: 24
									}
								}}
								className="border-border h-[98dvh] w-[98vw] rounded-lg border-2 bg-neutral-900 p-6 lg:h-[95dvh]">
								<div className="flex items-center justify-end">
									<Button
										variant={"ghost"}
										onClick={() => setIsOpen(false)}
										className="rounded-full">
										<X />
									</Button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>,
				document.body
			)}
		</div>
	)
}
