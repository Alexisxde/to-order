import TaskPage from "@/features/tasks/components/task-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Organzi - Tareas",
	description: "Gestiona y organiza tus tareas con el tablero Kanban de Organzi.",
	robots: {
		index: false,
		follow: false
	}
}

export default function Page() {
	return <TaskPage />
}
