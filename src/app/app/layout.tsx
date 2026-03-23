import Header from "@/components/header"
import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { FoldersProvider } from "@/context/folder-provider"
import { NotesProvider } from "@/context/note-provider"
import { createClientForServer } from "@/supabase/server"
import type { Metadata } from "next"
import { redirect } from "next/navigation"
import type { CSSProperties } from "react"

export const metadata: Metadata = { title: "Organzi" }

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const { auth } = await createClientForServer()
	const { data } = await auth.getUser()
	if (!data.user) return redirect("/")

	return (
		<FoldersProvider>
			<NotesProvider>
				<SidebarProvider defaultOpen={false} style={{ "--sidebar-width": "19rem" } as CSSProperties}>
					<AppSidebar />
					<SidebarInset>
						<Header />
						<main className="flex h-dvh w-full flex-col max-w-8xl mx-auto flex-1 p-4">
							{children}
						</main>
					</SidebarInset>
				</SidebarProvider>
			</NotesProvider>
		</FoldersProvider>
	)
}
