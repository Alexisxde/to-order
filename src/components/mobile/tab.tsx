"use client"
import {
	DropDown,
	DropDownContainer,
	DropDownContent,
	DropDownOption,
	DropDownTrigger
} from "@/components/ui/drop-down"
import {
	Modal,
	ModalAction,
	ModalClose,
	ModalContent,
	ModalHeader,
	ModalPortal
} from "@/components/ui/modal"
import { month } from "@/lib/utils"
import { useTask } from "@/providers/task-provider"
import { Calendar, EditIcon, FilePenIcon, Trash2Icon } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import FormEditTask from "../form-edit-task"
import { DragDrawer, DragDrawerContent } from "../ui/drag-draw"

interface Props {
	columns: {
		title: string
		column: "new" | "progress" | "completed"
		textColor: string
		bgColor: string
	}[]
}

export default function Tab({ columns }: Props) {
	const { tasks, deleteTask } = useTask()
	const [tab, setTab] = useState<"new" | "progress" | "completed">("new")
	const [editTaskId, setEditTaskId] = useState<string | null>(null)
	const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [isOpenDragDrawer, setIsOpenDragDrawer] = useState(false)
	const tasksFilter = tasks?.filter(t => t.column === tab)

	const handleDelete = async (id: string) => {
		if (!id) return
		await deleteTask(id)
	}

	return (
		<>
			<div className="bg-background sticky top-0 z-30 flex flex-1 items-center justify-between px-4 py-2">
				{columns.map(({ title, column }) => (
					<Chip
						title={title}
						column={column}
						selected={tab === column}
						setSelected={setTab}
						key={column}
					/>
				))}
			</div>
			<div className="mt-1 flex h-full flex-col gap-2 px-4 pb-4">
				{tasksFilter.length === 0 && (
					<div className="flex flex-col items-center justify-center p-4">
						<FilePenIcon className="size-16" />
						<h2 className="text-xl">No hay tareas</h2>
						<p className="text-xs text-gray-500">
							Crea tareas en el boton más o muevelas aquí
						</p>
					</div>
				)}
				{tasksFilter.map((task, i) => {
					const { _id, title, description, created_at } = task
					const data_format = new Date(created_at)
					return (
						<motion.article
							key={_id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: 0.1 * i }}
							className="bg-background border-border rounded-md border p-4">
							<div className="flex items-center justify-between">
								<span className="flex items-center gap-1 text-xs text-neutral-500">
									<Calendar className="size-4" />
									<span>
										{month(data_format.getMonth())}{" "}
										{data_format.getDate() < 10
											? `0${data_format.getDate()}`
											: data_format.getDate()}
										{", "}
										{data_format.getFullYear()}
									</span>
								</span>
								<DropDown>
									<DropDownContainer>
										<DropDownTrigger />
										<DropDownContent>
											<DropDownOption
												onClick={() => {
													setEditTaskId(_id)
													setIsOpenDragDrawer(true)
												}}
												Icon={EditIcon}
												text="Editar"
											/>
											<DropDownOption
												onClick={() => {
													setDeleteTaskId(_id)
													setIsOpenModal(true)
												}}
												Icon={Trash2Icon}
												text="Eliminar"
											/>
										</DropDownContent>
									</DropDownContainer>
								</DropDown>
							</div>
							<span className="text-primary text-sm font-medium">{title}</span>
							{description && (
								<p className="mb-2 text-xs text-pretty text-neutral-500">
									{description}
								</p>
							)}
						</motion.article>
					)
				})}
			</div>
			<Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
				<ModalPortal>
					<ModalContent className="w-full max-w-xs space-y-2">
						<ModalHeader>
							<h2 className="text-2xl font-medium">¿Estás seguro?</h2>
							<ModalClose />
						</ModalHeader>
						<div className="flex flex-col gap-2">
							<p className="text-primary/70 text-sm">
								Esta acción no se puede deshacer. ¿Quieres eliminar esta tarea?
							</p>
							<div className="flex items-center justify-end gap-2">
								<ModalClose
									variant={"outline"}
									size="default"
									className="rounded-md">
									Cancelar
								</ModalClose>
								<ModalAction
									onClick={() => deleteTaskId && handleDelete(deleteTaskId)}>
									Confirmar
								</ModalAction>
							</div>
						</div>
					</ModalContent>
				</ModalPortal>
			</Modal>
			<DragDrawer isOpen={isOpenDragDrawer} setIsOpen={setIsOpenDragDrawer}>
				<DragDrawerContent className="h-fit">
					{editTaskId && (
						<FormEditTask id={editTaskId} setIsOpen={setIsOpenDragDrawer} />
					)}
				</DragDrawerContent>
			</DragDrawer>
		</>
	)
}

type ChipProps = {
	title: string
	column: "new" | "progress" | "completed"
	selected: boolean
	setSelected: React.Dispatch<
		React.SetStateAction<"new" | "progress" | "completed">
	>
}

const Chip = ({ title, column, selected, setSelected }: ChipProps) => {
	return (
		<button
			onClick={() => setSelected(column)}
			className={`${
				selected ? "text-primary" : "text-primary/80"
			} relative h-9 cursor-pointer rounded-md px-4 py-2 text-sm transition-colors duration-200 ease-in-out`}>
			<span className="relative z-10">{title}</span>
			{selected && (
				<motion.span
					layoutId="pill-tab"
					transition={{ type: "spring", duration: 0.3 }}
					className="bg-muted dark:bg-muted/50 absolute inset-0 z-0 rounded-md px-2"
				/>
			)}
		</button>
	)
}
