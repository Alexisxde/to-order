"use client"
import Button from "@/components/ui/button"
import { FloatingDockDesktop } from "@/components/ui/floating-dock"
import { useIsMobile } from "@/hooks/useIsMobile"
import type { User } from "@supabase/supabase-js"
import { Folder, House, PackageCheck } from "lucide-react"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"

interface Props {
	user: User
}

export default function Sidebar({ user }: Props) {
	const pathname = usePathname()
	const isMobile = useIsMobile()
	const nav = [
		{
			title: "Inicio",
			icon: <House className="text-primary size-6 lg:size-full" />,
			href: "/app"
		},
		{
			title: "Carpetas",
			icon: <Folder className="text-primary size-6 lg:size-full" />,
			href: "/app/folders"
		},
		{
			title: "Tareas",
			icon: <PackageCheck className="text-primary size-6 lg:size-full" />,
			href: "/app/tasks"
		}
		// {
		// 	title: "Horarios",
		// 	icon: <CalendarDays className="text-primary size-6 lg:size-full" />,
		// 	href: "/app/time"
		// }
	]

	return isMobile ? (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 15 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			className="sticky bottom-2 flex items-center justify-center">
			<div className="bg-card border-border flex items-center justify-center gap-2 rounded-full border px-4 py-2">
				{nav.map((item, idx) => (
					<Button
						key={idx}
						href={pathname !== item.href ? item.href : ""}
						variant={"ghost"}
						className={`bg-muted h-10 rounded-full ${pathname !== item.href && "size-10"}`}>
						<div className="flex items-center gap-1">
							{item.icon}
							{pathname === item.href && <span className="text-xs">{item.title}</span>}
						</div>
					</Button>
				))}
			</div>
		</motion.div>
	) : (
		<div className="fixed bottom-2 left-1/2 z-50 max-w-full -translate-x-1/2">
			<FloatingDockDesktop items={nav} />
		</div>
	)
}
