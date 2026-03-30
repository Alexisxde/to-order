"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

const routes = [
	{ path: "/app", title: ["Dashboard"] },
	{ path: "/app/folders", title: ["Carpetas"] },
	{ path: "/app/tasks", title: ["Tareas"] },
	{ path: "/app/times", title: ["Horarios"] },
	{ path: "/app/syllabus", title: ["Temarios"] }
]

export default function Header() {
	const pathname = usePathname()
	const route = routes.find((r) => r.path === pathname)
	const breadcrumbs = route ? route.title : ["Falta título"]

	return (
		<header className="bg-sidebar ring-1 ring-sidebar-border rounded-xl shadow-sm p-2 px-4 flex items-center gap-4 mt-2 mx-2">
			<SidebarTrigger />
			<Breadcrumb>
				<BreadcrumbList>
					{breadcrumbs.map((title, idx) => (
						<Fragment key={`${title}-${idx}`}>
							<BreadcrumbItem>{title}</BreadcrumbItem>
							{idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	)
}
