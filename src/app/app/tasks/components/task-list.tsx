"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Task, TaskPriority, TaskStatus } from "@/module/tasks/task.type"
import { Calendar, MessageSquare, MoreHorizontal } from "lucide-react"

const priorityColors: Record<TaskPriority, string> = {
	low: "bg-info/20 text-info border-info/30",
	medium: "bg-warning/20 text-warning border-warning/30",
	high: "bg-destructive/20 text-destructive border-destructive/30"
}

const statusLabels: Record<TaskStatus, string> = {
	todo: "Por Hacer",
	"in-progress": "En Progreso",
	review: "En Revisión",
	done: "Completado"
}

const statusColors: Record<TaskStatus, string> = {
	todo: "text-muted-foreground",
	"in-progress": "text-info",
	review: "text-warning",
	done: "text-success"
}

interface TaskListProps {
	tasks: Task[]
	onToggleComplete?: (taskId: string) => void
	onEditTask?: (task: Task) => void
	onDeleteTask?: (taskId: string) => void
}

export function TaskList({ tasks, onToggleComplete, onEditTask, onDeleteTask }: TaskListProps) {
	return (
		<div className="bg-card border border-border rounded-xl overflow-hidden">
			<div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-4 py-3 bg-secondary/50 border-b border-border text-xs font-medium text-muted-foreground">
				<div className="w-5" />
				<div>Tarea</div>
				<div className="w-24 text-center">Estado</div>
				<div className="w-20 text-center">Prioridad</div>
				<div className="w-28 text-center">Fecha</div>
				<div className="w-10 text-center">Asignado</div>
				<div className="w-8" />
			</div>

			<div className="divide-y divide-border/50">
				{tasks.map((task) => (
					<div
						key={task._id}
						className="group grid grid-cols-[auto_1fr_auto_auto_auto_auto_auto] gap-4 px-4 py-3 items-center hover:bg-secondary/30 transition-colors">
						<Checkbox
							checked={task.column === "done"}
							onCheckedChange={() => onToggleComplete?.(task.id)}
							className="border-muted-foreground data-[state=checked]:bg-success data-[state=checked]:border-success"
						/>

						<div className="min-w-0">
							<p
								className={cn(
									"font-medium text-sm truncate",
									task.column === "done" && "line-through text-muted-foreground"
								)}>
								{task.title}
							</p>
							{task.description && <p className="text-xs text-muted-foreground truncate">{task.description}</p>}
							{task.tags && task.tags.length > 0 && (
								<div className="flex gap-1 mt-1">
									{task.tags.map((tag) => (
										<Badge key={tag.tag} variant="secondary" className="text-[10px] px-1.5 py-0">
											{tag.tag}
										</Badge>
									))}
								</div>
							)}
						</div>

						<div className="w-24 text-center">
							<span className={cn("text-xs font-medium", statusColors[task.column])}>{statusLabels[task.column]}</span>
						</div>

						<div className="w-20 flex justify-center">
							<Badge variant="outline" className={`text-[10px] ${priorityColors[task.priority]}`}>
								{task.priority}
							</Badge>
						</div>

						<div className="w-28 flex items-center justify-center gap-1 text-xs text-muted-foreground">
							{task.createdAt && (
								<>
									<Calendar className="h-3 w-3" />
									<span>{task.createdAt}</span>
								</>
							)}
						</div>
						<div className="w-8">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
										<MoreHorizontal className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => onEditTask?.(task)}>Editar</DropdownMenuItem>
									<DropdownMenuItem onClick={() => onDeleteTask?.(task.id)} className="text-destructive">
										Eliminar
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))}

				{tasks.length === 0 && (
					<div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
						No hay tareas disponibles
					</div>
				)}
			</div>
		</div>
	)
}
