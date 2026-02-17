"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Task, TaskStatus } from "@/module/tasks/task.type"
import { Plus } from "lucide-react"
import { useState } from "react"
import { TaskCard } from "./task-card"

const statusConfig: Record<TaskStatus, { label: string; dotColor: string }> = {
	todo: { label: "Por Hacer", dotColor: "bg-muted-foreground" },
	"in-progress": { label: "En Progreso", dotColor: "bg-info" },
	review: { label: "En Revisión", dotColor: "bg-warning" },
	done: { label: "Completado", dotColor: "bg-success" }
}

interface KanbanColumnProps {
	status: TaskStatus
	tasks: Task[]
	onAddTask?: (status: TaskStatus) => void
	onEditTask?: (task: Task) => void
	onDeleteTask?: (taskId: string) => void
	onDragStart?: (e: React.DragEvent, task: Task) => void
	onDragEnd?: (e: React.DragEvent) => void
	onDrop?: (e: React.DragEvent, status: TaskStatus) => void
	draggingTaskId?: string | null
}

export function KanbanColumn({
	status,
	tasks,
	onAddTask,
	onEditTask,
	onDeleteTask,
	onDragStart,
	onDragEnd,
	onDrop,
	draggingTaskId
}: KanbanColumnProps) {
	const config = statusConfig[status]
	const [isDragOver, setIsDragOver] = useState(false)

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(true)
	}

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)
		onDrop?.(e, status)
	}

	return (
		<div
			className={cn(
				"flex flex-col w-1/4 bg-secondary/30 rounded-xl transition-all duration-200 h-full",
				isDragOver && "bg-primary/10 ring-2 ring-primary/50 ring-inset"
			)}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}>
			<div className="flex items-center justify-between p-4 border-b border-border/50">
				<div className="flex items-center gap-2">
					<div className={cn("size-2 rounded-full", config.dotColor)} />
					<h3 className="font-semibold text-foreground text-sm">{config.label}</h3>
					<span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{tasks.length}</span>
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="h-7 w-7 text-muted-foreground hover:text-foreground"
					onClick={() => onAddTask?.(status)}>
					<Plus className="h-4 w-4" />
				</Button>
			</div>

			<div
				className={cn(
					"flex flex-col gap-3 p-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)] transition-all",
					isDragOver && "bg-primary/5"
				)}>
				{tasks.map((task) => (
					<TaskCard
						key={task._id}
						task={task}
						onEdit={onEditTask}
						onDelete={onDeleteTask}
						onDragStart={onDragStart}
						onDragEnd={onDragEnd}
						isDragging={draggingTaskId === task._id}
					/>
				))}
				{tasks.length === 0 && (
					<div
						className={cn(
							"flex items-center justify-center py-8 text-sm border-2 border-dashed rounded-lg transition-all",
							isDragOver ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground"
						)}>
						{isDragOver ? "Soltar aquí" : "Sin tareas"}
					</div>
				)}
			</div>
		</div>
	)
}
