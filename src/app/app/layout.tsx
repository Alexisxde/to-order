import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FoldersProvider } from "@/context/folder-provider"
import { NotesProvider } from "@/context/note-provider"
import { TasksProvider } from "@/context/task-provider"
import { createClientForServer } from "@/supabase/server"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import type { CSSProperties } from "react"
import { AppBreadcrumb } from "./components/app-breadcrumb"

export const metadata: Metadata = { title: "Organzi" }

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { auth } = await createClientForServer()
	const { data } = await auth.getUser()
	if (!data.user) return redirect("/")

	return (
		<FoldersProvider>
			<NotesProvider>
				<TasksProvider>
					<SidebarProvider defaultOpen={false} style={{ "--sidebar-width": "15rem" } as CSSProperties}>
						<AppSidebar />
						<SidebarInset>
							<section className="flex h-dvh w-full flex-col">
								<AppBreadcrumb />
								<main className="max-w-8xl mx-auto w-full flex-1 p-4">{children}</main>
							</section>
						</SidebarInset>
					</SidebarProvider>
				</TasksProvider>
			</NotesProvider>
		</FoldersProvider>
	)
}
