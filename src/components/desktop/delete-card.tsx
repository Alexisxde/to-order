"use client"
import { useTask } from "@/providers/task-provider"
import { FireExtinguisherIcon, TrashIcon } from "lucide-react"
import { useState } from "react"

export default function DeleteCard() {
	const { deleteTask } = useTask()
	const [active, setActive] = useState(false)

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
		const cardId = e.dataTransfer.getData("cardId")
		await deleteTask(cardId)
		setActive(false)
	}

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`sticky top-13 z-20 grid size-56 shrink-0 place-content-center rounded border text-3xl ${
				active
					? "border-red-800 bg-red-800/20 text-red-500"
					: "border-neutral-800 bg-neutral-900/20 text-neutral-500"
			}`}>
			{active ? (
				<FireExtinguisherIcon className="pointer-events-none size-11 animate-bounce" />
			) : (
				<TrashIcon className="size-11" />
			)}
		</div>
	)
}
