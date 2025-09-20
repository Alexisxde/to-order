import Button from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Editor, useEditorState } from "@tiptap/react"
import {
	ArrowLeft,
	Bold,
	Braces,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	List,
	ListOrdered,
	Redo2Icon,
	Save,
	Strikethrough,
	Undo2
} from "lucide-react"
import { motion } from "motion/react"
import React from "react"

interface Props {
	isSaving: boolean
	editor: Editor | null
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	name: string
	setName: React.Dispatch<React.SetStateAction<string>>
	handleClick: () => void
}

export default function HeaderNote({
	isSaving,
	name,
	setName,
	editor,
	setIsOpen,
	handleClick
}: Props) {
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

	if (!editorState) return

	return (
		<>
			<div className="mb-2 flex items-center justify-between">
				<Button
					variant={"ghost"}
					size={"icon"}
					className="rounded-full"
					onClick={() => setIsOpen(false)}>
					<ArrowLeft className="size-5" />
				</Button>
				<div className="flex flex-1 items-center justify-center">
					<input
						className="bg-transparent text-center focus:outline-none"
						value={name}
						onChange={e => setName(e.target.value)}
						style={{
							width: `${Math.max(name.length, 1)}ch`,
							minWidth: "4ch",
							maxWidth: "100%"
						}}
					/>
				</div>
				<Button
					size={"icon"}
					className="rounded-full"
					onClick={handleClick}
					disabled={isSaving}>
					<Save className="size-5" />
				</Button>
			</div>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className="bg-card border-border flex flex-wrap items-center overflow-auto rounded-2xl border p-1.5 lg:rounded-full">
				<FormatButton
					icon={<Undo2 className="size-4" />}
					label="Deshacer"
					isActive={false}
					onClick={() => editor?.chain().undo().run()}
				/>
				<FormatButton
					icon={<Redo2Icon className="size-4" />}
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
					onClick={() => editor?.chain().toggleItalic().run()}
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
					onClick={() => editor?.chain().toggleHeading({ level: 1 }).run()}
				/>
				<FormatButton
					icon={<Heading2 className="size-4" />}
					label="Heading 2"
					isActive={editorState.isHeading2}
					onClick={() => editor?.chain().toggleHeading({ level: 2 }).run()}
				/>
				<FormatButton
					icon={<Heading3 className="size-4" />}
					label="Heading 3"
					isActive={editorState.isHeading3}
					onClick={() => editor?.chain().toggleHeading({ level: 3 }).run()}
				/>
				<FormatButton
					icon={<Braces className="size-4" />}
					label="Codigo"
					isActive={editorState.isCode}
					onClick={() => editor?.chain().toggleCode().run()}
				/>
				<FormatButton
					icon={<Code className="size-4" />}
					label="Bloque de codigo"
					isActive={editorState.isBlockquote}
					onClick={() => editor?.chain().toggleBlockquote().run()}
				/>
			</motion.div>
		</>
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
		onClick={onClick}
		className={cn(
			"rounded-full",
			isActive && "bg-muted dark:bg-muted/50 dark:hover:bg-muted/50"
		)}
		aria-label={label}>
		{icon}
	</Button>
)
