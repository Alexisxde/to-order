import { cn } from "@/lib/utils"
import { type ComponentPropsWithRef, useId } from "react"

interface InputProps extends ComponentPropsWithRef<"input"> {
	labelDisabled?: boolean
}

export const Input = ({
	children,
	className,
	ref,
	labelDisabled = false,
	...rest
}: InputProps) => {
	const Id = useId()

	return (
		<div className="relative">
			<input
				ref={ref}
				id={Id}
				className={cn(
					"border-muted ring-muted/25 hover:border-muted/80 peer focus:border-muted block w-full rounded-lg border bg-transparent py-2 pr-4 pl-3 ring transition-colors duration-200 ease-in-out focus:outline-none",
					className
				)}
				placeholder=" "
				{...rest}
			/>
			{!labelDisabled && (
				<label
					htmlFor={Id}
					className="peer-focus:bg-background pointer-events-none absolute -top-2.5 left-2.5 p-1 text-sm text-[10px] text-neutral-400 transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:-top-3 peer-focus:p-1 peer-focus:text-[10px] peer-focus:text-neutral-400">
					{children}
				</label>
			)}
		</div>
	)
}

export const Textarea = ({
	children,
	className,
	ref,
	...rest
}: ComponentPropsWithRef<"textarea">) => {
	const Id = useId()

	return (
		<div className="relative">
			<textarea
				ref={ref}
				id={Id}
				className={cn(
					"peer border-muted hover:border-muted focus:border-muted block w-full resize-none rounded-lg border py-2 pr-4 pl-3 transition-colors duration-200 ease-in-out focus:outline-none",
					className
				)}
				placeholder=" "
				{...rest}
			/>
			<label
				htmlFor={Id}
				className="peer-focus:bg-background pointer-events-none absolute -top-2.5 left-2.5 p-1 text-sm text-[10px] text-neutral-400 transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-400 peer-focus:-top-3 peer-focus:p-1 peer-focus:text-[10px] peer-focus:text-neutral-400">
				{children}
			</label>
		</div>
	)
}
