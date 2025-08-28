"use client"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { useTheme } from "next-themes"
import React, { MouseEvent, useEffect, useState } from "react"

export const buttonVariants = cva(
	"relative flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-in-out [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0 cursor-pointer focus:outline-none overflow-hidden active:scale-[0.97]",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-xs hover:bg-primary/80",
				secondary:
					"text-secondary-foreground bg-secondary shadow-xs hover:bg-secondary/80",
				ghost:
					"hover:bg-muted text-secondary-foreground dark:hover:bg-muted/50",
				outline:
					"border bg-background shadow-xs border border-border ring ring-muted/25 hover:bg-muted/80 hover:text-accent-foreground",
				link: "bg-transparent underline-offset-4 hover:underline",
				destructive:
					"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md px-3 gap-1.5 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9"
			},
			rounded: {
				xs: "rounded-xs",
				sm: "rounded-sm",
				md: "rounded-md",
				lg: "rounded-lg",
				full: "rounded-full",
				none: "rounded-none"
			},
			disabled: { true: "opacity-50 cursor-not-allowed" }
		},

		defaultVariants: {
			variant: "default",
			size: "sm",
			rounded: "md",
			disabled: false
		}
	}
)

export type ButtonProps = VariantProps<typeof buttonVariants> & {
	href?: string
	rippleColor?: string
	duration?: string
} & React.ComponentPropsWithRef<"button">

export function Button({
	className,
	children,
	rippleColor,
	duration = "600ms",
	onClick,
	variant,
	size,
	disabled,
	href,
	ref,
	...props
}: ButtonProps) {
	const [buttonRipples, setButtonRipples] = useState<
		Array<{ x: number; y: number; size: number; key: number }>
	>([])
	const { theme } = useTheme()
	if (theme === "dark" && !rippleColor) rippleColor = "#fdfdfd75"
	else if (theme === "light" && !rippleColor) rippleColor = "#20212775"

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		createRipple(event)
		onClick?.(event)
	}

	const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
		const button = event.currentTarget
		const rect = button.getBoundingClientRect()
		const size = Math.max(rect.width, rect.height)
		const x = event.clientX - rect.left - size / 2
		const y = event.clientY - rect.top - size / 2

		const newRipple = { x, y, size, key: Date.now() }
		setButtonRipples(prevRipples => [...prevRipples, newRipple])
	}

	useEffect(() => {
		if (buttonRipples.length > 0) {
			const lastRipple = buttonRipples[buttonRipples.length - 1]
			const timeout = setTimeout(() => {
				setButtonRipples(prevRipples =>
					prevRipples.filter(ripple => ripple.key !== lastRipple.key)
				)
			}, parseInt(duration))
			return () => clearTimeout(timeout)
		}
	}, [buttonRipples, duration])

	if (href) {
		return (
			<a
				href={href}
				className={cn(buttonVariants({ variant, size, disabled }), className)}
				onClick={handleClick}
				{...props}>
				<div className="relative z-10 flex items-center justify-center gap-1.5">
					{children}
				</div>
				<span className="pointer-events-none absolute inset-0">
					{buttonRipples.map(ripple => (
						<span
							className="animate-rippling bg-background absolute rounded-full opacity-30"
							key={ripple.key}
							style={{
								width: `${ripple.size}px`,
								height: `${ripple.size}px`,
								top: `${ripple.y}px`,
								left: `${ripple.x}px`,
								backgroundColor: rippleColor,
								transform: `scale(0)`
							}}
						/>
					))}
				</span>
			</a>
		)
	}

	return (
		<button
			className={cn(buttonVariants({ variant, size, disabled }), className)}
			onClick={handleClick}
			ref={ref}
			{...props}>
			<div className="relative z-10 flex items-center justify-center gap-1.5">
				{children}
			</div>
			<span className="pointer-events-none absolute inset-0">
				{buttonRipples.map(ripple => (
					<span
						className="animate-rippling bg-background absolute rounded-full opacity-30"
						key={ripple.key}
						style={{
							width: `${ripple.size}px`,
							height: `${ripple.size}px`,
							top: `${ripple.y}px`,
							left: `${ripple.x}px`,
							backgroundColor: rippleColor,
							transform: `scale(0)`
						}}
					/>
				))}
			</span>
		</button>
	)
}

export default Button
