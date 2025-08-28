"use client"
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock"
import { useSidebar } from "@/providers/sidebar-provider"
import { User } from "@supabase/supabase-js"
import {
	CalendarDays,
	Folder,
	House,
	LaptopMinimal,
	LogOut,
	Moon,
	PackageCheck,
	Settings,
	Sun
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import SignOutButton from "./button-sign-out"
import Button from "./ui/button"
import {
	DragDrawer,
	DragDrawerContent,
	DragDrawerTrigger
} from "./ui/drag-draw"

interface Props {
	user: User
}

export default function Sidebar({ user }: Props) {
	const { theme, setTheme } = useTheme()
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
			href: "/app/folders"
		},
		{
			title: "Tareas",
			icon: <PackageCheck className="text-primary size-5 lg:size-full" />,
			href: "/app/tasks"
		},
		{
			title: "Horarios",
			icon: <CalendarDays className="text-primary size-5 lg:size-full" />,
			href: "/app/time"
		}
	]

	return mode === "mobile" ? (
		<div className="sticky bottom-0">
			<div className="bg-card flex h-24 w-full items-center justify-center gap-4 p-4">
				{data.map((item, idx) => (
					<Button
						key={idx}
						href={item.href}
						variant={"ghost"}
						className="bg-muted aspect-square h-full flex-1 rounded-3xl">
						<div className="flex flex-col items-center gap-1">
							{item.icon}
							<span className="text-[10px]">{item.title}</span>
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
								<span className="text-[10px]">Opciones</span>
							</div>
						</Button>
					</DragDrawerTrigger>
					<DragDrawerContent className="flex h-fit w-full flex-col">
						<div className="mb-2 flex w-full flex-col gap-2">
							<span className="text-primary/50 text-[10px]">Temas</span>
							<div className="border-border flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2">
								<Button
									variant={"ghost"}
									className={theme === "dark" ? "bg-border" : ""}
									onClick={() => setTheme("dark")}>
									<Moon className="size-4" />
									<span>Dark</span>
								</Button>
								<Button
									variant={"ghost"}
									className={theme === "light" ? "bg-border" : ""}
									onClick={() => setTheme("light")}>
									<Sun className="size-4" />
									<span>Light</span>
								</Button>
								<Button
									variant={"ghost"}
									className={theme === "system" ? "bg-border" : ""}
									onClick={() => setTheme("system")}>
									<LaptopMinimal className="size-4" />
									<span>System</span>
								</Button>
							</div>
						</div>
						<div className="flex w-full flex-col gap-2">
							<span className="text-primary/50 text-[10px]">
								Tu perfil de{" "}
								<span className="capitalize">{user.app_metadata.provider}</span>
							</span>
							<div className="border-border flex flex-col gap-2 rounded-lg border px-3 py-2">
								<div className="inline-flex items-center gap-2">
									<img
										src={user.user_metadata.avatar_url}
										alt={`Profile image ${user.user_metadata.preferred_username}`}
										className="size-10 rounded-full"
									/>
									<span className="text-xs">
										{user.user_metadata.preferred_username}
									</span>
								</div>
								<SignOutButton className="w-full" variant={"default"}>
									<LogOut className="size-4" />
									<span>Salir</span>
								</SignOutButton>
							</div>
						</div>
						<a href="/" className="mt-2 flex items-center justify-center gap-1">
							<img
								src="/yalo-logo.svg"
								alt="Yalo Logo SVG"
								className="size-6"
							/>
							<span className="text-xs">Yalo Notes</span>
						</a>
					</DragDrawerContent>
				</DragDrawer>
			</div>
		</div>
	) : (
		<div className="fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
			<Dock className="items-end pb-3">
				{data.map((item, idx) => (
					<DockItem key={idx} className="bg-muted aspect-square rounded-full">
						<DockLabel>{item.title}</DockLabel>
						<DockIcon>{item.icon}</DockIcon>
					</DockItem>
				))}
			</Dock>
		</div>
	)
}
