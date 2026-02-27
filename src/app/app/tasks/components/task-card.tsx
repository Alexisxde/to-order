"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { month } from "@/lib/utils"
import type { Task, TaskPriority } from "@/module/tasks/task.type"
import { Calendar, MoreHorizontal } from "lucide-react"
import type React from "react"

const priorityConfig: Record<TaskPriority, { classes: string; label: string }> = {
	low: { classes: "bg-info/20 text-info border-info/30", label: "Baja" },
	medium: { classes: "bg-warning/20 text-warning border-warning/30", label: "Media" },
	high: { classes: "bg-destructive/20 text-destructive border-destructive/30", label: "Alta" }
}

interface TaskCardProps {
	task: Task
	onEdit?: (task: Task) => void
	onDelete?: (taskId: string) => void
	isDragging?: boolean
	onDragStart?: (e: React.DragEvent, task: Task) => void
	onDragEnd?: (e: React.DragEvent) => void
}

export function TaskCard({ task, onEdit, onDelete, isDragging, onDragStart, onDragEnd }: TaskCardProps) {
	return (
		<div
			draggable
			onDragStart={(e) => onDragStart?.(e, task)}
			onDragEnd={onDragEnd}
			className={`bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing ${isDragging ? "opacity-50 scale-95 rotate-2 border-primary shadow-lg" : ""}`}>
			<div className="flex items-start justify-between gap-2">
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-2">
						<Badge variant="outline" className={`text-xs ${priorityConfig[task.priority].classes}`}>
							{priorityConfig[task.priority].label}
						</Badge>
						{task.tags?.map((tag) => (
							<Badge key={tag.tag} variant="outline" style={{ backgroundColor: tag.color }}>
								{tag.tag}
							</Badge>
						))}
					</div>
					<h3 className="font-medium text-foreground text-sm leading-tight mb-1 truncate">{task.title}</h3>
					{task.description && <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{task.description}</p>}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="size-7">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onEdit?.(task)}>Editar</DropdownMenuItem>
						<DropdownMenuItem onClick={() => onDelete?.(task._id)} className="text-destructive">
							Eliminar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
				<div />
				<div className="flex items-center gap-1 text-xs text-muted-foreground">
					<Calendar className="size-3" />
					<span>{month(new Date(task.createdAt))}</span>
				</div>
			</div>
		</div>
	)
}
