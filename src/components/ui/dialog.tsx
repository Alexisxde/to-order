"use client"
import useClickOutside from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, { createContext, useContext, useId, useMemo, useRef } from "react"
import Button, { ButtonProps } from "./button"

export type DialogContextType = {
	idDialog?: string
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

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
	const idDialog = useId()
	const contextValue = useMemo(
		() => ({ idDialog, isOpen, setIsOpen }),
		[isOpen]
	)

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

export type DialogTriggerProps = ButtonProps

export function DialogTrigger({
	children,
	className,
	...props
}: DialogTriggerProps) {
	const { idDialog, setIsOpen } = useDialog()

	return (
		<motion.div layoutId={`dialog-{${idDialog}`}>
			<Button
				className={cn("", className)}
				onClick={() => setIsOpen(true)}
				{...props}>
				{children}
			</Button>
		</motion.div>
	)
}

export type DialogContent = { children: React.ReactNode; className?: string }

export function DialogContent({ children, className }: DialogContent) {
	const { idDialog, isOpen, setIsOpen } = useDialog()
	const diaRef = useRef<HTMLDivElement>(null!)

	useClickOutside(diaRef, () => {
		if (!isOpen) setIsOpen(false)
	})

	return (
		<div className="relative">
			<AnimatePresence mode="wait">
				{isOpen && (
					<motion.div
						layoutId={`dialog-{${idDialog}`}
						ref={diaRef}
						initial={{
							opacity: 0,
							filter: "blur(4px)",
							transition: {
								type: "spring",
								stiffness: 150,
								damping: 25,
								when: "afterChildren",
								staggerChildren: 0.1
							}
						}}
						animate={{
							opacity: 1,
							filter: "blur(0px)",
							transition: {
								type: "spring",
								stiffness: 150,
								damping: 25,
								when: "beforeChildren",
								staggerChildren: 0.1
							}
						}}
						className={cn(
							"bg-muted absolute -top-4 -right-4 z-50 h-[200px] w-[400px] origin-top rounded-lg",
							className
						)}>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export interface DialogHeaderProps extends React.ComponentPropsWithRef<"div"> {}

export function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<div className={cn("flex items-center justify-between p-4", className)}>
			{children}
		</div>
	)
}

export type DialogCloseProps = ButtonProps

export function DialogClose({
	children,
	className,
	...props
}: DialogCloseProps) {
	const { setIsOpen } = useDialog()

	return (
		<Button
			variant={"ghost"}
			size={"icon"}
			className="rounded-full"
			onClick={() => setIsOpen(false)}
			{...props}>
			{children ?? <X />}
		</Button>
	)
}
