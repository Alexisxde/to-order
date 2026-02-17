"use client"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Task, TaskStatus } from "@/module/tasks/task.type"
import { Filter, LayoutGrid, List } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { KanbanColumn } from "./kanban-column"
import { TaskList } from "./task-list"

const initialTasks: Task[] = [
	{
		_id: "1",
		title: "Diseñar sistema de autenticación",
		description: "Implementar login con OAuth y 2FA",
		priority: "high",
		dueDate: "2026-01-26",
		column: "in-progress",
		createAt: "",
		tags: [
			{
				tag: "Frontend",
				color: "#34FF98"
			},
			{
				tag: "UX/UI",
				color: "#FF3456"
			}
		]
	}
]

const statuses: TaskStatus[] = ["todo", "in-progress", "review", "done"]

export function KanbanBoard() {
	const [tasks, setTasks] = useState<Task[]>(initialTasks)
	const [searchQuery, setSearchQuery] = useState("")
	const [filterPriority, setFilterPriority] = useState<string[]>([])
	const [draggingTask, setDraggingTask] = useState<Task | null>(null)

	const filteredTasks = tasks.filter((task) => {
		const matchesSearch =
			task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			task.description?.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesPriority = filterPriority.length === 0 || filterPriority.includes(task.priority)
		return matchesSearch && matchesPriority
	})

	const getTasksByStatus = (status: TaskStatus) => filteredTasks.filter((task) => task.column === status)

	const handleToggleComplete = (taskId: string) => {
		setTasks((prev) =>
			prev.map((task) => {
				if (task._id === taskId) {
					return {
						...task,
						status: task.column === "done" ? "todo" : "done"
					}
				}
				return task
			})
		)
	}

	const handleDeleteTask = (taskId: string) => {
		setTasks((prev) => prev.filter((task) => task._id !== taskId))
	}

	const handleDragStart = (e: React.DragEvent, task: Task) => {
		setDraggingTask(task)
		e.dataTransfer.effectAllowed = "move"
		e.dataTransfer.setData("text/plain", task._id)
	}

	const handleDragEnd = () => {
		setDraggingTask(null)
	}

	const handleDrop = (e: React.DragEvent, newStatus: TaskStatus) => {
		e.preventDefault()
		const taskId = e.dataTransfer.getData("text/plain")

		if (taskId && draggingTask) {
			setTasks((prev) =>
				prev.map((task) => {
					if (task._id === taskId) {
						return { ...task, status: newStatus }
					}
					return task
				})
			)
		}
		setDraggingTask(null)
	}

	return (
		<section className="h-full w-full space-y-6 p-6">
			<Tabs defaultValue="board" className="w-full">
				<header className="flex items-center justify-between sticky top-0 z-50 mb-2">
					<TabsList>
						<TabsTrigger value="board" className="gap-2">
							<LayoutGrid className="size-4" />
							Tablero
						</TabsTrigger>
						<TabsTrigger value="list" className="gap-2">
							<List className="size-4" />
							Lista
						</TabsTrigger>
						{/* <TabsTrigger value="calendar" className="gap-2">
							<CalendarDays className="size-4" />
							Calendario
						</TabsTrigger> */}
					</TabsList>
					<div className="flex items-center gap-3">
						<Input
							placeholder="Buscar tareas..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="flex-1 max-w-xs pl-9 bg-secondary/50"
						/>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="gap-2 bg-transparent">
									<Filter className="h-4 w-4" />
									{filterPriority.length > 0 && (
										<span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
											{filterPriority.length}
										</span>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuLabel>Prioridad</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem
									checked={filterPriority.includes("high")}
									onCheckedChange={(checked) => {
										setFilterPriority((prev) => (checked ? [...prev, "high"] : prev.filter((p) => p !== "high")))
									}}>
									Alta
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={filterPriority.includes("medium")}
									onCheckedChange={(checked) => {
										setFilterPriority((prev) => (checked ? [...prev, "medium"] : prev.filter((p) => p !== "medium")))
									}}>
									Media
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem
									checked={filterPriority.includes("low")}
									onCheckedChange={(checked) => {
										setFilterPriority((prev) => (checked ? [...prev, "low"] : prev.filter((p) => p !== "low")))
									}}>
									Baja
								</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<TabsContent value="board" className="mt-0">
					<div className="flex gap-4 overflow-x-auto pb-4">
						{statuses.map((status) => (
							<KanbanColumn
								key={status}
								status={status}
								tasks={getTasksByStatus(status)}
								onDeleteTask={handleDeleteTask}
								onDragStart={handleDragStart}
								onDragEnd={handleDragEnd}
								onDrop={handleDrop}
								draggingTaskId={draggingTask?._id}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="list" className="mt-0">
					<TaskList tasks={filteredTasks} onToggleComplete={handleToggleComplete} onDeleteTask={handleDeleteTask} />
				</TabsContent>

				{/* <TabsContent value="calendar" className="mt-0">
						<TaskCalendar tasks={filteredTasks} />
					</TabsContent> */}
			</Tabs>
		</section>
	)
}
