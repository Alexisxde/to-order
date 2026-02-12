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
import { useNotes } from "./hooks/use-notes"

type Props = { noteId: string; noteName: string }

export default function NoteDialogDelete({ noteId, noteName }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const { deleted } = useNotes()

	const handleDelete = async () => {
		deleted({ id: noteId })
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
					<DialogTitle className="text-xl font-semibold">Eliminar nota</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground mt-2">
						¿Estas seguro de que deseas eliminar la nota {noteName}?
						<p className="text-sm text-center text-muted-foreground">Esta nota se moverá a la papelera.</p>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:gap-2">
					<Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
						Cancelar
					</Button>
					<Button variant="destructive" onClick={() => handleDelete()} className="flex-1">
						Eliminar {noteName}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
