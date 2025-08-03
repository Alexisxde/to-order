"use client"
import Button, { ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef
} from "react"
import { createPortal } from "react-dom"

export type DialogContextType = { isOpen: boolean; toggleDialog: () => void }

const DialogContext = createContext<DialogContextType | null>(null)

export const useDialog = () => {
	const context = useContext(DialogContext)
	if (!context)
		throw new Error("useDialog must be used within a DialogProvider")
	return context
}

export type DialogProviderProps = {
	children: React.ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DialogProvider = ({
	children,
	isOpen,
	setIsOpen
}: DialogProviderProps) => {
	const toggleDialog = () => {
		document.body.classList.toggle("overflow-hidden")
		setIsOpen(prev => !prev)
	}
	const contextValue = useMemo(() => ({ isOpen, toggleDialog }), [isOpen])

	return (
		<DialogContext.Provider value={contextValue}>
			{children}
		</DialogContext.Provider>
	)
}

export const Dialog = ({
	children,
	isOpen,
	setIsOpen
}: DialogProviderProps) => {
	return (
		<DialogProvider isOpen={isOpen} setIsOpen={setIsOpen}>
			{children}
		</DialogProvider>
	)
}

export type DialogTriggerProps = {
	children: React.ReactNode
	className?: string
} & ButtonProps

export function DialogTrigger({
	children,
	className,
	...props
}: DialogTriggerProps) {
	const { toggleDialog, isOpen } = useDialog()

	const handleClick = useCallback(() => {
		toggleDialog()
	}, [isOpen, toggleDialog])

	return (
		<Button className={cn("", className)} onClick={handleClick} {...props}>
			{children}
		</Button>
	)
}

export type DialogOverlayProps = {
	children: React.ReactNode
	className?: string
}

export function DialogOverlay({ children, className }: DialogOverlayProps) {
	const { isOpen } = useDialog()

	return createPortal(
		<AnimatePresence mode="wait">
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn(
						"bg-background/25 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs",
						className
					)}>
					{children}
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body
	)
}

export type DialogContent = { children: React.ReactNode; className?: string }

export function DialogContent({ children, className }: DialogContent) {
	const { toggleDialog } = useDialog()
	const diaRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (diaRef.current && !diaRef.current.contains(e.target as Node))
				toggleDialog()
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [toggleDialog])

	return (
		<DialogOverlay>
			<motion.div
				ref={diaRef}
				initial={{ scale: 0.85, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.85, opacity: 0 }}
				transition={{ duration: 0.15 }}
				className={cn(
					"bg-background border-muted w-full max-w-lg min-w-xs rounded-md border p-4",
					className
				)}>
				{children}
			</motion.div>
		</DialogOverlay>
	)
}
