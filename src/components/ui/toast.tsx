"use client"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { AlertTriangle, CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { createContext, useContext, useMemo, useState } from "react"

export type Variant = "default" | "error" | "warning" | "success"

type ToastProps = {
	id?: number
	text: string
	description?: string
	type?: Variant
}

type Toast = Omit<ToastProps, "id" | "type">
type ToastFunction = (props: ToastProps) => void
type ToastManager = Record<Variant, ToastFunction>

export type ToastContextType = { list: ToastProps[]; toast: ToastManager }

const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [list, setList] = useState<ToastProps[]>([])

	const createToast = (type: Variant) => {
		return ({ text, description }: Toast) => {
			const id = Math.random()
			setList(prev => [...prev, { id, text, description, type }])
			setTimeout(() => {
				setList(prev => prev.filter(item => item.id !== id))
			}, 5000)
		}
	}

	const toast = {
		default: createToast("default"),
		error: createToast("error"),
		success: createToast("success"),
		warning: createToast("warning")
	}

	const contextValue = useMemo(() => ({ list, toast }), [list])

	return (
		<ToastContext.Provider value={contextValue}>
			{children}
		</ToastContext.Provider>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)
	if (!context) throw new Error("useToast must be used within a ToastProvider")
	return context
}

export const toastVariants = cva(
	"pointer-events-auto flex items-center gap-2 rounded-lg bg-indigo-500 p-2 font-medium shadow-xs z-50",
	{
		variants: {
			variant: {
				default:
					"border bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-400",
				success:
					"border bg-emerald-100 border-emerald-200 text-emerald-600 dark:bg-emerald-900 dark:border-emerald-800 dark:text-emerald-400",
				warning:
					"border bg-orange-100 border-orange-200 text-orange-600 dark:bg-orange-900 dark:border-orange-800 dark:text-orange-400",
				error:
					"border bg-red-100 border-red-200 text-red-600 dark:bg-red-900 dark:border-red-800 dark:text-red-400"
			}
		},
		defaultVariants: { variant: "default" }
	}
)

export function Toast() {
	const { list } = useToast()

	const icons = {
		default: null,
		success: <CheckCircle2Icon className="size-4" />,
		error: <XCircleIcon className="size-4" />,
		warning: <AlertTriangle className="size-4" />
	}

	return (
		<div className="pointer-events-none fixed top-2 right-2 z-50 flex w-72 flex-col-reverse gap-1">
			<AnimatePresence>
				{list.map(({ id, text, description, type }) => (
					<motion.div
						layout
						key={id}
						initial={{ y: -15, scale: 0.95 }}
						animate={{ y: 0, scale: 1 }}
						exit={{ y: 15, opacity: 0 }}
						transition={{ duration: 0.35, ease: "easeOut" }}
						className={cn(
							toastVariants({ variant: type }),
							"flex items-center gap-2"
						)}>
						{icons?.[type ?? "default"] ?? null}
						<div className="flex flex-col">
							<span className="text-sm font-semibold">{text}</span>
							{description && <p className="text-xs">{description}</p>}
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	)
}
