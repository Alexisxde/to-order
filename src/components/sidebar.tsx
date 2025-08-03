"use client"
import SignOutButton from "@/components/button-sign-out"
import { cn } from "@/lib/utils"
import { House, LogOut } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { Fragment } from "react"
import { buttonVariants } from "./ui/button"

export default function Sidebar() {
	const router = useRouter()
	const navItems = [[{ name: "Inicio", href: "/app", icon: <House /> }]]

	return (
		<motion.aside
			layout
			className="bg-background border-muted sticky top-0 z-20 flex h-dvh flex-col items-center justify-between border-r p-4">
			<div className="flex w-full flex-col gap-2">
				<a
					href="/"
					className="bg-primary-foreground mb-2 flex size-[44px] items-center justify-center rounded-md">
					<img
						src="/toorder-logo.svg"
						alt="ToOrder Logo SVG"
						className="size-6"
					/>
				</a>
				<div className="border-muted w-full rounded-full border-b" />
				<nav className="flex w-full flex-col items-center gap-1">
					{navItems.map((item, index) => (
						<Fragment key={index}>
							{item.map((item, subIndex) => (
								<div className="relative">
									<a
										key={subIndex}
										href={item.href}
										className={cn(
											buttonVariants({ variant: "ghost", size: "icon" }),
											"peer"
										)}>
										{item.icon}
									</a>
									<div className="bg-muted text-primary pointer-events-none absolute top-1.5 left-10 z-10 hidden rounded-lg px-2 py-1 text-xs font-medium shadow-xs transition-opacity duration-200 ease-in-out peer-hover:block">
										{item.name}
									</div>
								</div>
							))}
						</Fragment>
					))}
				</nav>
			</div>
			<div className="relative flex w-full flex-col items-center gap-2">
				<SignOutButton className="peer">
					<LogOut />
				</SignOutButton>
				<div className="bg-muted text-primary pointer-events-none absolute top-1.5 left-10 z-10 hidden rounded-lg px-2 py-1 text-xs font-medium shadow-xs transition-opacity duration-200 ease-in-out peer-hover:block">
					Salir
				</div>
			</div>
		</motion.aside>
	)
}
