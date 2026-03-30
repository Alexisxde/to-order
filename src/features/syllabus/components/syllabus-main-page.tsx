"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, GraduationCap, Plus } from "lucide-react"
import { useState } from "react"
import useCreateSubject from "../hooks/use-create-subject"
import useSubjects from "../hooks/use-subjects"
import type { Subject } from "../syllabus.type"
import { SubjectCard } from "./subject-card"
import SyllabusPage from "./syllabus-page"

export default function SyllabusMainPage() {
	const { data: subjects, isLoading } = useSubjects()
	const { mutate: createSubject, isPending } = useCreateSubject()

	const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null)
	const [selectedSubjectName, setSelectedSubjectName] = useState<string | null>(null)
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [newSubjectName, setNewSubjectName] = useState("")

	const handleCreateSubject = () => {
		if (!newSubjectName.trim()) return
		createSubject(newSubjectName, {
			onSuccess: () => {
				setIsCreateDialogOpen(false)
				setNewSubjectName("")
			}
		})
	}

	if (selectedSubjectId) {
		return (
			<section className="space-y-4">
				<Button
					variant="ghost"
					className="gap-2 text-muted-foreground hover:text-foreground"
					onClick={() => {
						setSelectedSubjectId(null)
						setSelectedSubjectName(null)
					}}>
					<ArrowLeft className="size-4" />
				</Button>
				<SyllabusPage subjectName={selectedSubjectName} subjectId={selectedSubjectId} />
			</section>
		)
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-medium text-foreground">Mis Asignaturas</h1>
				<Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2 shadow-sm">
					<Plus className="size-4" />
					<span className="sr-only md:not-sr-only">Nueva Asignatura</span>
				</Button>
			</div>
			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{[1, 2, 3].map((i) => (
						<Skeleton key={i} className="h-24 w-full rounded-xl" />
					))}
				</div>
			) : subjects && subjects.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{subjects.map((subject: Subject) => (
						<SubjectCard
							key={subject.id}
							subject={subject}
							onClick={() => {
								setSelectedSubjectId(subject.id)
								setSelectedSubjectName(subject.name)
							}}
						/>
					))}
				</div>
			) : (
				<Empty className="border-2 border-dashed">
					<EmptyHeader>
						<EmptyMedia>
							<GraduationCap className="size-12 text-muted-foreground/40" />
						</EmptyMedia>
						<EmptyTitle>No tienes asignaturas</EmptyTitle>
						<EmptyDescription>
							Crea tu primera asignatura para empezar a organizar tus temarios y seguir tu progreso académico.
						</EmptyDescription>
						<Button onClick={() => setIsCreateDialogOpen(true)} variant="outline" className="mt-4">
							Crear Asignatura
						</Button>
					</EmptyHeader>
				</Empty>
			)}

			<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Nueva Asignatura</DialogTitle>
						<DialogDescription>Ingresa el nombre de la asignatura que deseas añadir.</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<Field>
							<FieldLabel>Nombre</FieldLabel>
							<Input
								placeholder="Ej: Matemáticas I, Historia, etc."
								value={newSubjectName}
								onChange={(e) => setNewSubjectName(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleCreateSubject()}
							/>
						</Field>
					</div>
					<DialogFooter>
						<Button variant="ghost" onClick={() => setIsCreateDialogOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={handleCreateSubject} disabled={isPending || !newSubjectName.trim()}>
							Crear
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
