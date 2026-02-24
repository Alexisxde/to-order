"use client"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const breadcrumbNameMap: { [key: string]: string } = {
	app: "App",
	times: "Horarios",
	calendar: "Calendario",
	tasks: "Tareas",
	folders: "Carpetas"
}

export function AppBreadcrumb() {
	const pathname = usePathname()
	const segments = pathname.split("/").filter(Boolean)

	return (
		<header className="bg-card text-card-foreground rounded-xl border shadow-sm p-2 px-4 flex items-center gap-2 mt-2 mx-4">
			<SidebarTrigger />
			<Breadcrumb>
				<BreadcrumbList>
					{segments.length === 1 && segments[0] === "app" ? (
						<BreadcrumbItem>
							<BreadcrumbPage>Dashboard</BreadcrumbPage>
						</BreadcrumbItem>
					) : (
						segments.map((segment, index) => {
							const href = `/${segments.slice(0, index + 1).join("/")}`
							const isLast = index === segments.length - 1
							const displayName = breadcrumbNameMap[segment] || segment

							return (
								<React.Fragment key={href}>
									{index > 0 && <BreadcrumbSeparator />}
									<BreadcrumbItem>
										{isLast ? (
											<BreadcrumbPage>{displayName}</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link href={href}>
													{displayName}
												</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
								</React.Fragment>
							)
						})
					)}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	)
}