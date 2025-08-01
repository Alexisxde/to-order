import { TasksProvider } from "@/providers/tasks-provider"
import type { Metadata } from "next"

interface Props {
	children: React.ReactNode
}

export const metadata: Metadata = { title: "ToOrder - App" }

export default async function TaskLayout({ children }: Props) {
	return <TasksProvider>{children}</TasksProvider>
}
