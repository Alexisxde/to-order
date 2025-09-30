"use client"
import { BrickWallFire, TrashIcon } from "lucide-react"
import { useState } from "react"
import ModalDeleteTask from "../modal-delete-task"

export default function DeleteCard() {
	const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)
	const [isOpenModal, setIsOpenModal] = useState(false)
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
		setDeleteTaskId(cardId)
		setIsOpenModal(true)
		setActive(false)
	}

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`sticky top-0 z-10 grid size-56 shrink-0 place-content-center rounded border text-3xl ${
				active ? "border-red-800 bg-red-800/20 text-red-500" : "border-border bg-card text-gray"
			}`}>
			{active ? (
				<BrickWallFire className="pointer-events-none size-11 animate-bounce" />
			) : (
				<TrashIcon className="size-11" />
			)}
			<ModalDeleteTask idDelete={deleteTaskId} isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
		</div>
	)
}
