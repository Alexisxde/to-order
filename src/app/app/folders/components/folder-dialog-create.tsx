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
import type FolderSchema from "@/module/folders/folder.schema"
import { FolderPlus } from "lucide-react"
import { useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import type { z } from "zod"
import { FolderForm } from "./folder-form"
import { useFolders } from "./hooks/use-folders"

export default function FolderCreate() {
	const [isOpen, setIsOpen] = useState(false)
	const { folderId, create } = useFolders()

	const onSubmit: SubmitHandler<z.infer<typeof FolderSchema.create>> = async ({ name }) => {
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
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => setIsOpen(true)}>
							<FolderPlus className="size-5" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Nueva carpeta</TooltipContent>
				</Tooltip>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Crear nueva carpeta</DialogTitle>
					<DialogDescription>Organiza tus notas creando una nueva carpeta.</DialogDescription>
				</DialogHeader>
				<FolderForm submitText="Crear carpeta" onSubmit={onSubmit} onCancel={onCancel} />
			</DialogContent>
		</Dialog>
	)
}
