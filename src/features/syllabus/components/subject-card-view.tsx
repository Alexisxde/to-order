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
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, Check, Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react"
import { useState } from "react"
import type { Subject } from "../syllabus.type"

interface SubjectCardViewProps {
	subject: Subject
	onClick: () => void
	onUpdate: (name: string) => void
	onDelete: () => void
}

export function SubjectCardView({ subject, onClick, onUpdate, onDelete }: SubjectCardViewProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editName, setEditName] = useState(subject.name)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const handleSave = () => {
		if (editName.trim() && editName !== subject.name) {
			onUpdate(editName)
		}
		setIsEditing(false)
	}

	return (
		<>
			<Card className="cursor-pointer" onClick={() => !isEditing && onClick()}>
				<CardHeader className="flex flex-row items-center justify-between p-2!">
					<div className="flex items-center gap-3 flex-1 min-w-0">
						<div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
							<BookOpen className="size-5" />
						</div>
						{isEditing ? (
							<div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
								<Input
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
									className="h-8 font-medium text-lg"
									autoFocus
									onKeyDown={(e) => e.key === "Enter" && handleSave()}
								/>
								<Button size="icon" variant="ghost" className="size-8" onClick={handleSave}>
									<Check className="size-4 text-green-600" />
								</Button>
							</div>
						) : (
							<CardTitle className="text-lg font-medium truncate">{subject.name}</CardTitle>
						)}
					</div>

					{!isEditing && (
						<div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button size="icon" variant="ghost" className="size-8">
										<MoreVertical className="size-5 text-muted-foreground" />
										<span className="sr-only">Acciones de asignatura</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-48">
									<DropdownMenuItem onClick={() => onClick()}>
										<ExternalLink className="mr-2 size-4" />
										Ver temario
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={() => setIsEditing(true)}>
										<Edit2 className="mr-2 size-4" />
										Editar nombre
									</DropdownMenuItem>
									<DropdownMenuItem
										className="text-destructive focus:text-destructive"
										onClick={() => setIsDeleteDialogOpen(true)}>
										<Trash2 className="mr-2 size-4" />
										Eliminar
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<ArrowRight className="size-5 text-muted-foreground hidden lg:block lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:translate-x-1 transition-all mr-2" />
						</div>
					)}
				</CardHeader>
			</Card>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Eliminar asignatura?</AlertDialogTitle>
						<AlertDialogDescription>
							Esto eliminará la asignatura <strong>"{subject.name}"</strong> y todo su contenido.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction variant="destructive" onClick={onDelete}>
							Eliminar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
