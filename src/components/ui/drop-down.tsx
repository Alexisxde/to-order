import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import { EllipsisVerticalIcon, LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { createContext, useContext, useRef, useState } from "react"

export type DropDownContextType = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	triggerRef: React.RefObject<HTMLButtonElement | null>
}

export const DropDownContext = createContext<DropDownContextType | null>(null)

export const useDropDown = () => {
	const context = useContext(DropDownContext)
	if (!context)
		throw new Error("useDropDown must be used within DropDownProvider")
	return context
}

export const DropDown = ({ children }: { children: React.ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)

	return (
		<DropDownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
			{children}
		</DropDownContext.Provider>
	)
}

type DropDownTriggerProps = { className?: string }

export const DropDownTrigger = ({ className }: DropDownTriggerProps) => {
	const { setIsOpen, triggerRef } = useDropDown()

	return (
		<button
			ref={triggerRef}
			onClick={() => setIsOpen(prev => !prev)}
			className={cn("flex cursor-pointer items-center gap-2 p-1", className)}>
			<EllipsisVerticalIcon className="size-4" />
		</button>
	)
}

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: { when: "beforeChildren", staggerChildren: 0.05 }
	},
	closed: {
		scaleY: 0,
		transition: { when: "afterChildren", staggerChildren: 0.05 }
	}
}

export const DropDownContainer = ({
	children
}: {
	children: React.ReactNode
}) => {
	const { isOpen } = useDropDown()

	return (
		<motion.div animate={isOpen ? "open" : "closed"} className="relative">
			{children}
		</motion.div>
	)
}

export const DropDownContent = ({
	children
}: {
	children: React.ReactNode
}) => {
	const { isOpen, setIsOpen, triggerRef } = useDropDown()
	const dropDownRef = useRef<HTMLUListElement>(null!)

	useClickOutside(dropDownRef, () => {
		if (
			isOpen &&
			triggerRef.current &&
			!triggerRef.current.contains(event?.target as Node)
		)
			setIsOpen(false)
	})

	return (
		<motion.ul
			ref={dropDownRef}
			initial={wrapperVariants.closed}
			variants={wrapperVariants}
			style={{ originY: "top" }}
			className="bg-card border-border absolute top-[100%] right-0 z-30 flex flex-col gap-1 overflow-hidden rounded-lg border p-2 shadow-xl">
			{children}
		</motion.ul>
	)
}

const itemVariants = {
	open: { opacity: 1, y: 0 },
	closed: { opacity: 0, y: -15 }
}

const actionIconVariants = {
	open: { scale: 1, y: 0 },
	closed: { scale: 0, y: -7 }
}

export type DropDownOption = {
	text: string
	Icon: LucideIcon
	onClick: () => void
}

export const DropDownOption = ({ text, Icon, onClick }: DropDownOption) => {
	const { setIsOpen } = useDropDown()

	return (
		<motion.button
			variants={itemVariants}
			onClick={() => {
				onClick()
				setIsOpen(false)
			}}
			className="text-primary hover:bg-muted flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-xs font-medium whitespace-nowrap">
			<motion.span variants={actionIconVariants}>
				<Icon className="size-4" />
			</motion.span>
			<span>{text}</span>
		</motion.button>
	)
}
