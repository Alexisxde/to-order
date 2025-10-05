"use client"
import EditorHeader from "@/components/folders/editor-header"
import {
	MorphingDialog,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"
import { useFolder } from "@/hooks/useFolder"
import { month } from "@/lib/utils"
import { Note } from "@/types"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { FileText } from "lucide-react"
import { useState } from "react"

interface Props {
	note: Note
	className?: string
}

export default function NoteCard({ note }: Props) {
	const { _id, name: noteName, created_at, update_at, content } = note
	const [isOpen, setIsOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [name, setName] = useState(noteName)
	const { updateNote } = useFolder()

	const handleClick = async () => {
		if (isSaving) return
		setIsSaving(true)
		await updateNote({ _id, content: editor?.getJSON() })
		setIsSaving(false)
		setIsOpen(false)
	}

	const editor = useEditor({
		extensions: [StarterKit],
		content,
		immediatelyRender: false,
		autofocus: "end"
	})

	return (
		<MorphingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
			<MorphingDialogTrigger
				initial={{ opacity: 0, y: 40, x: -20 }}
				animate={{ opacity: 1, y: 0, x: 0 }}
				className="border-border bg-card flex w-full cursor-pointer items-center gap-2 rounded-lg border px-4 py-2">
				<div className="flex items-center gap-2">
					<FileText className="size-5" />
					<div className="flex flex-col items-start gap-0.5">
						<span className="text-xs">{noteName}</span>
						<span className="text-[9px]">
							{update_at ? `Modificado ${month(new Date(update_at))}` : `Creado ${month(new Date(created_at))}`}
						</span>
					</div>
				</div>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className="relative h-[98dvh] w-[97dvw] rounded-3xl p-4 lg:h-[98dvh] lg:w-[98dvw]">
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
	)
}
