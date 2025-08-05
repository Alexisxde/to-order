import Footer from "@/components/footer"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Toast, ToastProvider } from "@/components/ui/toast"
import { ProjectProvider } from "@/providers/project-provider"
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
				<section className="flex overflow-hidden">
					<Sidebar />
					<section className="flex w-full flex-col">
						<Header user={data.user.user_metadata} />
						<main className="max-w-8xl mx-auto w-full flex-1">{children}</main>
						<Footer />
					</section>
				</section>
			</ProjectProvider>
			<Toast />
		</ToastProvider>
	)
}
