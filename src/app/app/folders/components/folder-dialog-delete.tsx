"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Trash2, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { useFolders } from "./hooks/use-folders"

type Props = { folderId: string; folderName: string }

export function FolderDialogDelete({ folderId, folderName }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const { deleted } = useFolders()

	const handleDelete = async () => {
		deleted({ id: folderId })
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer w-full justify-start">
					<Trash2Icon className="size-4" />
					<span>Eliminar</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md" showCloseButton={false}>
				<DialogHeader className="flex flex-col items-center text-center">
					<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
						<Trash2 className="size-6 text-red-600 dark:text-red-400" />
					</div>
					<DialogTitle className="text-xl font-semibold">Eliminar carpeta</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground mt-2">
						¿Estas seguro de que deseas eliminar la carpeta {folderName}?
						<p className="text-sm text-center text-muted-foreground">Esta carpeta se moverá a la papelera.</p>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:gap-2">
					<Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
						Cancelar
					</Button>
					<Button variant="destructive" onClick={() => handleDelete()} className="flex-1">
						Eliminar {folderName}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
