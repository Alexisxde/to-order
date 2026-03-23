"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Task, TaskPriority, TaskStatus } from "@/module/tasks/task.type"
import { CalendarDays, Clock } from "lucide-react"
import { useMemo, useState } from "react"

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
	todo: "bg-muted-foreground",
	"in-progress": "bg-info",
	review: "bg-warning",
	done: "bg-success"
}

interface TaskCalendarProps {
	tasks: Task[]
}

// Función para parsear fecha de formato "Feb 5" a Date
function parseTaskDate(dateStr: string): Date | null {
	const months: Record<string, number> = {
		Jan: 0,
		Feb: 1,
		Mar: 2,
		Apr: 3,
		May: 4,
		Jun: 5,
		Jul: 6,
		Aug: 7,
		Sep: 8,
		Oct: 9,
		Nov: 10,
		Dec: 11
	}

	const parts = dateStr.split(" ")
	if (parts.length !== 2) return null

	const month = months[parts[0]]
	const day = parseInt(parts[1])

	if (month === undefined || isNaN(day)) return null

	const year = new Date().getFullYear()
	return new Date(year, month, day)
}

export function TaskCalendar({ tasks }: TaskCalendarProps) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

	// Agrupar tareas por fecha
	const tasksByDate = useMemo(() => {
		const map = new Map<string, Task[]>()

		tasks.forEach((task) => {
			if (task.dueDate) {
				const date = parseTaskDate(task.dueDate)
				if (date) {
					const key = date.toDateString()
					const existing = map.get(key) || []
					map.set(key, [...existing, task])
				}
			}
		})

		return map
	}, [tasks])

	// Tareas del día seleccionado
	const selectedDateTasks = useMemo(() => {
		if (!selectedDate) return []
		return tasksByDate.get(selectedDate.toDateString()) || []
	}, [selectedDate, tasksByDate])

	// Fechas con tareas para resaltar en el calendario
	const datesWithTasks = useMemo(() => {
		return Array.from(tasksByDate.keys()).map((dateStr) => new Date(dateStr))
	}, [tasksByDate])

	// Modificadores para el calendario
	const modifiers = {
		hasTasks: datesWithTasks,
		hasHighPriority: datesWithTasks.filter((date) => {
			const dayTasks = tasksByDate.get(date.toDateString()) || []
			return dayTasks.some((t) => t.priority === "high")
		})
	}

	const modifiersStyles = {
		hasTasks: {
			position: "relative" as const
		}
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Calendario */}
			<Card className="lg:col-span-2 bg-card border-border">
				<CardHeader className="pb-2">
					<CardTitle className="text-lg flex items-center gap-2">
						<CalendarDays className="h-5 w-5 text-primary" />
						Calendario de Tareas
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={setSelectedDate}
						modifiers={modifiers}
						modifiersStyles={modifiersStyles}
						className="w-full [--cell-size:3rem]"
						classNames={{
							months: "flex flex-col",
							month: "w-full",
							table: "w-full",
							head_row: "flex w-full",
							head_cell: "flex-1 text-muted-foreground font-normal text-sm",
							row: "flex w-full mt-1",
							cell: "flex-1 text-center p-0 relative",
							day: "w-full aspect-square flex items-center justify-center relative",
							day_selected: "bg-primary text-primary-foreground rounded-md",
							day_today: "bg-accent text-accent-foreground rounded-md"
						}}
						components={{
							DayButton: ({ day, modifiers: dayModifiers, ...props }) => {
								const dateKey = day.date.toDateString()
								const dayTasks = tasksByDate.get(dateKey) || []
								const hasHighPriority = dayTasks.some((t) => t.priority === "high")
								const hasMediumPriority = dayTasks.some((t) => t.priority === "medium")

								return (
									<button
										{...props}
										className={`
                      w-full h-12 flex flex-col items-center justify-center rounded-md
                      hover:bg-accent transition-colors relative
                      ${dayModifiers.selected ? "bg-primary text-primary-foreground" : ""}
                      ${dayModifiers.today && !dayModifiers.selected ? "bg-accent" : ""}
                      ${dayModifiers.outside ? "text-muted-foreground/50" : ""}
                    `}>
										<span className="text-sm">{day.date.getDate()}</span>
										{dayTasks.length > 0 && (
											<div className="flex gap-0.5 mt-0.5">
												{hasHighPriority && <span className="w-1.5 h-1.5 rounded-full bg-destructive" />}
												{hasMediumPriority && !hasHighPriority && (
													<span className="w-1.5 h-1.5 rounded-full bg-warning" />
												)}
												{!hasHighPriority && !hasMediumPriority && (
													<span className="w-1.5 h-1.5 rounded-full bg-info" />
												)}
												{dayTasks.length > 1 && (
													<span className="text-[10px] text-muted-foreground">+{dayTasks.length - 1}</span>
												)}
											</div>
										)}
									</button>
								)
							}
						}}
					/>

					{/* Leyenda */}
					<div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
						<div className="flex items-center gap-1.5">
							<span className="w-2 h-2 rounded-full bg-destructive" />
							<span>Alta prioridad</span>
						</div>
						<div className="flex items-center gap-1.5">
							<span className="w-2 h-2 rounded-full bg-warning" />
							<span>Media prioridad</span>
						</div>
						<div className="flex items-center gap-1.5">
							<span className="w-2 h-2 rounded-full bg-info" />
							<span>Baja prioridad</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Panel de tareas del día */}
			<Card className="bg-card border-border">
				<CardHeader className="pb-2">
					<CardTitle className="text-lg flex items-center gap-2">
						<Clock className="h-5 w-5 text-primary" />
						{selectedDate ? (
							<span>
								{selectedDate.toLocaleDateString("es-ES", {
									weekday: "long",
									day: "numeric",
									month: "long"
								})}
							</span>
						) : (
							"Selecciona una fecha"
						)}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px] pr-4">
						{selectedDateTasks.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
								<CalendarDays className="h-8 w-8 mb-2 opacity-50" />
								<p className="text-sm">No hay tareas para este día</p>
							</div>
						) : (
							<div className="space-y-3">
								{selectedDateTasks.map((task) => (
									<div
										key={task.id}
										className="p-3 bg-secondary/50 rounded-lg border border-border hover:border-primary/50 transition-colors">
										<div className="flex items-start gap-3">
											<div className={`w-1 h-full min-h-[40px] rounded-full ${statusColors[task.status]}`} />
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-1">
													<Badge variant="outline" className={`text-xs ${priorityColors[task.priority]}`}>
														{task.priority}
													</Badge>
													<span className="text-xs text-muted-foreground">{statusLabels[task.status]}</span>
												</div>
												<h4 className="font-medium text-sm text-foreground truncate">{task.title}</h4>
												{task.description && (
													<p className="text-xs text-muted-foreground mt-1 line-clamp-2">{task.description}</p>
												)}
												{task.assignee && (
													<div className="flex items-center gap-2 mt-2">
														<Avatar className="h-5 w-5">
															<AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
															<AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
																{task.assignee.name
																	.split(" ")
																	.map((n) => n[0])
																	.join("")}
															</AvatarFallback>
														</Avatar>
														<span className="text-xs text-muted-foreground">{task.assignee.name}</span>
													</div>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	)
}
