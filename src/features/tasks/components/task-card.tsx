"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { AlertCircle, ArrowDown, CalendarDays, Clock, MoreVertical, Pencil, Trash } from "lucide-react"
import type { Task } from "../task.type"

const priorityConfig = {
	high: {
		icon: AlertCircle,
		label: "High",
		className: "bg-destructive/15 text-destructive border-destructive/25"
	},
	medium: {
		icon: Clock,
		label: "Medium",
		className: "bg-warning/15 text-warning border-warning/25"
	},
	low: {
		icon: ArrowDown,
		label: "Low",
		className: "bg-muted text-muted-foreground border-border"
	}
}

interface TaskCardProps {
	task: Task
	isDragging?: boolean
	onEdit?: (task: Task) => void
	onDelete?: (taskId: string) => void
}

export function TaskCard({ task, isDragging = false, onEdit, onDelete }: TaskCardProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } = useSortable({
		id: task._id
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	const priority = priorityConfig[task.priority]
	const PriorityIcon = priority.icon

	const formattedDate = task.createdAt
		? new Date(task.createdAt).toLocaleDateString("es-ES", { month: "short", day: "numeric" })
		: null

	return (
		<TooltipProvider delayDuration={400}>
			<Card
				ref={setNodeRef}
				style={style}
				className={cn(
					"group relative cursor-grab active:cursor-grabbing select-none transition-all duration-200",
					isSortableDragging ? "opacity-40 scale-95" : "hover:border-muted-foreground/40",
					isDragging && "shadow-2xl shadow-black/60 opacity-100 scale-[1.02]"
				)}>
				<CardContent className="px-4 space-y-2.5">
					<div className="flex items-center justify-between">
						<h3	{...attributes} {...listeners}
							className="text-sm font-semibold text-foreground leading-snug flex-1 text-pretty">
							{task.title}
						</h3>
						<div className="flex items-center gap-1">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="size-7">
										<MoreVertical className="h-3.5 w-3.5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => onEdit?.(task)}>
										<Pencil className="mr-2 h-4 w-4" />
										Editar
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => onDelete?.(task._id)} className="text-destructive">
										<Trash className="mr-2 h-4 w-4" />
										Eliminar
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>

					{task.description && (
						<p
							{...attributes}
							{...listeners}
							className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
							{task.description}
						</p>
					)}

					<div {...attributes} {...listeners} className="flex items-center justify-between pt-0.5">
						<Badge
							variant="outline"
							className={cn("gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full", priority.className)}>
							<PriorityIcon className="h-2.5 w-2.5" />
							{priority.label}
						</Badge>

						{formattedDate && (
							<span className="flex items-center gap-1 text-[10px] text-muted-foreground">
								<CalendarDays className="h-3 w-3" />
								{formattedDate}
							</span>
						)}
					</div>
				</CardContent>
			</Card>
		</TooltipProvider>
	)
}

export function TaskCardOverlay({ task }: { task: Task }) {
	return <TaskCard task={task} isDragging />
}
