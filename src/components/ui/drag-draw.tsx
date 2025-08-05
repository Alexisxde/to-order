import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
	AnimatePresence,
	AnimationScope,
	motion,
	useAnimate,
	useDragControls,
	useMotionValue
} from "motion/react"
import React, {
	createContext,
	useCallback,
	useContext,
	useId,
	useMemo
} from "react"
import { createPortal } from "react-dom"
import useMeasure from "react-use-measure"

export type DragDrawerContextType = {
	_id: string
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DragDrawerContext = createContext<DragDrawerContextType | null>(null)

export type DragDrawerProps = {
	children: React.ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DragDrawerProvider = ({
	children,
	isOpen,
	setIsOpen
}: DragDrawerProps) => {
	const _id = useId()
	const contextValue = useMemo(() => ({ _id, isOpen, setIsOpen }), [isOpen])

	return (
		<DragDrawerContext.Provider value={contextValue}>
			{children}
		</DragDrawerContext.Provider>
	)
}

export const useDragDrawer = () => {
	const context = useContext(DragDrawerContext)
	if (!context)
		throw new Error("useDragDrawer must be used within a DragDrawerProvider")
	return context
}

export const DragDrawer = ({
	children,
	isOpen,
	setIsOpen
}: DragDrawerProps) => {
	return (
		<DragDrawerProvider isOpen={isOpen} setIsOpen={setIsOpen}>
			{children}
		</DragDrawerProvider>
	)
}

export type DragDrawerTriggerProps = {
	children: React.ReactNode
	className?: string
} & ButtonProps

export function DragDrawerTrigger({
	children,
	className,
	...props
}: DragDrawerTriggerProps) {
	const { setIsOpen } = useDragDrawer()
	const handleClick = useCallback(() => setIsOpen(true), [setIsOpen])

	return (
		<Button
			variant={"outline"}
			className={cn("", className)}
			onClick={handleClick}
			{...props}>
			{children}
		</Button>
	)
}

export type DragDrawPortal = {
	children: React.ReactNode
	className?: string
	scope: AnimationScope<any>
}

export function DragDrawerPortal({
	children,
	className,
	scope
}: DragDrawPortal) {
	const { isOpen, setIsOpen } = useDragDrawer()

	return createPortal(
		<AnimatePresence initial={false} mode="sync">
			{isOpen && (
				<motion.div
					ref={scope}
					initial={{ opacity: 0.5 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setIsOpen(false)}
					className={cn(
						"fixed inset-0 z-50 flex items-center justify-center bg-black/25",
						className
					)}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>,
		document.body
	)
}

export type DragDrawerContent = {
	children: React.ReactNode
	className?: string
}

export function DragDrawerContent({ children, className }: DragDrawerContent) {
	const { _id, setIsOpen } = useDragDrawer()
	const [scope, animate] = useAnimate()
	const [drawerRef, { height }] = useMeasure()
	const y = useMotionValue(0)
	const controls = useDragControls()

	const handleClose = async () => {
		animate(scope.current, { opacity: [1, 0] })
		const yStart = typeof y.get() === "number" ? y.get() : 0
		await animate(`#drawer${_id}`, { y: [yStart, height] })
		setIsOpen(false)
	}

	return (
		<DragDrawerPortal scope={scope}>
			<motion.div
				id={`drawer${_id}`}
				ref={drawerRef}
				onClick={e => e.stopPropagation()}
				initial={{ y: "100%" }}
				animate={{ y: "0%" }}
				exit={{ y: "100%" }}
				transition={{ ease: "easeInOut" }}
				className={cn(
					"bg-card-foreground absolute bottom-0 z-50 h-[50dvh] w-full overflow-hidden rounded-t-2xl",
					className
				)}
				style={{ y }}
				drag="y"
				dragControls={controls}
				onDragEnd={() => {
					if (y.get() >= 100) handleClose()
				}}
				dragListener={false}
				dragConstraints={{ top: 0, bottom: 0 }}
				dragElastic={{ top: 0, bottom: 0.5 }}>
				<button
					onPointerDown={e => controls.start(e)}
					className="bg-card-foreground absolute top-0 right-0 left-0 z-10 flex cursor-grab touch-none justify-center p-2 active:cursor-grabbing">
					<div className="bg-primary/80 h-1 w-12 rounded-full"></div>
				</button>
				<div className="relative z-0 h-full overflow-hidden p-4 pt-12">
					{children}
				</div>
			</motion.div>
		</DragDrawerPortal>
	)
}
