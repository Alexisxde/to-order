import Footer from "@/components/footer"
import Sidebar from "@/components/sidebar"
import { Toast, ToastProvider } from "@/components/ui/toast"
import { ProjectProvider } from "@/providers/project-provider"
import { SidebarProvider } from "@/providers/sidebar-provider"
import { createClientForServer } from "@/supabase/server"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Yalo" }

export default async function AppLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	const supabase = await createClientForServer()
	const { data } = await supabase.auth.getUser()
	if (!data.user) return redirect("/")

	return (
		<ToastProvider>
			<ProjectProvider>
				<SidebarProvider>
					<section
						id="sidebar-page"
						className="flex h-dvh w-full flex-col overflow-x-hidden">
						<Sidebar />
						<main className="max-w-8xl mx-auto w-full flex-1">{children}</main>
						<Footer />
					</section>
				</SidebarProvider>
			</ProjectProvider>
			<Toast />
		</ToastProvider>
	)
}
