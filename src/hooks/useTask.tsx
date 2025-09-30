import { TasksContext } from "@/providers/task-provider"
import { useContext } from "react"

export const useTask = () => {
	const context = useContext(TasksContext)
	if (!context) throw new Error("useTask must be used within a TasksProvider")
	return context
}
