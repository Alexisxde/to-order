"use client"
import { buttonVariants } from "@/components/ui/button"
import ArrowUpRightIcon from "@/icons/arrow-up-right"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function GetStartedButton() {
	return (
		<Link
			prefetch
			className={cn(
				buttonVariants({ variant: "outline", size: "sm" }),
				"text-primary hover:text-gray-400"
			)}
			href="/app">
			Get Started
			<ArrowUpRightIcon width={12} height={12} />
		</Link>
	)
}
