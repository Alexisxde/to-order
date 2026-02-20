"use client"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "./ui/sidebar"

const routes = [
	{ path: "/app", title: "Dashboard" },
	{ path: "/app/folders", title: "Carpetas" },
	{ path: "/app/tasks", title: "Tareas" }
]

export default function Header() {
	const pathname = usePathname()
	const route = routes.find((r) => r.path === pathname)
	const title = route ? route.title : "Falta título"

	return (
		<header className="flex items-center gap-4 px-4 pt-2">
			<SidebarTrigger />
			<h1>{title}</h1>
		</header>
	)
}
