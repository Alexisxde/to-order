"use client"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import type { z } from "zod"
import useDeleteTime from "../hooks/use-delete-time"
import useUpdateTime from "../hooks/use-update-time"
import { timeCreateSchema } from "../schemas/time.schema"
import type { Time } from "../time.type"
import { TimeForm } from "./time-form"

interface TimeSheetUpdateProps {
	time: Time | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function TimeSheetUpdate({ time, open, onOpenChange }: TimeSheetUpdateProps) {
	const { mutate: update } = useUpdateTime()
	const { mutate: deleteTime } = useDeleteTime()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	if (!time) return null

	const onSubmit: SubmitHandler<z.infer<typeof timeCreateSchema>> = (data) => {
		update({ timeId: time._id, time: data })
		onOpenChange(false)
	}

	const handleDelete = () => {
		deleteTime(time._id)
		setIsDeleteDialogOpen(false)
		onOpenChange(false)
	}

	return (
		<>
			<Sheet open={open} onOpenChange={onOpenChange}>
				<SheetContent className="sm:max-w-md overflow-y-auto">
					<SheetHeader>
						<SheetTitle>Editar Horario</SheetTitle>
						<SheetDescription>Actualiza el horario de {time.subject}.</SheetDescription>
					</SheetHeader>
					<TimeForm
						submitText="Guardar cambios"
						onSubmit={onSubmit}
						onCancel={() => onOpenChange(false)}
						onDelete={() => setIsDeleteDialogOpen(true)}
						defaultValues={{
							subject: time.subject,
							description: time.description,
							day: time.day,
							color: time.color,
							url: time.url,
							type: time.type,
							time_start: time.time_start,
							time_end: time.time_end
						}}
					/>
				</SheetContent>
			</Sheet>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta acción no se puede deshacer. Esto eliminará permanentemente la materia de tu horario.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel className="font-semibold">Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold">
							Eliminar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
