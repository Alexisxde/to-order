"use client"
import DropIndicator from "@/components/tasks/desktop/drop-indicator"
import { month } from "@/lib/utils"
import { Task } from "@/types"
import { Calendar, Flag, Link } from "lucide-react"
import { motion } from "motion/react"
import { Badge } from "../../ui/badge"

interface Props {
	index?: number
	task: Task
	setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
	setEditTaskId: React.Dispatch<React.SetStateAction<string | null>>
	handleDragStart: (e: any, task: any) => void // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Card({ index = 1, task, setEditTaskId, setIsOpenEdit, handleDragStart }: Props) {
	const { _id, title, description, priority, url, created_at, column } = task

	return (
		<>
			<DropIndicator beforeId={_id} column={column} />
			<motion.article
				layout
				layoutId={_id}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, delay: 0.1 * index }}
				draggable
				onDragStart={e => handleDragStart(e, task)}
				onClick={() => {
					setEditTaskId(_id)
					setIsOpenEdit(true)
				}}
				className="bg-card border-border cursor-grabbing rounded-md border p-4">
				<div className="flex items-center gap-2 text-xs text-neutral-500">
					<Calendar className="size-4" />
					<span>{month(new Date(created_at))}</span>
					{priority === "low" && (
						<Badge variant={"emerald"} className="text-[10px]">
							<Flag className="size-3 fill-emerald-500 stroke-emerald-500" />
							Bajo
						</Badge>
					)}
					{priority === "medium" && (
						<Badge variant={"orange"} className="text-[10px]">
							<Flag className="size-3 fill-orange-500 stroke-orange-500" />
							Medio
						</Badge>
					)}
					{priority === "high" && (
						<Badge variant={"red"} className="text-[10px]">
							<Flag className="size-3 fill-red-500 stroke-red-500" />
							Alto
						</Badge>
					)}
				</div>
				<span className="text-primary text-md font-medium">{title}</span>
				{description && <p className="mb-2 text-xs text-pretty text-neutral-500">{description}</p>}
				{description && url && <div className="border-border my-2 border-b-1" />}
				{url && (
					<a
						href={url}
						target="_blank"
						className={`flex w-fit items-center text-xs ${description && "justify-end"} gap-1`}>
						<Link className="size-3" />
						URL
					</a>
				)}
			</motion.article>
		</>
	)
}
