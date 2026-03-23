"use client"

import {
	closestCorners,
	DndContext,
	DragOverlay,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	type DragOverEvent,
	type DragStartEvent
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useCallback, useEffect, useState } from "react"
import type { ColumnDef, Task, TaskStatus } from "../task.type"
import { KanbanColumn } from "./kanban-column"
import { TaskCardOverlay } from "./task-card"

interface KanbanBoardProps {
	tasks: Task[]
	onColumnChange: (taskId: string, column: TaskStatus) => void
	onEditTask?: (task: Task) => void
	onDeleteTask?: (taskId: string) => void
}

const COLUMN_DEFS: ColumnDef[] = [
	{ id: "todo", title: "To Do", color: "#3b82f6" },
	{ id: "in-progress", title: "In Progress", color: "#f59e0b" },
	{ id: "review", title: "In Review", color: "#8b5cf6" },
	{ id: "done", title: "Done", color: "#10b981" }
]

export function KanbanBoard({ tasks, onColumnChange, onEditTask, onDeleteTask }: KanbanBoardProps) {
	const [localTasks, setLocalTasks] = useState<Task[]>(tasks)
	const [activeTask, setActiveTask] = useState<Task | null>(null)

	useEffect(() => {
		setLocalTasks(tasks)
	}, [tasks])

	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

	const findColumnOfTask = useCallback(
		(taskId: string): TaskStatus | undefined => localTasks.find((t) => t._id === taskId)?.column,
		[localTasks]
	)

	const handleDragStart = useCallback(
		({ active }: DragStartEvent) => {
			setActiveTask(localTasks.find((t) => t._id === active.id) ?? null)
		},
		[localTasks]
	)

	const handleDragOver = useCallback(
		({ active, over }: DragOverEvent) => {
			if (!over) return
			const activeId = active.id as string
			const overId = over.id as string

			const fromCol = findColumnOfTask(activeId)
			const toCol = (COLUMN_DEFS.find((c) => c.id === overId)?.id ?? findColumnOfTask(overId)) as TaskStatus | undefined

			if (!fromCol || !toCol) return

			if (fromCol === toCol) {
				setLocalTasks((prev) => {
					const oldIndex = prev.findIndex((t) => t._id === activeId)
					const newIndex = prev.findIndex((t) => t._id === overId)
					if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
						return arrayMove(prev, oldIndex, newIndex)
					}
					return prev
				})
				return
			}

			setLocalTasks((prev) => {
				const task = prev.find((t) => t._id === activeId)!
				const updated = prev.filter((t) => t._id !== activeId)
				const overIdx = updated.findIndex((t) => t._id === overId)
				const insertAt = overIdx >= 0 ? overIdx : updated.length
				const withMoved = [...updated]
				withMoved.splice(insertAt, 0, { ...task, column: toCol })
				return withMoved
			})
		},
		[findColumnOfTask]
	)

	const handleDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			const draggedTask = activeTask
			setActiveTask(null)

			if (!over || !draggedTask) return

			const activeId = active.id as string
			const overId = over.id as string

			const fromCol = draggedTask.column
			const toColId = (COLUMN_DEFS.find((c) => c.id === overId)?.id ?? findColumnOfTask(overId)) as
				| TaskStatus
				| undefined

			if (!toColId) return

			if (fromCol !== toColId) {
				onColumnChange(activeId, toColId)
				return
			}

			const colTasks = localTasks.filter((t) => t.column === fromCol)
			const oldIdx = colTasks.findIndex((t) => t._id === activeId)
			const newIdx = colTasks.findIndex((t) => t._id === overId)

			if (oldIdx !== -1 && newIdx !== -1 && oldIdx !== newIdx) {
				const reordered = arrayMove(colTasks, oldIdx, newIdx)
				setLocalTasks((prev) => {
					const rest = prev.filter((t) => t.column !== fromCol)
					return [...rest, ...reordered]
				})
			}
		},
		[activeTask, localTasks, findColumnOfTask, onColumnChange]
	)

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}>
			<div className="flex gap-5 pb-6 overflow-x-auto">
				{COLUMN_DEFS.map((col) => (
					<KanbanColumn
						key={col.id}
						column={col}
						tasks={localTasks.filter((t) => t.column === col.id)}
						onEditTask={onEditTask}
						onDeleteTask={onDeleteTask}
					/>
				))}
			</div>

			<DragOverlay dropAnimation={{ duration: 180, easing: "ease" }}>
				{activeTask ? <TaskCardOverlay task={activeTask} /> : null}
			</DragOverlay>
		</DndContext>
	)
}
