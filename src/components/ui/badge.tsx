import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

export const badgeVariants = cva(
	"transition-all duration-300 ease-in-out pointer-events-none flex items-center justify-center gap-x-1 font-medium capitalize",
	{
		variants: {
			variant: {
				neutral:
					"bg-neutral-50 text-neutral-600 ring-1 ring-neutral-600/10 ring-inset dark:bg-neutral-400/10 dark:text-neutral-400 dark:ring-neutral-400/30",
				red: "bg-red-50 text-red-600 ring-1 ring-red-600/10 ring-inset dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30",
				blue: "bg-blue-50 text-blue-600 ring-1 ring-blue-600/10 ring-inset dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
				green:
					"bg-green-50 text-green-600 ring-1 ring-green-600/10 ring-inset dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30",
				yellow:
					"bg-yellow-50 text-yellow-600 ring-1 ring-yellow-600/10 ring-inset dark:bg-yellow-400/10 dark:text-yellow-400 dark:ring-yellow-400/30",
				pink: "bg-pink-50 text-pink-600 ring-1 ring-pink-600/10 ring-inset dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/30",
				orange:
					"bg-orange-50 text-orange-600 ring-1 ring-orange-600/10 ring-inset dark:bg-orange-400/10 dark:text-orange-400 dark:ring-orange-400/30",
				cyan: "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-600/10 ring-inset dark:bg-cyan-400/10 dark:text-cyan-400 dark:ring-cyan-400/30",
				fuchsia:
					"bg-fuchsia-50 text-fuchsia-600 ring-1 ring-fuchsia-600/10 ring-inset dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:ring-fuchsia-400/30",
				purple:
					"bg-purple-50 text-purple-600 ring-1 ring-purple-600/10 ring-inset dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30",
				sky: "bg-sky-50 text-sky-600 ring-1 ring-sky-600/10 ring-inset dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/30",
				amber:
					"bg-amber-50 text-amber-600 ring-1 ring-amber-600/10 ring-inset dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30",
				lime: "bg-lime-50 text-lime-600 ring-1 ring-lime-600/10 ring-inset dark:bg-lime-400/10 dark:text-lime-400 dark:ring-lime-400/30",
				emerald:
					"bg-emerald-50 text-emerald-600 ring-1 ring-emerald-600/10 ring-inset dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/30",
				teal: "bg-teal-50 text-teal-600 ring-1 ring-teal-600/10 ring-inset dark:bg-teal-400/10 dark:text-teal-400 dark:ring-teal-400/30",
				violet:
					"bg-violet-50 text-violet-600 ring-1 ring-violet-600/10 ring-inset dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
				rose: "bg-rose-50 text-rose-600 ring-1 ring-rose-600/10 ring-inset dark:bg-rose-400/10 dark:text-rose-400 dark:ring-rose-400/30",
				zinc: "bg-zinc-50 text-zinc-600 ring-1 ring-zinc-600/10 ring-inset dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/30",
				stone:
					"bg-stone-50 text-stone-600 ring-1 ring-stone-600/10 ring-inset dark:bg-stone-400/10 dark:text-stone-400 dark:ring-stone-400/30",
				gray: "bg-gray-50 text-gray-600 ring-1 ring-gray-600/10 ring-inset dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/30",
				indigo:
					"bg-indigo-50 text-indigo-600 ring-1 ring-indigo-600/10 ring-inset dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-indigo-400/30",
				slate:
					"bg-slate-50 text-slate-600 ring-1 ring-slate-600/10 ring-inset dark:bg-slate-400/10 dark:text-slate-400 dark:ring-slate-400/30"
			},
			size: {
				xs: "px-2 py-1 text-xs rounded-md",
				sm: "px-3 py-1.5 text-xs rounded-md",
				md: "px-4 py-2 text-sm rounded-lg",
				lg: "px-5 py-2.5 text-sm rounded-lg"
			},
			disabled: { true: "cursor-not-allowed opacity-50" }
		},
		defaultVariants: { variant: "neutral", size: "xs", disabled: false }
	}
)

export interface BadgeProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
		VariantProps<typeof badgeVariants> {}

export const Badge = ({
	className,
	children,
	variant,
	size,
	disabled,
	...rest
}: BadgeProps) => {
	const Tag = rest.href ? "a" : "span"

	return (
		<Tag
			target={rest.href ? "_blank" : undefined}
			className={cn(badgeVariants({ variant, size, disabled }), className)}
			{...rest}>
			{children}
		</Tag>
	)
}
