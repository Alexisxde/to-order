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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { createFolderSchema } from "@/lib/schema"
import { FilePlus2Icon } from "lucide-react"
import { useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import type { z } from "zod"
import { FolderForm } from "./folder-form"
import { useFolders } from "./hooks/use-folders"

export default function NoteDialogCreate() {
	const [isOpen, setIsOpen] = useState(false)
	const { folderId, create } = useFolders()

	const onSubmit: SubmitHandler<z.infer<typeof createFolderSchema>> = async ({ name }) => {
		create({ name, idRoot: folderId })
		setIsOpen(false)
	}

	const onCancel = () => {
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Tooltip>
					<TooltipTrigger asChild className="cursor-pointer">
						<Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setIsOpen(true)}>
							<FilePlus2Icon className="size-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Nueva nota</TooltipContent>
				</Tooltip>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Crear nueva nota</DialogTitle>
					<DialogDescription>Organiza tus notas creando una nueva nota.</DialogDescription>
				</DialogHeader>
				<FolderForm submitText="Crear nota" onSubmit={onSubmit} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
