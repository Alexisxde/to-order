import { Badge } from "@/components/ui/badge"
import {
	DropDown,
	DropDownContainer,
	DropDownContent,
	DropDownOption,
	DropDownTrigger
} from "@/components/ui/drop-down"
import { month } from "@/lib/utils"
import type { Task } from "@/types"
import { Calendar, EditIcon, Flag, Link, Trash2Icon } from "lucide-react"
import { motion } from "motion/react"
import React from "react"

interface Props {
	index?: number
	task: Task
	setIsOpenEdit: React.Dispatch<React.SetStateAction<boolean>>
	setEditTaskId: React.Dispatch<React.SetStateAction<string | null>>
	setDeleteTaskId: React.Dispatch<React.SetStateAction<string | null>>
	setIsOpenDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Card({
	task,
	index = 1,
	setIsOpenDelete,
	setIsOpenEdit,
	setEditTaskId,
	setDeleteTaskId
}: Props) {
	const { _id, title, description, url, priority, created_at } = task

	return (
		<motion.article
			key={_id}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.1 * index }}
			className="bg-card border-border rounded-md border p-4">
			<div className="flex items-center justify-between">
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
				<DropDown>
					<DropDownContainer>
						<DropDownTrigger />
						<DropDownContent>
							<DropDownOption
								onClick={() => {
									setEditTaskId(_id)
									setIsOpenEdit(true)
								}}
								Icon={EditIcon}
								text="Editar"
							/>
							<DropDownOption
								onClick={() => {
									setDeleteTaskId(_id)
									setIsOpenDelete(true)
								}}
								Icon={Trash2Icon}
								text="Eliminar"
							/>
						</DropDownContent>
					</DropDownContainer>
				</DropDown>
			</div>
			<span className="text-primary text-md font-medium">{title}</span>
			{description && (
				<p className="mb-2 text-xs text-pretty text-neutral-500">
					{description}
				</p>
			)}
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
	)
}
