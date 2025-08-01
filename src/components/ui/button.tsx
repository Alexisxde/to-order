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
					"text-inverse bg-primary ring ring-primary/25 hover:bg-primary/80",
				secondary:
					"bg-secondary border border-secondary-foreground ring ring-secondary/25 hover:bg-secondary/80",
				outline:
					"bg-transparent border border-muted ring ring-muted/25 hover:bg-muted/80",
				ghost:
					"bg-transparent hover:ring hover:ring-muted/25 hover:bg-muted/80",
				link: "bg-transparent underline-offset-4 hover:underline",
				success:
					"bg-success border border-success-foreground ring ring-success/25 hover:bg-success/80",
				destructive:
					"bg-destructive border border-destructive-foreground ring ring-destructive/25 hover:bg-destructive/80"
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
