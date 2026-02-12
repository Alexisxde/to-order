"use client"

import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import type { Transition, Variants } from "motion/react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { createContext, isValidElement, useContext, useEffect, useId, useRef, useState } from "react"

const TRANSITION: Transition = { type: "spring", bounce: 0.1, duration: 0.4 }

type MorphingPopoverContextValue = {
	isOpen: boolean
	open: () => void
	close: () => void
	uniqueId: string
	variants?: Variants
}

const MorphingPopoverContext = createContext<MorphingPopoverContextValue | null>(null)

function usePopoverLogic({
	defaultOpen = false,
	open: controlledOpen,
	onOpenChange
}: {
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
} = {}) {
	const uniqueId = useId()
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)

	const isOpen = controlledOpen ?? uncontrolledOpen

	const open = () => {
		if (controlledOpen === undefined) {
			setUncontrolledOpen(true)
		}
		onOpenChange?.(true)
	}

	const close = () => {
		if (controlledOpen === undefined) {
			setUncontrolledOpen(false)
		}
		onOpenChange?.(false)
	}

	return { isOpen, open, close, uniqueId }
}

export function usePopover() {
	const context = useContext(MorphingPopoverContext)
	if (!context) throw new Error("usePopover must be used within a PopoverProvider")
	return context
}

export type MorphingPopoverProps = {
	children: React.ReactNode
	transition?: Transition
	defaultOpen?: boolean
	open?: boolean
	onOpenChange?: (open: boolean) => void
	variants?: Variants
	className?: string
} & React.ComponentProps<"div">

function MorphingPopover({
	children,
	transition = TRANSITION,
	defaultOpen,
	open,
	onOpenChange,
	variants,
	className,
	...props
}: MorphingPopoverProps) {
	const popoverLogic = usePopoverLogic({ defaultOpen, open, onOpenChange })

	return (
		<MorphingPopoverContext.Provider value={{ ...popoverLogic, variants }}>
			<MotionConfig transition={transition}>
				<div
					className={cn("relative flex items-center justify-center", className)}
					key={popoverLogic.uniqueId}
					{...props}>
					{children}
				</div>
			</MotionConfig>
		</MorphingPopoverContext.Provider>
	)
}

export type MorphingPopoverTriggerProps = {
	asChild?: boolean
	children: React.ReactNode
	className?: string
} & React.ComponentProps<typeof motion.button>

function MorphingPopoverTrigger({ children, className, asChild = false, ...props }: MorphingPopoverTriggerProps) {
	const { open, uniqueId, isOpen } = usePopover()

	if (asChild && isValidElement(children)) {
		const MotionComponent = motion.create(children.type as React.ForwardRefExoticComponent<any>)
		const childProps = children.props as Record<string, unknown>

		return (
			<MotionComponent
				{...childProps}
				onClick={open}
				layoutId={`popover-trigger-${uniqueId}`}
				className={childProps.className}
				key={uniqueId}
				aria-expanded={isOpen}
				aria-controls={`popover-content-${uniqueId}`}
			/>
		)
	}

	return (
		<motion.div key={uniqueId} layoutId={`popover-trigger-${uniqueId}`} onClick={open}>
			<motion.button
				{...props}
				layoutId={`popover-label-${uniqueId}`}
				key={uniqueId}
				className={className}
				aria-expanded={isOpen}
				aria-controls={`popover-content-${uniqueId}`}>
				{children}
			</motion.button>
		</motion.div>
	)
}

export type MorphingPopoverContentProps = {
	children: React.ReactNode
	className?: string
} & React.ComponentProps<typeof motion.div>

function MorphingPopoverContent({ children, className, ...props }: MorphingPopoverContentProps) {
	const { isOpen, close, variants, uniqueId } = usePopover()
	const ref = useRef<HTMLDivElement>(null!)

	useClickOutside(ref, () => {
		if (isOpen) close()
	})

	useEffect(() => {
		if (!isOpen) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") close()
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [isOpen, close])

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						{...props}
						ref={ref}
						layoutId={`popover-trigger-${uniqueId}`}
						key={uniqueId}
						id={`popover-content-${uniqueId}`}
						role="dialog"
						aria-modal="true"
						className={cn("absolute overflow-hidden rounded-md", className)}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants}>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export { MorphingPopover, MorphingPopoverContent, MorphingPopoverTrigger }
