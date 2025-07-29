import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { createClientForServer } from "@/supabase/server"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = { title: "Reparapp - App" }

export default async function AppLayout({
	children
}: {
	children: React.ReactNode
}) {
	const supabase = await createClientForServer()
	const { data } = await supabase.auth.getUser()
	if (!data.user) return redirect("/")

	return (
		<div className="flex h-dvh">
			<Sidebar />
			<div className="flex flex-1 flex-col">
				<Header user={data.user.user_metadata} />
				<main className="flex-1 p-4">{children}</main>
			</div>
		</div>
	)
}
