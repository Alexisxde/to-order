import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Toast, ToastProvider } from "@/components/ui/toast"
import { SidebarProvider } from "@/providers/sidebar-provider"
import { TasksProvider } from "@/providers/task-provider"
import { TimeProvider } from "@/providers/time-provider"
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
			<TasksProvider>
				<TimeProvider>
					<SidebarProvider>
						<section className="flex h-dvh w-full flex-col">
							<Header user={data.user} />
							<main className="max-w-8xl mx-auto w-full flex-1">
								{children}
							</main>
							<Sidebar user={data.user} />
						</section>
					</SidebarProvider>
				</TimeProvider>
			</TasksProvider>
			<Toast />
		</ToastProvider>
	)
}
