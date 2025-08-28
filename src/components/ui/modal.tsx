"use client"
import Button, { type ButtonProps } from "@/components/ui/button"
import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { AnimatePresence, motion, Transition } from "motion/react"
import React, {
	createContext,
	isValidElement,
	useCallback,
	useContext,
	useMemo,
	useRef
} from "react"
import { createPortal } from "react-dom"

export type ModalContextType = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextType | null>(null)

export type ModalProps = {
	children: React.ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalProvider = ({ children, isOpen, setIsOpen }: ModalProps) => {
	const contextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen])

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
		</ModalContext.Provider>
	)
}

export const useModal = () => {
	const context = useContext(ModalContext)
	if (!context) throw new Error("useModal must be used within a ModalProvider")
	return context
}

export const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
	return (
		<ModalProvider isOpen={isOpen} setIsOpen={setIsOpen}>
			{children}
		</ModalProvider>
	)
}

export type ModalTriggerProps = {
	children: React.ReactNode
	className?: string
	asChild?: boolean
} & React.ComponentProps<typeof motion.button>

export function ModalTrigger({
	children,
	className,
	asChild = false,
	...props
}: ModalTriggerProps) {
	const { setIsOpen } = useModal()

	if (asChild && isValidElement(children)) {
		const MotionComponent = motion.create(
			children.type as React.ForwardRefExoticComponent<any>
		)
		const childProps = children.props as Record<string, unknown>

		return (
			<MotionComponent
				{...childProps}
				onClick={() => setIsOpen(true)}
				className={childProps.className}
			/>
		)
	}

	return (
		<motion.div onClick={() => setIsOpen(true)}>
			<motion.button {...props} className={className}>
				{children}
			</motion.button>
		</motion.div>
	)
}

export type ModalPortal = { children: React.ReactNode; className?: string }

export function ModalPortal({ children, className }: ModalPortal) {
	const { isOpen } = useModal()

	return createPortal(
		<AnimatePresence mode="wait">
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn(
						"fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs",
						className
					)}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}

export type ModalHeader = { children: React.ReactNode; className?: string }

export function ModalHeader({ children, className }: ModalHeader) {
	return (
		<div className={cn("flex items-center justify-between", className)}>
			{children}
		</div>
	)
}

export type ModalClose = {
	children?: React.ReactNode
	className?: string
} & ButtonProps

export function ModalClose({ children, className, ...props }: ModalClose) {
	const { setIsOpen } = useModal()
	const handleClick = useCallback(() => setIsOpen(false), [setIsOpen])

	return (
		<Button
			variant={"ghost"}
			size={"icon"}
			className={cn("rounded-full", className)}
			onClick={handleClick}
			{...props}>
			{children ?? <X />}
		</Button>
	)
}

export type ModalAction = {
	children?: React.ReactNode
	className?: string
	onClick: () => void
} & ButtonProps

export function ModalAction({
	children,
	className,
	onClick,
	...props
}: ModalAction) {
	const { setIsOpen } = useModal()

	return (
		<Button
			variant={"destructive"}
			size={"default"}
			className={cn("", className)}
			onClick={() => {
				onClick()
				setIsOpen(false)
			}}
			{...props}>
			{children ?? <X />}
		</Button>
	)
}

export type ModalContent = {
	children: React.ReactNode
	className?: string
	from?: "top" | "bottom" | "left" | "right"
	transition?: Transition
}

export function ModalContent({
	children,
	className,
	from = "top",
	transition = { type: "spring", stiffness: 150, damping: 25 }
}: ModalContent) {
	const { isOpen, setIsOpen } = useModal()
	const modalRef = useRef<HTMLDivElement>(null!)

	useClickOutside(modalRef, () => {
		if (isOpen) setIsOpen(false)
	})

	const initialRotation = from === "top" || from === "left" ? "20deg" : "-20deg"
	const isVertical = from === "top" || from === "bottom"
	const rotateAxis = isVertical ? "rotateX" : "rotateY"

	const wrapperVariants = {
		open: {
			opacity: 1,
			filter: "blur(0px)",
			transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
			transition: {
				...transition,
				when: "beforeChildren",
				staggerChildren: 0.1
			}
		},
		closed: {
			opacity: 0,
			filter: "blur(4px)",
			transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
			transition: { ...transition, when: "afterChildren", staggerChildren: 0.1 }
		}
	}

	return (
		<motion.div
			ref={modalRef}
			initial="closed"
			animate="open"
			exit="closed"
			variants={wrapperVariants}
			className={cn(
				"bg-background border-border absolute rounded-lg border p-4",
				className
			)}>
			{children}
		</motion.div>
	)
}
