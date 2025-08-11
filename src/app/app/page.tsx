"use client"
import Button from "@/components/ui/button"
import {
	MorphingPopover,
	MorphingPopoverContent,
	MorphingPopoverTrigger
} from "@/components/ui/morphing-popover"
import { useRichTextEditor } from "@/hooks/useRichTextEditor"
import { cn } from "@/lib/utils"
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	Italic,
	List,
	ListOrdered,
	Redo2,
	Underline,
	Undo2,
	X
} from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useId, useRef, useState } from "react"

export default function AppPage() {
	const uniqueId = useId()
	const editorRef = useRef<HTMLDivElement | null>(null)
	const [form, setForm] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	const { handleFormat, isCommandActive, updateActiveCommands, handleInput } =
		useRichTextEditor({ value: form, onChange: setForm, editorRef })

	useEffect(() => {
		if (isOpen && editorRef.current) {
			editorRef.current.innerHTML = form || ""
			const range = document.createRange()
			range.selectNodeContents(editorRef.current)
			range.collapse(false)

			const selection = window.getSelection()
			selection?.removeAllRanges()
			selection?.addRange(range)

			editorRef.current.focus()
		}
	}, [isOpen])

	return (
		<div className="flex size-full items-center justify-center">
			<MorphingPopover
				className="size-full"
				transition={{ type: "spring", bounce: 0.05, duration: 0.3 }}
				open={isOpen}
				onOpenChange={setIsOpen}>
				<MorphingPopoverTrigger className="bg-card-foreground border-border size-full cursor-pointer rounded-xl border px-3">
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
				<MorphingPopoverContent className="bg-card-foreground border-border rounded-3xl border p-0 md:translate-y-0">
					<div className="flex h-[80dvh] w-full flex-col gap-2 p-2 md:h-[87dvh] md:w-[93dvw]">
						<div className="bg-accent border-border flex items-center justify-between rounded-3xl border p-1.5 lg:rounded-full">
							<motion.div
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								className="flex flex-wrap items-center overflow-auto">
								<FormatButton
									command="undo"
									icon={<Undo2 className="size-4" />}
									label="Deshacer"
									isActive={false}
									onClick={handleFormat}
								/>
								<FormatButton
									command="redo"
									icon={<Redo2 className="size-4" />}
									label="Rehacer"
									isActive={false}
									onClick={handleFormat}
								/>
								<FormatButton
									command="bold"
									icon={<Bold className="size-4" />}
									label="Negrita"
									isActive={isCommandActive("bold")}
									onClick={handleFormat}
								/>
								<FormatButton
									command="italic"
									icon={<Italic className="size-4" />}
									label="Itálica"
									isActive={isCommandActive("italic")}
									onClick={handleFormat}
								/>
								<FormatButton
									command="underline"
									icon={<Underline className="size-4" />}
									label="Subrayado"
									isActive={isCommandActive("underline")}
									onClick={handleFormat}
								/>
								<FormatButton
									command="justifyLeft"
									icon={<AlignLeft className="size-4" />}
									label="Alinear izquierda"
									isActive={false}
									onClick={handleFormat}
								/>
								<FormatButton
									command="justifyCenter"
									icon={<AlignCenter className="size-4" />}
									label="Centrar"
									isActive={false}
									onClick={handleFormat}
								/>
								<FormatButton
									command="justifyRight"
									icon={<AlignRight className="size-4" />}
									label="Alinear derecha"
									isActive={false}
									onClick={handleFormat}
								/>
								<FormatButton
									command="insertUnorderedList"
									icon={<List className="size-4" />}
									label="Lista desordenada"
									isActive={false}
									onClick={handleFormat}
								/>
								<FormatButton
									command="insertOrderedList"
									icon={<ListOrdered className="size-4" />}
									label="Lista ordenada"
									isActive={false}
									onClick={handleFormat}
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
							ref={editorRef}
							contentEditable
							onInput={handleInput}
							onMouseUp={updateActiveCommands}
							onKeyUp={updateActiveCommands}
							onFocus={() => updateActiveCommands()}
							className={cn(
								"prose prose-sm custom-scrollbar size-full max-w-none rounded-3xl p-2 text-sm focus:outline-none",
								"[&_ol]:ml-6 [&_ol]:list-decimal [&_ul]:ml-6 [&_ul]:list-disc",
								"[&_li]:marker:text-foreground overflow-y-auto"
							)}
							style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
							suppressContentEditableWarning={true}
						/>
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
	command,
	icon,
	label,
	isActive,
	onClick
}: {
	command: string
	icon: React.ReactNode
	label: string
	isActive: boolean
	onClick: (command: string) => void
}) => (
	<Button
		variant={"ghost"}
		size={"icon"}
		onClick={() => onClick(command)}
		className={cn(
			"rounded-full",
			isActive && "bg-muted dark:bg-muted/50 dark:hover:bg-muted/50"
		)}
		aria-label={label}>
		{icon}
	</Button>
)
