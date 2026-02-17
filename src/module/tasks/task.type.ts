export type TaskPriority = "low" | "medium" | "high"
export type TaskStatus = "todo" | "in-progress" | "review" | "done"
export type TaskTag = { tag: string; color: `#${string}` }

export type Task = {
	_id: string
	title: string
	description: string
	dueDate: string
	createAt: string
	updateAt?: string
	priority: TaskPriority
	column: TaskStatus
	tags: TaskTag[]
}

export type CreateTaskDto = Pick<Task, "title" | "description" | "priority" | "column">
