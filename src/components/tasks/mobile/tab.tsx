"use client"
import FormEditTask from "@/components/tasks/form-edit-task"
import Card from "@/components/tasks/mobile/card"
import { DragDrawer, DragDrawerContent } from "@/components/ui/drag-draw"
import { useTask } from "@/hooks/useTask"
import { CheckCheckIcon, FilePenIcon, Loader, Plus } from "lucide-react"
import { motion } from "motion/react"
import { JSX, useState } from "react"
import ModalDeleteTask from "../modal-delete-task"

interface Props {
	columns: {
		title: string
		column: "new" | "progress" | "completed"
		textColor: string
		bgColor: string
	}[]
}

const TABSICONS: Record<string, JSX.Element> = {
	new: <Plus className="text-primary size-4" />,
	progress: <Loader className="text-primary size-4" />,
	completed: <CheckCheckIcon className="text-primary size-4" />
} as const

export default function Tab({ columns }: Props) {
	const { tasks } = useTask()
	const [tab, setTab] = useState<"new" | "progress" | "completed">("new")
	const [editTaskId, setEditTaskId] = useState<string | null>(null)
	const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isOpenDragDrawer, setIsOpenDragDrawer] = useState(false)
	const tasksFilter = tasks?.filter(t => t.column === tab)

	return (
		<>
			<header className="bg-card border-border sticky top-0 z-30 mx-4 my-2 flex flex-1 items-center justify-between rounded-lg border px-4 py-2 select-none">
				{columns.map(({ title, column }) => (
					<Chip key={column} title={title} column={column} selected={tab === column} setSelected={setTab} />
				))}
			</header>
			<div className="mt-1 flex h-full flex-col gap-2 px-4 pb-4">
				{tasksFilter.length === 0 && (
					<div className="flex flex-col items-center justify-center p-4">
						<FilePenIcon className="size-16" />
						<h2 className="text-xl">No hay tareas</h2>
						<p className="text-xs text-gray-500">Crea tareas en el boton más o muevelas aquí</p>
					</div>
				)}
				{tasksFilter.map((task, i) => (
					<Card
						key={task._id}
						index={i}
						task={task}
						setEditTaskId={setEditTaskId}
						setIsOpenEdit={setIsOpenDragDrawer}
						setDeleteTaskId={setDeleteTaskId}
						setIsOpenDelete={setIsOpenModal}
					/>
				))}
			</div>
			<ModalDeleteTask idDelete={deleteTaskId} isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
			<DragDrawer isOpen={isOpenDragDrawer} setIsOpen={setIsOpenDragDrawer}>
				<DragDrawerContent className="h-fit">
					{editTaskId && <FormEditTask id={editTaskId} setIsOpen={setIsOpenDragDrawer} />}
				</DragDrawerContent>
			</DragDrawer>
		</>
	)
}

type ChipProps = {
	title: string
	column: "new" | "progress" | "completed"
	selected: boolean
	setSelected: React.Dispatch<React.SetStateAction<"new" | "progress" | "completed">>
}

const Chip = ({ title, column, selected, setSelected }: ChipProps) => {
	return (
		<button
			onClick={() => setSelected(column)}
			className={`relative flex h-9 w-full cursor-pointer items-center justify-center gap-1 rounded-md px-4 py-2 text-xs text-nowrap transition-colors duration-200 ease-in-out`}>
			<span className="z-1 flex gap-1">
				{TABSICONS[column]}
				{title}
			</span>
			{selected && (
				<motion.span
					layoutId="pill-tab"
					transition={{ type: "spring", duration: 0.3 }}
					className="bg-muted absolute inset-0 rounded-md px-2"
				/>
			)}
		</button>
	)
}
