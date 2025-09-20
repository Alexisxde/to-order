"use client"
import EditorHeader from "@/components/editor-header"
import FolderCard from "@/components/mobile/folder-card"
import NoteCard from "@/components/mobile/note-card"
import Button from "@/components/ui/button"
import { DragDrawer, DragDrawerContent, DragDrawerTrigger } from "@/components/ui/drag-draw"
import Error from "@/components/ui/error"
import {
	MorphingDialog,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"
import useClickOutside from "@/hooks/useClickOutside"
import { createFolderSchema } from "@/lib/schema"
import { useFolder } from "@/providers/folder-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Columns3Icon, FileText, Folder, Plus, Rows3Icon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Fragment, useEffect, useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

export default function FoldersPage() {
	const [grid, setGrid] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const refDiv = useRef<HTMLDivElement | null>(null)
	const { history, folders, notes, getFolderId, folderId, setFolderId } = useFolder()

	useEffect(() => {
		getFolderId(folderId)
	}, [folderId])

	useEffect(() => {}, [grid])

	useClickOutside(refDiv as React.RefObject<HTMLDivElement>, () => {
		if (isOpen) setIsOpen(false)
	})

	return (
		<main className="flex h-svh w-full flex-col gap-2 p-4">
			<header className="flex items-center justify-between px-2">
				<div className="flex items-center">
					{history.map((h, i) => (
						<Fragment key={h._id}>
							<Button variant={"link"} className="text-xs" onClick={() => setFolderId(h._id)}>
								{h.name}
							</Button>
							{i < history.length - 1 && <span className="text-xs">/</span>}
						</Fragment>
					))}
				</div>
				<div className="flex items-center justify-center gap-2">
					<Button variant={"ghost"} size={"icon"} onClick={() => setGrid(false)} className={`${!grid && "bg-card"}`}>
						<Rows3Icon className="size-5" />
					</Button>
					<Button variant={"ghost"} size={"icon"} onClick={() => setGrid(true)} className={`${grid && "bg-card"}`}>
						<Columns3Icon className="size-5" />
					</Button>
				</div>
			</header>
			<section className={grid ? "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4" : "grid grid-cols-1 gap-2"}>
				{folders?.length === 0 && <div>No hay nada :c</div>}
				{folders?.map(folder => (
					<FolderCard key={folder._id} folder={folder} />
				))}
				{notes?.map(note => (
					<NoteCard key={note._id} note={note} />
				))}
			</section>
			<div className="fixed right-4 bottom-1/12 lg:bottom-4">
				<div ref={refDiv} className="relative">
					<AnimatePresence>
						{isOpen && (
							<div className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col items-center gap-2">
								<CreateFolder />
								<CreateNote />
							</div>
						)}
					</AnimatePresence>
					<Button
						onClick={() => setIsOpen(prev => !prev)}
						className={`size-12 rounded-full ${isOpen && "rotate-45"}`}
						size={"icon"}>
						<Plus className="size-6" />
					</Button>
				</div>
			</div>
		</main>
	)
}

type FormData = z.infer<typeof createFolderSchema>

export function CreateFolder() {
	const [isOpen, setIsOpen] = useState(false)
	const { folderId, createFolder } = useFolder()
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors }
	} = useForm<FormData>({ resolver: zodResolver(createFolderSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({ name }) => {
		await createFolder(folderId, {
			name: `${name.trim()[0].toUpperCase()}${name.trim().slice(1)}`
		})
		reset()
		setIsOpen(false)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10, transition: { delay: 0.05 } }}
			transition={{ delay: 0.05 }}>
			<DragDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
				<DragDrawerTrigger asChild>
					<Button variant={"secondary"} className="size-10 rounded-full" size={"icon"}>
						<Folder className="size-5" />
					</Button>
				</DragDrawerTrigger>
				<DragDrawerContent>
					<h2 className="mb-4 text-xl font-medium">Nueva Carpeta</h2>
					<form className="text-primary/75 flex flex-col gap-2 text-sm" onSubmit={handleSubmit(onSubmit)}>
						<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
							<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
								Nombre <b className="text-destructive">*</b>
							</span>
							<Folder className="size-5" />
							<input
								type="text"
								className="size-full px-3 py-1.5 focus:outline-none"
								placeholder="Añadir nombre"
								{...register("name")}
							/>
						</label>
						{errors.name && <Error message={errors.name.message} />}
						<div className="flex items-center gap-2">
							<Button type="button" variant={"ghost"} size={"lg"} className="flex-1" onClick={() => setIsOpen(false)}>
								Cancelar
							</Button>
							<Button type="submit" size={"lg"} className="flex-1" disabled={isSubmitting}>
								{isSubmitting ? "Guardando..." : "Guardar"}
							</Button>
						</div>
					</form>
				</DragDrawerContent>
			</DragDrawer>
		</motion.div>
	)
}

export function CreateNote() {
	const [name, setName] = useState("Example")
	const [isOpen, setIsOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const { createNote } = useFolder()

	const editor = useEditor({
		extensions: [StarterKit],
		content: `<h1>Agregá tus notas aquí</h1>`,
		immediatelyRender: false,
		autofocus: "end"
	})

	const handleClick = async () => {
		if (isSaving) return
		setIsSaving(true)
		await createNote({ name, content: editor?.getJSON() })
		setIsSaving(false)
		setIsOpen(false)
		editor?.commands.setContent({
			type: "doc",
			content: [
				{
					type: "heading",
					attrs: { level: 1 },
					content: [{ type: "text", text: "Agregá tu notas aquí" }]
				}
			]
		})
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10, transition: { delay: 0.1 } }}
			transition={{ delay: 0.1 }}>
			<MorphingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
				<MorphingDialogTrigger asChild>
					<Button variant={"secondary"} className="size-10 rounded-full" size={"icon"}>
						<FileText className="size-5" />
					</Button>
				</MorphingDialogTrigger>
				<MorphingDialogContainer>
					<MorphingDialogContent className="h-[98dvh] w-[97dvw] rounded-3xl p-4 lg:h-[98dvh] lg:w-[98dvw]">
						<EditorHeader
							isSaving={isSaving}
							editor={editor}
							setIsOpen={setIsOpen}
							handleClick={handleClick}
							name={name}
							setName={setName}
						/>
						<EditorContent editor={editor} className="mt-2 overflow-y-auto rounded-3xl p-2" />
					</MorphingDialogContent>
				</MorphingDialogContainer>
			</MorphingDialog>
		</motion.div>
	)
}
