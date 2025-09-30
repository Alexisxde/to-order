"use client"
import EditorHeader from "@/components/folders/editor-header"
import Button from "@/components/ui/button"
import { MorphingPopover, MorphingPopoverContent, MorphingPopoverTrigger } from "@/components/ui/morphing-popover"
import { useFolder } from "@/hooks/useFolder"
import { cn } from "@/lib/utils"
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { motion } from "motion/react"
import { useId, useState } from "react"

export default function AppPage() {
	const uniqueId = useId()
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
		<div className="flex size-full items-center justify-center">
			<MorphingPopover
				className="size-full"
				transition={{ type: "spring", bounce: 0.05, duration: 0.3 }}
				open={isOpen}
				onOpenChange={setIsOpen}>
				<MorphingPopoverTrigger className="bg-card border-border size-full cursor-pointer rounded-xl border px-3">
					<div className="flex h-[200px] w-[324px] flex-col items-start px-1 py-2 lg:w-[364px]">
						<span className="text-primary text-base select-none">Nota rápida</span>
						<motion.p layoutId={`popover-label-${uniqueId}`} aria-hidden="true" className="text-input text-sm">
							Escribe tu nota aquí...
						</motion.p>
					</div>
				</MorphingPopoverTrigger>
				<MorphingPopoverContent className="bg-card border-border rounded-3xl border p-0 md:translate-y-0">
					<div className="flex h-[80dvh] w-full flex-col gap-2 p-2 md:h-[87dvh] md:w-[93dvw]">
						<EditorHeader
							isSaving={isSaving}
							editor={editor}
							setIsOpen={setIsOpen}
							handleClick={handleClick}
							name={name}
							setName={setName}
						/>
						<EditorContent editor={editor} className="mt-2 overflow-y-auto rounded-3xl p-2" />
					</div>
				</MorphingPopoverContent>
			</MorphingPopover>
		</div>
	)
}

const FormatButton = ({
	icon,
	label,
	isActive,
	onClick,
	disabled = false
}: {
	icon: React.ReactNode
	label: string
	isActive: boolean
	onClick: () => void
	disabled?: boolean
}) => (
	<Button
		variant={"ghost"}
		size={"icon"}
		disabled={disabled}
		onClick={() => onClick()}
		className={cn("rounded-full", isActive && "bg-muted dark:bg-muted/50 dark:hover:bg-muted/50")}
		aria-label={label}>
		{icon}
	</Button>
)
