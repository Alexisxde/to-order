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
import useDeleteTask from "../hooks/use-delete-task"

interface TaskDialogDeleteProps {
	taskId: string | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function TaskDialogDelete({ taskId, open, onOpenChange }: TaskDialogDeleteProps) {
	const { mutate: deleteTask } = useDeleteTask()

	const handleDelete = () => {
		if (taskId) {
			deleteTask(taskId)
			onOpenChange(false)
		}
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción no se puede deshacer. Esto eliminará permanentemente la tarea.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
