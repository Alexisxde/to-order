"use client"

import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock"
import TaskIcon from "@/icons/task"
import { useSidebar } from "@/providers/sidebar-provider"
import { Folder, House, Settings } from "lucide-react"
import { useState } from "react"
import { createPortal } from "react-dom"
import Button from "./ui/button"
import {
	DragDrawer,
	DragDrawerContent,
	DragDrawerTrigger
} from "./ui/drag-draw"

export default function Sidebar() {
	const { mode } = useSidebar()
	const [openDraw, setOpenDraw] = useState(false)
	const data = [
		{
			title: "Inicio",
			icon: <House className="text-primary size-5 lg:size-full" />,
			href: "/app"
		},
		{
			title: "Carpetas",
			icon: <Folder className="text-primary size-5 lg:size-full" />,
			href: "/folders"
		},
		{
			title: "Tareas",
			icon: <TaskIcon className="text-primary size-5 lg:size-full" />,
			href: "/tasks"
		}
	]

	if (mode === "mobile") {
		return (
			<div className="fixed right-0 bottom-0 left-0 z-50">
				<div className="bg-card-foreground flex h-24 w-full items-center justify-center gap-4 p-4">
					{data.map((item, idx) => (
						<Button
							key={idx}
							variant={"ghost"}
							className="bg-muted aspect-square h-full flex-1 rounded-3xl">
							<div className="flex flex-col items-center gap-1">
								{item.icon}
								<span className="text-xs">{item.title}</span>
							</div>
						</Button>
					))}
					<DragDrawer isOpen={openDraw} setIsOpen={setOpenDraw}>
						<DragDrawerTrigger asChild>
							<Button
								variant={"ghost"}
								className="bg-muted aspect-square h-full flex-1 rounded-3xl">
								<div className="flex flex-col items-center gap-1">
									<Settings className="size-5 lg:size-full" />
									<span className="text-xs">Opciones</span>
								</div>
							</Button>
						</DragDrawerTrigger>
						<DragDrawerContent>Test</DragDrawerContent>
					</DragDrawer>
				</div>
			</div>
		)
	}

	if (mode === "dock") {
		return createPortal(
			<div className="absolute bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
				<Dock className="items-end pb-3">
					{data.map((item, idx) => (
						<DockItem key={idx} className="bg-muted aspect-square rounded-full">
							<DockLabel>{item.title}</DockLabel>
							<DockIcon>{item.icon}</DockIcon>
						</DockItem>
					))}
					<DragDrawer isOpen={openDraw} setIsOpen={setOpenDraw}>
						<DragDrawerTrigger>
							<DockItem className="bg-muted aspect-square rounded-full">
								<DockLabel>Opciones</DockLabel>
								<DockIcon>
									<Settings className="size-5 lg:size-full" />
								</DockIcon>
							</DockItem>
						</DragDrawerTrigger>
						<DragDrawerContent>Test</DragDrawerContent>
					</DragDrawer>
				</Dock>
			</div>,
			document.body
		)
	}

	// if (mode === "sidebar") {
	// 	return (
	// 		<motion.aside
	// 			layout
	// 			className="bg-background border-muted fixed top-0 z-40 flex h-dvh flex-col items-center justify-between border-r p-4">
	// 			<div className="flex w-full flex-col gap-2">
	// 				<a
	// 					href="/"
	// 					className="bg-secondary-foreground dark:bg-primary-foreground mb-2 flex size-[44px] items-center justify-center rounded-md">
	// 					<img src="/yalo-logo.svg" alt="Yalo Logo SVG" className="size-6" />
	// 				</a>
	// 				<div className="border-muted w-full rounded-full border-b" />
	// 				<nav className="flex w-full flex-col items-center gap-1">
	// 					{navItems.map((item, index) => (
	// 						<Fragment key={index}>
	// 							{item.map((item, subIndex) => (
	// 								<div key={subIndex} className="relative">
	// 									<a
	// 										href={item.href}
	// 										className={cn(
	// 											buttonVariants({ variant: "ghost", size: "icon" }),
	// 											"peer"
	// 										)}>
	// 										{item.icon}
	// 									</a>
	// 									<div className="bg-muted text-primary pointer-events-none absolute top-1.5 left-10 z-10 hidden rounded-lg px-2 py-1 text-xs font-medium shadow-xs transition-opacity duration-200 ease-in-out peer-hover:block">
	// 										{item.name}
	// 									</div>
	// 								</div>
	// 							))}
	// 						</Fragment>
	// 					))}
	// 				</nav>
	// 			</div>
	// 			<div className="relative flex w-full flex-col items-center gap-2">
	// 				<SignOutButton className="peer">
	// 					<LogOut />
	// 				</SignOutButton>
	// 				<div className="bg-muted text-primary pointer-events-none absolute top-1.5 left-10 z-10 hidden rounded-lg px-2 py-1 text-xs font-medium shadow-xs transition-opacity duration-200 ease-in-out peer-hover:block">
	// 					Salir
	// 				</div>
	// 			</div>
	// 		</motion.aside>
	// )
	// }
}
