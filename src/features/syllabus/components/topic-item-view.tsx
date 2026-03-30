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
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, Edit2, MoreVertical, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import type { TopicWithSubtopics } from "../syllabus.type"

interface TopicItemViewProps {
	topic: TopicWithSubtopics
	onUpdate: (name: string) => void
	onDelete: () => void
	onAddSubtopic: () => void
	children: React.ReactNode
}

export function TopicItemView({ topic, onUpdate, onDelete, onAddSubtopic, children }: TopicItemViewProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editName, setEditName] = useState(topic.name)
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

	const allSubtopicsCompleted = topic.subtopics.length > 0 && topic.subtopics.every((s) => s.completed)
	const completedCount = topic.subtopics.filter((s) => s.completed).length
	const totalCount = topic.subtopics.length

	const handleSave = () => {
		if (editName.trim() && editName !== topic.name) {
			onUpdate(editName)
		}
		setIsEditing(false)
	}

	return (
		<>
			<Collapsible
				open={isOpen}
				onOpenChange={setIsOpen}
				className="border border-border rounded-lg overflow-hidden bg-card">
				<div
					className={cn(
						"flex items-center justify-between p-4 group cursor-pointer",
						allSubtopicsCompleted && "bg-secondary/20"
					)}
					onClick={() => !isEditing && setIsOpen(!isOpen)}>
					<div className="flex items-center gap-3 flex-1 min-w-0">
						<ChevronDown className={cn("size-4 transition-transform", isOpen ? "rotate-0" : "-rotate-90")} />
						<div className="flex flex-col flex-1 min-w-0">
							{isEditing ? (
								<div className="flex items-center gap-1 pr-2" onClick={(e) => e.stopPropagation()}>
									<Input
										value={editName}
										onChange={(e) => setEditName(e.target.value)}
										className="h-8 font-semibold"
										autoFocus
										onKeyDown={(e) => e.key === "Enter" && handleSave()}
									/>
									<Button size="icon" variant="ghost" className="size-8" onClick={handleSave}>
										<Check className="size-4 text-green-600" />
									</Button>
								</div>
							) : (
								<h3
									className={cn(
										"font-semibold truncate",
										allSubtopicsCompleted && "text-muted-foreground line-through decoration-primary decoration-2"
									)}>
									{topic.name}
								</h3>
							)}
							{totalCount > 0 && (
								<span className="text-xs text-muted-foreground">
									{completedCount} de {totalCount} subtemas
								</span>
							)}
						</div>
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
								<DropdownMenuItem onClick={() => onAddSubtopic()}>
									<Plus className="mr-2 size-4" />
									Añadir
								</DropdownMenuItem>
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

				<CollapsibleContent>
					<div className="px-10 pb-4 space-y-1">
						<div className="h-px bg-border mb-3" />
						{children}
					</div>
				</CollapsibleContent>
			</Collapsible>

			<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<AlertDialogContent size="sm">
					<AlertDialogHeader>
						<AlertDialogTitle>¿Eliminar tema?</AlertDialogTitle>
						<AlertDialogDescription>Esto eliminará permanentemente el tema y sus subtemas.</AlertDialogDescription>
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
