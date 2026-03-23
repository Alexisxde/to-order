"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import type { ColumnDef, Task } from "../task.type"
import { TaskCard } from "./task-card"

interface KanbanColumnProps {
	column: ColumnDef
	tasks: Task[]
	onEditTask?: (task: Task) => void
	onDeleteTask?: (taskId: string) => void
}

export function KanbanColumn({ column, tasks, onEditTask, onDeleteTask }: KanbanColumnProps) {
	const { setNodeRef, isOver } = useDroppable({ id: column.id })
	const taskIds = tasks.map((t) => t._id)

	return (
		<div className="flex flex-col w-72 shrink-0">
			<div className="flex items-center justify-between mb-3 px-1">
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full shrink-0" style={{ background: column.color }} aria-hidden />
					<h2 className="text-sm font-semibold text-foreground tracking-tight">{column.title}</h2>
				</div>
				<Badge variant="secondary" className="tabular-nums font-semibold text-xs px-2">
					{tasks.length}
				</Badge>
			</div>
			<Separator className="mb-3 opacity-60" style={{ background: column.color }} />
			<ScrollArea className="flex-1 max-h-[calc(100vh-180px)]">
				<div
					ref={setNodeRef}
					className={cn(
						"flex flex-col gap-2.5 rounded-xl p-2 min-h-40 transition-colors duration-200",
						isOver ? "bg-primary/5 ring-1 ring-primary/20" : "bg-transparent"
					)}>
					<SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
						{tasks.map((task) => (
							<TaskCard key={task._id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
						))}
					</SortableContext>
					{tasks.length === 0 && !isOver && (
						<div className="flex flex-col items-center justify-center h-28 rounded-lg border border-dashed border-border text-muted-foreground text-xs gap-1.5 select-none">
							<span className="text-base opacity-30">○</span>
							<span>Suelta aquí tus tareas</span>
						</div>
					)}
				</div>
			</ScrollArea>
		</div>
	)
}
