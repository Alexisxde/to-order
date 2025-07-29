"use client"
import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import {
	createContext,
	RefObject,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react"
import { createPortal } from "react-dom"

export type SheetContextType = {
	isOpen: boolean
	toggleSheet: () => void
	triggerRef: RefObject<HTMLButtonElement | null>
}

const SheetContext = createContext<SheetContextType | null>(null)

export const useSheet = () => {
	const context = useContext(SheetContext)
	if (!context) throw new Error("useSheet must be used within a SheetProvider")
	return context
}

export type SheetProviderProps = { children: React.ReactNode }

export const SheetProvider = ({ children }: SheetProviderProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null!)
	const toggleSheet = () => setIsOpen(prev => !prev)

	const contextValue = useMemo(
		() => ({ isOpen, toggleSheet, triggerRef }),
		[isOpen]
	)

	return (
		<SheetContext.Provider value={contextValue}>
			{children}
		</SheetContext.Provider>
	)
}

export type SheetProps = { children: React.ReactNode }

function Sheet({ children }: SheetProps) {
	return <SheetProvider>{children}</SheetProvider>
}

export type SheetTriggerProps = {
	children: React.ReactNode
	className?: string
	triggerRef?: RefObject<HTMLButtonElement>
}

function SheetTrigger({ children, className, triggerRef }: SheetTriggerProps) {
	const { toggleSheet, isOpen } = useSheet()

	const handleClick = useCallback(() => {
		toggleSheet()
	}, [isOpen, toggleSheet])

	return (
		<Button
			ref={triggerRef}
			className={cn("", className)}
			onClick={handleClick}>
			{children}
		</Button>
	)
}

type SheetHeaderProps = { children: React.ReactNode; className?: string }

function SheetHeader({ children, className }: SheetHeaderProps) {
	const { toggleSheet } = useSheet()

	return (
		<div className={cn("flex items-center justify-between p-4", className)}>
			<h3 className="text-lg font-medium">{children}</h3>
			<Button variant="ghost" onClick={toggleSheet}>
				<X />
				<span className="sr-only">Close</span>
			</Button>
		</div>
	)
}

export type SheetContentProps = {
	children: React.ReactNode
	className?: string
}

function SheetContent({ children, className }: SheetContentProps) {
	const { isOpen, toggleSheet } = useSheet()
	const containerRef = useRef<HTMLElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			)
				toggleSheet()
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [toggleSheet])

	return createPortal(
		<AnimatePresence mode="wait">
			{isOpen ? (
				<motion.aside
					ref={containerRef}
					initial={{ x: "200%" }}
					animate={{ x: 0 }}
					exit={{ x: "200%" }}
					transition={{ duration: 0.15 }}
					className={cn(
						"bg-background border-muted fixed top-0 right-0 bottom-0 z-50 h-dvh w-full max-w-xs border-l",
						className
					)}>
					{children}
				</motion.aside>
			) : null}
		</AnimatePresence>,
		document.body
	)
}

type SheetContainerProps = { children: React.ReactNode; className?: string }

function SheetContainer({ children, className }: SheetContainerProps) {
	return <div className={cn("flex-1 p-4", className)}>{children}</div>
}

export { Sheet, SheetContainer, SheetContent, SheetHeader, SheetTrigger }
