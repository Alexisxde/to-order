import { useCallback, useState } from "react"

export const useRichTextEditor = ({
	value,
	onChange,
	prompt,
	editorRef
}: {
	value: string
	onChange?: (value: string) => void
	onBlur?: () => void
	prompt?: string
	editorRef: React.RefObject<HTMLDivElement | null>
}) => {
	const [activeCommands, setActiveCommands] = useState<Set<string>>(new Set())
	const [isFocused, setIsFocused] = useState(false)

	const updateActiveCommands = useCallback(() => {
		const commands = ["bold", "italic", "underline"]
		const active = new Set<string>()

		commands.forEach(command => {
			if (document.queryCommandState(command)) active.add(command)
		})
		setActiveCommands(active)
	}, [])

	const handleFormat = useCallback(
		(command: string, value?: string) => {
			if (editorRef.current) {
				editorRef.current.focus()
				document.execCommand(command, false, value)
				onChange?.(editorRef.current.innerHTML)
				updateActiveCommands()
			}
		},
		[onChange, updateActiveCommands]
	)

	const handleInput = useCallback(() => {
		if (!editorRef.current) return
		const newContent = editorRef.current.innerHTML
		if (newContent !== value) onChange?.(newContent)
		updateActiveCommands()
	}, [onChange, value, updateActiveCommands])

	const isCommandActive = (command: string): boolean =>
		activeCommands.has(command)

	return {
		activeCommands,
		isFocused,
		handleFormat,
		isCommandActive,
		updateActiveCommands,
		handleInput,
		setIsFocused
	}
}
