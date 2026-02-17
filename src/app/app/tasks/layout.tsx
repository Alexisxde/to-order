import { TasksProvider } from "@/context/task-provider"
import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = { title: "OrganZi - Tareas" }

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <TasksProvider>{children}</TasksProvider>
}
