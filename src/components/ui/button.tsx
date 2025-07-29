"use client"
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import React, { forwardRef } from "react"

export const buttonVariants = cva(
	"relative text-primary inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 ease-in-out [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0 cursor-pointer focus:outline-none",
	{
		variants: {
			variant: {
				default:
					"text-inverse bg-primary shadow-[inset_0_-4px_8px_rgba(76,76,76,0.8)] drop-shadow-xs drop-shadow-primary/25 ring ring-primary/25 hover:bg-primary/80",
				secondary:
					"bg-secondary border border-secondary-foreground shadow-[inset_0_-4px_8px_rgba(21,21,21,0.8)] drop-shadow-xs drop-shadow-secondary/25 ring ring-secondary/25 hover:bg-secondary/80",
				outline:
					"bg-transparent border border-muted shadow-[inset_0_-4px_8px_rgba(27,27,27,0.8)] drop-shadow-xs drop-shadow-muted/25 ring ring-muted/25 hover:bg-muted/80",
				ghost:
					"bg-transparent hover:shadow-[inset_0_-4px_8px_rgba(27,27,27,0.8)] hover:ring hover:ring-muted/25 hover:bg-muted/80",
				link: "bg-transparent underline-offset-4 hover:underline",
				success:
					"bg-success border border-success-foreground shadow-[inset_0_-4px_8px_rgba(3,75,55,0.8)] drop-shadow-xs drop-shadow-success/25 ring ring-success/25 hover:bg-success/80",
				destructive:
					"bg-destructive border border-destructive-foreground shadow-[inset_0_-4px_8px_rgba(147,0,6,0.8)] drop-shadow-xs drop-shadow-destructive/25 ring ring-destructive/25 hover:bg-destructive/80"
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-sm px-3 gap-1.5 has-[>svg]:px-2.5",
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

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
		VariantProps<typeof buttonVariants> {
	href?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, children, onClick, variant, size, disabled, href, ...rest },
		ref
	) => {
		return (
			<>
				{href ? (
					<a
						href={href}
						className={cn(
							buttonVariants({ variant, size, disabled }),
							className
						)}>
						{children}
					</a>
				) : (
					<button
						ref={ref}
						className={cn(
							buttonVariants({ variant, size, disabled }),
							className
						)}
						onClick={onClick}
						{...rest}>
						{children}
					</button>
				)}
			</>
		)
	}
)

export default Button
