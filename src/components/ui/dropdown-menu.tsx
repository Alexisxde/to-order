"use client"
import Button, { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react"

export type DropdownMenuContextType = {
	isOpen: boolean
	toggleDropdownMenu: (state: boolean) => void
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null)

export const useDropdownMenu = () => {
	const context = useContext(DropdownMenuContext)
	if (!context)
		throw new Error(
			"useDropdownMenu must be used within a DropdownMenuProvider"
		)
	return context
}

export type DropdownMenuProviderProps = { children: React.ReactNode }

export const DropdownMenuProvider = ({
	children
}: DropdownMenuProviderProps) => {
	const [isOpen, setIsOpen] = useState(true)
	const toggleDropdownMenu = (state: boolean) => setIsOpen(state ?? !isOpen)

	const contextValue = useMemo(() => ({ isOpen, toggleDropdownMenu }), [isOpen])

	return (
		<DropdownMenuContext.Provider value={contextValue}>
			{children}
		</DropdownMenuContext.Provider>
	)
}

export type DropdownMenuProps = { children: React.ReactNode }

export function DropdownMenu({ children }: DropdownMenuProps) {
	return <DropdownMenuProvider>{children}</DropdownMenuProvider>
}

export type DropdownMenuTriggerProps = {
	children: React.ReactNode
	className?: string
} & ButtonProps

export function DropdownMenuTrigger({
	children,
	className,
	variant = "outline",
	...props
}: DropdownMenuTriggerProps) {
	const { isOpen, toggleDropdownMenu } = useDropdownMenu()

	const handleClick = useCallback(() => {
		toggleDropdownMenu(true)
	}, [isOpen, toggleDropdownMenu])

	return (
		<Button
			variant={variant}
			className={cn("", className)}
			onClick={handleClick}
			{...props}>
			{children}
		</Button>
	)
}

export type DropdownMenuContentProps = {
	children: React.ReactNode
	className?: string
}

export function DropdownMenuContent({
	children,
	className
}: DropdownMenuContentProps) {
	const { isOpen, toggleDropdownMenu } = useDropdownMenu()
	const dropdownRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				toggleDropdownMenu(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<motion.div
			ref={dropdownRef}
			animate={isOpen ? "open" : "closed"}
			className={cn("relative flex w-full items-center", className)}>
			<motion.div
				initial={wrapperVariants.closed}
				variants={wrapperVariants}
				style={{ originX: "left", originY: "bottom" }}
				className={cn(
					"border-muted bg-background absolute bottom-11 left-5 z-30 flex flex-col gap-2 rounded-md rounded-bl-none border p-2 text-[11px]",
					className
				)}>
				{children}
			</motion.div>
		</motion.div>
	)
}

type DropdownMenuLabelProps = { children: React.ReactNode; className?: string }

export function DropdownMenuLabel({
	children,
	className
}: DropdownMenuLabelProps) {
	return <span className={cn("mb-2 flex", className)}>{children}</span>
}

export type DropdownMenuItemProps = {
	children: React.ReactNode
	className?: string
} & ButtonProps

export function DropdownMenuItem({
	children,
	className,
	onClick,
	...props
}: DropdownMenuItemProps) {
	return (
		<Button
			variant="ghost"
			onClick={onClick}
			className={cn("", className)}
			{...props}>
			{children}
		</Button>
	)
}

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: { when: "beforeChildren", staggerChildren: 0.1 }
	},
	closed: {
		scaleY: 0,
		transition: { when: "afterChildren", staggerChildren: 0.1 }
	}
}
