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
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check, Edit2, MoreVertical, Trash2 } from "lucide-react"
import { useState } from "react"
import type { Subtopic } from "../syllabus.type"

interface SubtopicItemViewProps {
	subtopic: Subtopic
	onToggle: (completed: boolean) => void
	onUpdate: (name: string) => void
	onDelete: () => void
}

export function SubtopicItemView({ subtopic, onToggle, onUpdate, onDelete }: SubtopicItemViewProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editName, setEditName] = useState(subtopic.name)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const handleSave = () => {
		if (editName.trim() && editName !== subtopic.name) {
			onUpdate(editName)
		}
		setIsEditing(false)
	}

	return (
		<>
			<div className="flex items-center gap-2 py-1.5 group">
				{!isEditing && <Checkbox checked={subtopic.completed} onCheckedChange={(checked) => onToggle(!!checked)} />}

				<div className="flex-1 min-w-0">
					{isEditing ? (
						<div className="flex items-center gap-1">
							<Input
								value={editName}
								onChange={(e) => setEditName(e.target.value)}
								className="h-8 text-sm"
								autoFocus
								onKeyDown={(e) => e.key === "Enter" && handleSave()}
							/>
							<Button size="icon" variant="ghost" className="size-8 shrink-0" onClick={handleSave}>
								<Check className="size-4 text-green-600" />
							</Button>
						</div>
					) : (
						<span
							className={cn(
								"text-sm truncate block font-medium",
								subtopic.completed && "text-muted-foreground line-through"
							)}>
							{subtopic.name}
						</span>
					)}
				</div>

				{!isEditing && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon" variant="ghost" className="size-8">
								<MoreVertical className="size-4 text-muted-foreground" />
								<span className="sr-only">Acciones</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setIsEditing(true)}>
								<Edit2 className="mr-2 size-4" />
								Editar
							</DropdownMenuItem>
							<DropdownMenuItem
								className="text-destructive focus:text-destructive"
								onClick={() => setIsDeleteDialogOpen(true)}>
								<Trash2 className="mr-2 size-4" />
								Eliminar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogTitle>¿Eliminar subtema?</AlertDialogTitle>
						<AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>No</AlertDialogCancel>
						<AlertDialogAction variant="destructive" onClick={onDelete}>
							Eliminar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
