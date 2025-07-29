"use client"
import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

export type AlertDialogContextType = {
	isOpen: boolean
	toggleAlertDialog: () => void
	triggerRef: RefObject<HTMLButtonElement | null>
}

const AlertDialogContext = createContext<AlertDialogContextType | null>(null)

export const useAlertDialog = () => {
	const context = useContext(AlertDialogContext)
	if (!context)
		throw new Error("useAlertDialog must be used within a AlertDialogProvider")
	return context
}

export type AlertDialogProviderProps = { children: React.ReactNode }

export const AlertDialogProvider = ({ children }: AlertDialogProviderProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const triggerRef = useRef<HTMLButtonElement>(null)
	const toggleAlertDialog = () => setIsOpen(prev => !prev)

	const contextValue = useMemo(
		() => ({ isOpen, toggleAlertDialog, triggerRef }),
		[isOpen]
	)

	return (
		<AlertDialogContext.Provider value={contextValue}>
			{children}
		</AlertDialogContext.Provider>
	)
}

export type AlertDialogProps = { children: React.ReactNode }

export function AlertDialog({ children }: AlertDialogProps) {
	return <AlertDialogProvider>{children}</AlertDialogProvider>
}

export type AlertDialogTriggerProps = {
	children: React.ReactNode
	className?: string
	triggerRef?: RefObject<HTMLButtonElement>
}

export function AlertDialogTrigger({
	children,
	className,
	triggerRef
}: AlertDialogTriggerProps) {
	const { toggleAlertDialog, isOpen } = useAlertDialog()

	const handleClick = useCallback(() => {
		toggleAlertDialog()
	}, [isOpen, toggleAlertDialog])

	return (
		<Button
			ref={triggerRef}
			className={cn("", className)}
			onClick={handleClick}>
			{children}
		</Button>
	)
}

type AlertDialogHeaderProps = { children: React.ReactNode; className?: string }

export function AlertDialogHeader({
	children,
	className
}: AlertDialogHeaderProps) {
	return (
		<div className={cn("mb-2 flex flex-col gap-2", className)}>{children}</div>
	)
}

export type AlertDialogTitleProps = {
	children: React.ReactNode
	className?: string
}

export function AlertDialogTitle({
	children,
	className
}: AlertDialogTitleProps) {
	return (
		<h2 className={cn("text-primary text-2xl font-semibold", className)}>
			{children}
		</h2>
	)
}

export type AlertDialogDescriptionProps = {
	children: React.ReactNode
	className?: string
}

export function AlertDialogDescription({
	children,
	className
}: AlertDialogDescriptionProps) {
	return <p className={cn("text-primary/80 text-sm", className)}>{children}</p>
}

export type AlertDialogContentProps = {
	children: React.ReactNode
	className?: string
}

export function AlertDialogContent({
	children,
	className
}: AlertDialogContentProps) {
	const { isOpen, toggleAlertDialog } = useAlertDialog()
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			)
				toggleAlertDialog()
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [toggleAlertDialog])

	return createPortal(
		<AnimatePresence mode="wait">
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="bg-background/25 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs">
					<motion.div
						ref={containerRef}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ duration: 0.15 }}
						className={cn(
							"bg-background border-muted w-full max-w-lg min-w-xs rounded-md border p-4",
							className
						)}>
						{children}
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body
	)
}

export type AlertDialogFooterProps = {
	children: React.ReactNode
	className?: string
}

export function AlertDialogFooter({
	children,
	className
}: AlertDialogFooterProps) {
	return (
		<div className={cn("flex items-center justify-end gap-2", className)}>
			{children}
		</div>
	)
}

export type AlertDialogCancelProps = {
	children: React.ReactNode
	className?: string
	onClick?: () => void
}

export function AlertDialogCancel({
	children,
	className
}: AlertDialogCancelProps) {
	const { toggleAlertDialog } = useAlertDialog()

	return (
		<Button
			variant="destructive"
			className={cn("", className)}
			onClick={toggleAlertDialog}>
			{children}
		</Button>
	)
}

export type AlertDialogActionProps = {
	children: React.ReactNode
	className?: string
	onClick?: () => void
}

export function AlertDialogAction({
	children,
	className,
	onClick
}: AlertDialogActionProps) {
	return (
		<Button variant="outline" className={cn("", className)} onClick={onClick}>
			{children}
		</Button>
	)
}
