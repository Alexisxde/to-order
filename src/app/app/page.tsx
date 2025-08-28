"use client"
import Button from "@/components/ui/button"
import {
	MorphingPopover,
	MorphingPopoverContent,
	MorphingPopoverTrigger
} from "@/components/ui/morphing-popover"
import { cn } from "@/lib/utils"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import {
	Bold,
	Braces,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	List,
	ListOrdered,
	Redo2,
	Strikethrough,
	Undo2,
	X
} from "lucide-react"
import { motion } from "motion/react"
import { useId, useState } from "react"

const extensions = [StarterKit]

export default function AppPage() {
	const uniqueId = useId()
	const [isOpen, setIsOpen] = useState(false)
	const editor = useEditor({
		extensions,
		content: `<h1>Hi there!</h1>`,

		immediatelyRender: false,
		autofocus: "end"
	})

	const editorState = useEditorState({
		editor,
		selector: ctx => {
			return {
				isBold: ctx.editor?.isActive("bold") ?? false,
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

	if (!editorState) return null

	return (
		<div className="flex size-full items-center justify-center">
			<MorphingPopover
				className="size-full"
				transition={{ type: "spring", bounce: 0.05, duration: 0.3 }}
				open={isOpen}
				onOpenChange={setIsOpen}>
				<MorphingPopoverTrigger className="bg-card border-border size-full cursor-pointer rounded-xl border px-3">
					<div className="flex h-[200px] w-[324px] flex-col items-start px-1 py-2 lg:w-[364px]">
						<span className="text-primary text-base select-none">
							Nota rápida
						</span>
						<motion.p
							layoutId={`popover-label-${uniqueId}`}
							aria-hidden="true"
							className="text-input text-sm">
							Escribe tu nota aquí...
						</motion.p>
					</div>
				</MorphingPopoverTrigger>
				<MorphingPopoverContent className="bg-card border-border rounded-3xl border p-0 md:translate-y-0">
					<div className="flex h-[80dvh] w-full flex-col gap-2 p-2 md:h-[87dvh] md:w-[93dvw]">
						<div className="bg-accent border-border flex items-center justify-between rounded-3xl border p-1.5 lg:rounded-full">
							<motion.div
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								className="flex flex-wrap items-center overflow-auto">
								<FormatButton
									icon={<Undo2 className="size-4" />}
									label="Deshacer"
									isActive={false}
									onClick={() => editor?.chain().undo().run()}
								/>
								<FormatButton
									icon={<Redo2 className="size-4" />}
									label="Rehacer"
									isActive={false}
									onClick={() => editor?.chain().redo().run()}
								/>
								<FormatButton
									icon={<Bold className="size-4" />}
									label="Negrita"
									isActive={editorState.isBold}
									onClick={() => editor?.chain().toggleBold().run()}
								/>
								<FormatButton
									icon={<Italic className="size-4" />}
									label="Itálica"
									isActive={editorState.isItalic}
									onClick={() => editor?.chain().toggleBold().run()}
								/>
								<FormatButton
									icon={<Strikethrough className="size-4" />}
									label="Tachado"
									isActive={editorState.isStrike}
									onClick={() => editor?.chain().toggleStrike().run()}
								/>
								<FormatButton
									icon={<List className="size-4" />}
									label="Lista desordenada"
									isActive={false}
									onClick={() => editor?.chain().toggleBulletList().run()}
								/>
								<FormatButton
									icon={<ListOrdered className="size-4" />}
									label="Lista ordenada"
									isActive={false}
									onClick={() => editor?.chain().toggleOrderedList().run()}
								/>
								<FormatButton
									icon={<Heading1 className="size-4" />}
									label="Heading 1"
									isActive={editorState.isHeading1}
									onClick={() =>
										editor?.chain().toggleHeading({ level: 1 }).run()
									}
								/>
								<FormatButton
									icon={<Heading2 className="size-4" />}
									label="Heading 2"
									isActive={editorState.isHeading2}
									onClick={() =>
										editor?.chain().toggleHeading({ level: 2 }).run()
									}
								/>
								<FormatButton
									icon={<Heading3 className="size-4" />}
									label="Heading 3"
									isActive={editorState.isHeading3}
									onClick={() =>
										editor?.chain().toggleHeading({ level: 3 }).run()
									}
								/>
								<FormatButton
									icon={<Braces className="size-4" />}
									label="Codigo"
									isActive={false}
									onClick={() => editor?.chain().toggleCode().run()}
								/>
								<FormatButton
									icon={<Code className="size-4" />}
									label="Bloque de codigo"
									isActive={false}
									onClick={() => editor?.chain().toggleBlockquote().run()}
								/>
							</motion.div>
							<Button
								variant={"secondary"}
								size={"icon"}
								className="rounded-full"
								onClick={() => setIsOpen(false)}>
								<X className="size-5" />
							</Button>
						</div>
						<div
							className="h-full w-full overflow-y-auto rounded-3xl p-2 text-sm"
							onClick={() => editor?.chain().focus()}>
							<EditorContent editor={editor} />
						</div>
						<div className="text-muted-foreground flex items-center justify-end px-4 py-2">
							<Button>Guardar</Button>
						</div>
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
		className={cn(
			"rounded-full",
			isActive && "bg-muted dark:bg-muted/50 dark:hover:bg-muted/50"
		)}
		aria-label={label}>
		{icon}
	</Button>
)
