"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import type { createFolderSchema } from "@/lib/schema"
import type { Folder } from "@/module/folders/folder.type"
import { EditIcon } from "lucide-react"
import { useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import type { z } from "zod"
import { FolderForm } from "./folder-form"
import { useFolders } from "./hooks/use-folders"

type Props = { folder: Folder }

export default function FolderDialogUpdate({ folder }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const { update } = useFolders()
	const { _id: id } = folder

	const handleSubmit: SubmitHandler<z.infer<typeof createFolderSchema>> = async ({ name }) => {
		update({ id, name })
		setIsOpen(false)
	}

	const onCancel = () => {
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer w-full justify-start">
					<EditIcon className="size-4" />
					<span>Cambiar nombre</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Editar carpeta</DialogTitle>
					<DialogDescription>Modifica el nombre de la carpeta.</DialogDescription>
				</DialogHeader>
				<FolderForm folder={folder} submitText="Editar carpeta" onSubmit={handleSubmit} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
