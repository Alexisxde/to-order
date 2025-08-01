interface Props {
	beforeId: string
	column: string
}

export default function DropIndicator({ beforeId, column }: Props) {
	return (
		<div
			data-before={beforeId || "-1"}
			data-column={column}
			className="my-0.5 h-0.5 w-full bg-blue-400 opacity-0"
		/>
	)
}
