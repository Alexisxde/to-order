"use client"
import SignOutButton from "@/components/button-sign-out"
import Button from "@/components/ui/button"
import { useProject } from "@/providers/project-provider"
import { useSidebar } from "@/providers/sidebar-provider"
import { Folder, House, LogOut } from "lucide-react"
import { motion } from "motion/react"
import { Fragment } from "react"

export default function Sidebar() {
	const { projects } = useProject()
	const { isOpen, toggleSidebar } = useSidebar()
	const navItems = [[{ name: "Inicio", href: "/app", icon: <House /> }]]

	return (
		<motion.aside
			layout
			className="bg-background border-muted sticky top-0 z-20 flex h-dvh flex-col items-center justify-between border-r p-5">
			<div className="flex w-fit flex-col items-center gap-2">
				<a
					href="/"
					className="bg-foreground mb-2 flex size-[44px] items-center justify-center rounded-md">
					<img
						src="/toorder-logo.svg"
						alt="ToOrder Logo SVG"
						className="size-6"
					/>
				</a>
				<div className="border-muted w-full rounded-full border-b" />
				<nav
					className="flex w-full flex-col gap-1"
					style={{ width: isOpen ? "100%" : "fit-content" }}>
					{navItems.map((item, index) => (
						<Fragment key={index}>
							{item.map((item, subIndex) => (
								<Button
									key={subIndex}
									variant={"ghost"}
									href={item.href}
									className={`group ${isOpen && "justify-start"}`}>
									{item.icon}
									{isOpen && item.name}
									{!isOpen && (
										<div className="bg-muted text-primary pointer-events-none absolute top-1 left-12 z-10 hidden rounded-lg px-2 py-1 text-xs font-medium shadow-xs transition-opacity duration-200 ease-in-out group-hover:block">
											{item.name}
										</div>
									)}
								</Button>
							))}
							<div className="border-muted w-full rounded-full border-b" />
						</Fragment>
					))}
				</nav>
				<div
					className="flex w-full flex-col gap-1"
					style={{ width: isOpen ? "100%" : "fit-content" }}>
					{isOpen && <span className="mb-1 text-xs">Proyectos</span>}
					{projects.map(({ _id, name }) => (
						<Button
							key={_id}
							variant={"ghost"}
							href={_id}
							className={`group ${isOpen && "justify-start"}`}>
							<Folder />
							{isOpen && name}
							{!isOpen && (
								<div className="bg-muted text-primary pointer-events-none absolute top-1 left-12 z-10 hidden rounded-lg px-2 py-1 text-xs font-medium shadow-xs transition-opacity duration-200 ease-in-out group-hover:block">
									{name}
								</div>
							)}
						</Button>
					))}
				</div>
			</div>
			<div className="flex w-full flex-col gap-2">
				<SignOutButton>
					<LogOut />
					{isOpen && "Salir"}
				</SignOutButton>
			</div>
			<Button
				variant={"ghost"}
				className="absolute top-0 right-0 bottom-0 h-full w-2 cursor-pointer rounded-none p-0 focus:outline-none"
				onClick={() => toggleSidebar()}
			/>
		</motion.aside>
	)
}
