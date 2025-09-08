"use client"
import EditorHeader from "@/components/editor-header"
import {
	MorphingDialog,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"
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
	const { name, created_at, update_at, content } = note
	const [isOpen, setIsOpen] = useState(false)

	const editor = useEditor({
		extensions: [StarterKit],
		content,
		immediatelyRender: false,
		autofocus: "end"
	})

	return (
		<MorphingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
			<MorphingDialogTrigger className="border-border bg-card flex w-full cursor-pointer items-center gap-2 rounded-lg border px-4 py-2">
				<div className="flex items-center gap-2">
					<FileText className="size-5" />
					<div className="flex flex-col items-start gap-0.5">
						<span className="text-xs">{name}</span>
						<span className="text-[9px]">
							{update_at
								? `Modificado ${month(new Date(update_at))}`
								: `Creado ${month(new Date(created_at))}`}
						</span>
					</div>
				</div>
			</MorphingDialogTrigger>
			<MorphingDialogContainer>
				<MorphingDialogContent className="h-[98dvh] w-[97dvw] rounded-3xl p-4 lg:h-[98dvh] lg:w-[98dvw]">
					<EditorHeader editor={editor} setIsOpen={setIsOpen} />
					<EditorContent className="mt-4" editor={editor} />
				</MorphingDialogContent>
			</MorphingDialogContainer>
		</MorphingDialog>
	)
}
