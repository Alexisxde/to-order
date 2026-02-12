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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Note } from "@/module/notes/note.type"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
	Bold,
	Braces,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	Link,
	List,
	ListOrdered,
	Redo,
	Save,
	Strikethrough,
	Undo
} from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { useNotes } from "./hooks/use-notes"

type Props = {
	note: Note
	children: React.ReactNode
}

export default function NoteDialogEditor({ note, children }: Props) {
	const [open, setOpen] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const [hasChanges, setHasChanges] = useState(false)
	const [name, setName] = useState(note.name)
	const { update } = useNotes()

	const editor = useEditor({
		extensions: [StarterKit],
		content: note.content || "",
		immediatelyRender: false,
		autofocus: "end",
		onUpdate: () => setHasChanges(true),
		editorProps: {
			attributes: {
				class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] px-4 py-3"
			}
		}
	})

	const editorState = useEditorState({
		editor,
		selector: (ctx) => {
			return {
				isBold: ctx.editor?.isActive("bold") ?? false,
				isLink: ctx.editor?.isActive("link") ?? false,
				canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
				isItalic: ctx.editor?.isActive("italic") ?? false,
				canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
				isStrike: ctx.editor?.isActive("strike") ?? false,
				canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
				isCode: ctx.editor?.isActive("code") ?? false,
				canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
				canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
				isParagraph: ctx.editor?.isActive("paragraph") ?? false,
				isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
				isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
				isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
				isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,
				isHeading5: ctx.editor?.isActive("heading", { level: 5 }) ?? false,
				isHeading6: ctx.editor?.isActive("heading", { level: 6 }) ?? false,
				isBulletList: ctx.editor?.isActive("bulletList") ?? false,
				isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
				isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
				isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
				canUndo: ctx.editor?.can().chain().undo().run() ?? false,
				canRedo: ctx.editor?.can().chain().redo().run() ?? false
			}
		}
	})

	useEffect(() => {
		if (open && editor) {
			editor.commands.setContent(note.content || "")
			setName(note.name)
			setHasChanges(false)
		}
	}, [open, note, editor])

	const handleOpenChange = (newOpen: boolean) => {
		if (!newOpen && hasChanges) {
			setShowAlert(true)
		} else {
			setOpen(newOpen)
		}
	}

	const handleDiscardChanges = () => {
		setHasChanges(false)
		setShowAlert(false)
		setOpen(false)
	}

	const handleSaveAndClose = () => {
		update({ id: note._id, name, content: editor?.getJSON() })
		setHasChanges(false)
		setShowAlert(false)
		setOpen(false)
	}

	if (!editorState) return null

	return (
		<>
			<Dialog open={open} onOpenChange={handleOpenChange}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="sm:max-w-[95vw] h-[95vh] flex flex-col">
					<DialogHeader>
						<DialogTitle>
							<div className="flex flex-1 items-center justify-center">
								<input
									className="bg-transparent text-center focus:outline-none"
									value={name}
									onChange={(e) => {
										setName(e.target.value)
										if (e.target.value !== note.name) {
											setHasChanges(true)
										}
									}}
									style={{
										width: `${Math.max(name.length, 1)}ch`,
										minWidth: "4ch",
										maxWidth: "100%"
									}}
								/>
							</div>
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-wrap gap-1 border-b pb-1">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().undo().run()}
							disabled={!editorState.canUndo}>
							<Undo className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().redo().run()}
							disabled={!editorState.canRedo}>
							<Redo className="size-4" />
						</Button>
						<div className="w-px bg-border mx-1" />
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="data-[active=true]:bg-muted"
							data-active={editorState.isBold}
							onClick={() => editor?.chain().focus().toggleBold().run()}>
							<Bold className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().toggleItalic().run()}
							data-active={editorState.isItalic}
							className="data-[active=true]:bg-muted">
							<Italic className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().toggleStrike().run()}
							data-active={editorState.isStrike}
							className="data-[active=true]:bg-muted">
							<Strikethrough className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().toggleHeading({ level: 1 }).run()}
							data-active={editorState.isHeading1}
							className="data-[active=true]:bg-muted">
							<Heading1 className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().toggleHeading({ level: 2 }).run()}
							data-active={editorState.isHeading2}
							className="data-[active=true]:bg-muted">
							<Heading2 className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().toggleHeading({ level: 3 }).run()}
							data-active={editorState.isHeading3}
							className="data-[active=true]:bg-muted">
							<Heading3 className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().toggleLink().run()}
							data-active={editorState.isLink}
							className="data-[active=true]:bg-muted">
							<Link className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().toggleBulletList().run()}
							data-active={editorState.isBulletList}
							className="data-[active=true]:bg-muted">
							<List className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().toggleOrderedList().run()}
							data-active={editorState.isOrderedList}
							className="data-[active=true]:bg-muted">
							<ListOrdered className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
							data-active={editorState.isCodeBlock}
							className="data-[active=true]:bg-muted">
							<Code className="size-4" />
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => editor?.chain().toggleCode().run()}
							data-active={editorState.isCode}
							className="data-[active=true]:bg-muted">
							<Braces className="size-4" />
						</Button>
					</div>

					<div className="flex-1 overflow-y-auto rounded-md">
						<EditorContent editor={editor} />
					</div>

					<DialogFooter className="flex justify-end gap-2 pt-4">
						<Button type="button" variant="outline" onClick={handleOpenChange.bind(null, false)}>
							Cancelar
						</Button>
						<Button type="button" disabled={!hasChanges} onClick={handleSaveAndClose}>
							<Save className="size-4" />
							Guardar cambios
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<AlertDialog open={showAlert} onOpenChange={setShowAlert}>
				<AlertDialogContent className="w-full">
					<AlertDialogHeader>
						<AlertDialogTitle>¿Deseas guardar los cambios?</AlertDialogTitle>
						<AlertDialogDescription>
							Tienes cambios sin guardar. Si cierras sin guardar, perderás todos los cambios realizados.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setShowAlert(false)}>Continuar editando</AlertDialogCancel>
						<AlertDialogAction variant="outline" onClick={handleDiscardChanges}>
							Descartar cambios
						</AlertDialogAction>
						<AlertDialogAction onClick={handleSaveAndClose}>Guardar y cerrar</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
