"use client"
import Button from "@/components/ui/button"
import XMarkIcon from "@/icons/x-mark"
import { cn } from "@/lib/utils"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState
} from "react"

export type SidebarContextType = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	uniqueId: string
	triggerRef: React.RefObject<HTMLButtonElement | null>
}

const SidebarContext = createContext<SidebarContextType | null>(null)

function useSidebar() {
	const context = useContext(SidebarContext)
	if (!context) {
		throw new Error(
			"useMorphingDialog must be used within a MorphingDialogProvider"
		)
	}
	return context
}

export type SidebarProviderProps = { children: React.ReactNode }

function SidebarProvider({ children }: SidebarProviderProps) {
	const [isOpen, setIsOpen] = useState(false)
	const uniqueId = useId()
	const triggerRef = useRef<HTMLButtonElement>(null!)

	const contextValue = useMemo(
		() => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
		[isOpen, uniqueId]
	)

	return (
		<SidebarContext.Provider value={contextValue}>
			<MotionConfig>{children}</MotionConfig>
		</SidebarContext.Provider>
	)
}

export type SidebarProps = { children: React.ReactNode }

function Sidebar({ children }: SidebarProps) {
	return (
		<SidebarProvider>
			<MotionConfig>{children}</MotionConfig>
		</SidebarProvider>
	)
}

export type SidebarTriggerProps = {
	children: React.ReactNode
	className?: string
	triggerRef?: React.RefObject<HTMLButtonElement>
}

function SidebarTrigger({
	children,
	className,
	triggerRef
}: SidebarTriggerProps) {
	const { setIsOpen, isOpen } = useSidebar()

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen)
	}, [isOpen, setIsOpen])

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault()
				setIsOpen(!isOpen)
			}
		},
		[isOpen, setIsOpen]
	)

	return (
		<motion.button
			ref={triggerRef}
			className={cn("relative cursor-pointer", className)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
			{children}
		</motion.button>
	)
}

export type SidebarContentProps = {
	children: React.ReactNode
	className?: string
}

function SidebarContent({ children, className }: SidebarContentProps) {
	const { setIsOpen, isOpen, uniqueId, triggerRef } = useSidebar()
	const containerRef = useRef<HTMLDivElement>(null!)
	const [firstFocusableElement, setFirstFocusableElement] =
		useState<HTMLElement | null>(null)
	const [lastFocusableElement, setLastFocusableElement] =
		useState<HTMLElement | null>(null)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false)
			}
			if (event.key === "Tab") {
				if (!firstFocusableElement || !lastFocusableElement) return

				if (event.shiftKey) {
					if (document.activeElement === firstFocusableElement) {
						event.preventDefault()
						lastFocusableElement.focus()
					}
				} else {
					if (document.activeElement === lastFocusableElement) {
						event.preventDefault()
						firstFocusableElement.focus()
					}
				}
			}
		}

		document.addEventListener("keydown", handleKeyDown)

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [setIsOpen, firstFocusableElement, lastFocusableElement])

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")
			const focusableElements = containerRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
			if (focusableElements && focusableElements.length > 0) {
				setFirstFocusableElement(focusableElements[0] as HTMLElement)
				setLastFocusableElement(
					focusableElements[focusableElements.length - 1] as HTMLElement
				)
				;(focusableElements[0] as HTMLElement).focus()
			}
		} else {
			document.body.classList.remove("overflow-hidden")
			triggerRef.current?.focus()
		}
	}, [isOpen, triggerRef])

	return (
		<motion.div
			ref={containerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn("overflow-hidden", className)}>
			{children}
		</motion.div>
	)
}

export type SidebarContainerProps = {
	children: React.ReactNode
	className?: string
}

function SidebarContainer({ children, className }: SidebarContainerProps) {
	const ref = useRef<HTMLDivElement | null>(null)
	const { isOpen, setIsOpen } = useSidebar()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [setIsOpen])

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	if (!mounted) return null

	return (
		<AnimatePresence mode="wait">
			{isOpen ? (
				<motion.section
					ref={ref}
					initial={{ width: 0, opacity: 0 }}
					animate={{ width: 300, opacity: 1 }}
					exit={{ width: 0, opacity: 0 }}
					transition={{ duration: 0.2 }}
					className={cn(
						"bg-foreground border-muted m-4 ml-0 overflow-x-hidden rounded-2xl border-2 p-4",
						className
					)}>
					<div className="mb-4 flex w-full items-center justify-between">
						<h1 className="text-2xl font-medium">Nuevo evento</h1>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsOpen(prev => !prev)}
							className="text-white">
							<XMarkIcon width={20} height={20} />
						</Button>
					</div>
					{children}
				</motion.section>
			) : null}
		</AnimatePresence>
	)
}

export { Sidebar, SidebarContainer, SidebarContent, SidebarTrigger, useSidebar }
