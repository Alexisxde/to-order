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
import { Filter, LayoutGrid, List, Plus } from "lucide-react"
import { useState } from "react"
import useTask from "../hooks/use-task"
import useUpdateTask from "../hooks/use-update-task"
import type { Task, TaskStatus } from "../task.type"
import { KanbanBoard } from "./kanban-board"
import { TaskDialogCreate } from "./task-dialog-create"
import { TaskDialogDelete } from "./task-dialog-delete"
import { TaskDialogUpdate } from "./task-dialog-update"
import { TaskList } from "./task-list"

export default function TaskPage() {
	const { data: tasks } = useTask()
	const { mutate: updateTask } = useUpdateTask()

	const [searchQuery, setSearchQuery] = useState("")
	const [filterPriority, setFilterPriority] = useState<string[]>([])
	const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("todo")

	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [isDeleteOpen, setIsDeleteOpen] = useState(false)

	const [editingTask, setEditingTask] = useState<Task | null>(null)
	const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)

	const filteredTasks =
		tasks?.filter((task) => {
			const matchesSearch =
				task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
			const matchesPriority = filterPriority.length === 0 || filterPriority.includes(task.priority)
			return matchesSearch && matchesPriority
		}) ?? []

	const handleColumnChange = (taskId: string, column: TaskStatus) => {
		updateTask({ taskId, task: { column } })
	}

	const handleAddTask = (status: TaskStatus = "todo") => {
		setSelectedStatus(status)
		setIsCreateOpen(true)
	}

	const handleEditTask = (task: Task) => {
		setEditingTask(task)
		setIsUpdateOpen(true)
	}

	const handleDeleteTask = (taskId: string) => {
		setDeletingTaskId(taskId)
		setIsDeleteOpen(true)
	}

	return (
		<section className="size-full space-y-6">
			<Tabs defaultValue="board" className="w-full">
				<header className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-4">
						<TabsList>
							<TabsTrigger value="board" className="gap-2">
								<LayoutGrid className="size-4" />
								Tablero
							</TabsTrigger>
							<TabsTrigger value="list" className="gap-2">
								<List className="size-4" />
								Lista
							</TabsTrigger>
						</TabsList>
					</div>
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
						<Button className="gap-2" onClick={() => handleAddTask()}>
							<Plus className="size-4" />
						</Button>
					</div>
				</header>
				<TabsContent value="board" className="mt-0">
					<KanbanBoard
						tasks={filteredTasks}
						onColumnChange={handleColumnChange}
						onEditTask={handleEditTask}
						onDeleteTask={handleDeleteTask}
					/>
				</TabsContent>
				<TabsContent value="list" className="mt-0">
					<TaskList tasks={filteredTasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
				</TabsContent>
			</Tabs>

			<TaskDialogCreate defaultStatus={selectedStatus} open={isCreateOpen} onOpenChange={setIsCreateOpen} />

			<TaskDialogUpdate task={editingTask} open={isUpdateOpen} onOpenChange={setIsUpdateOpen} />

			<TaskDialogDelete taskId={deletingTaskId} open={isDeleteOpen} onOpenChange={setIsDeleteOpen} />
		</section>
	)
}
