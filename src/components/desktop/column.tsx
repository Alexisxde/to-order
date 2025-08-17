"use client"
import Card from "@/components/desktop/card"
import DropIndicator from "@/components/desktop/drop-indicator"
import { useTask } from "@/providers/task-provider"
import { ArrowBigDown, CheckCheckIcon, Plus } from "lucide-react"
import { JSX, useState } from "react"

interface Props {
	title: string
	column: "new" | "progress" | "completed"
	textColor: string
	bgColor: string
}

const COLUMNSICONS: Record<string, JSX.Element> = {
	new: <Plus className="size-4" />,
	progress: <ArrowBigDown className="size-4" />,
	completed: <CheckCheckIcon className="size-4" />
} as const

export default function Column({ title, column, textColor, bgColor }: Props) {
	const { tasks, updateTask } = useTask()
	const cardFilter = tasks?.filter(c => c.column === column)
	const [active, setActive] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragStart = (e: any, task: any) => {
		e.dataTransfer.setData("cardId", task._id)
	}

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		highlightIndicator(e)
		setActive(true)
	}

	const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
		const indicators = getIndicator()
		clearHighlight(indicators)
		const el = getNearestIndicator(e, indicators)
		el.element.style.opacity = "1"
	}

	const clearHighlight = (els?: HTMLElement[]) => {
		const indicators = els || getIndicator()
		indicators.forEach(i => {
			i.style.opacity = "0"
		})
	}

	const getNearestIndicator = (
		e: React.DragEvent<HTMLDivElement>,
		indicators: HTMLElement[]
	): { offset: number; element: HTMLElement } => {
		const DISTANCE_OFFSET = 50
		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect()
				const offset = e.clientY - (box.top + DISTANCE_OFFSET)
				if (offset < 0 && offset > closest.offset) {
					return { offset, element: child }
				}
				return closest
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1]
			}
		)
		return el
	}

	const getIndicator = (): HTMLElement[] => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`))
	}

	const handleDragLeave = () => {
		setActive(false)
		clearHighlight()
	}

	const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
		setActive(false)
		clearHighlight()

		const cardId = e.dataTransfer.getData("cardId")
		const indicators = getIndicator()
		const { element } = getNearestIndicator(e, indicators)
		const before = element.dataset.before || "-1"

		if (before !== cardId) await updateTask({ _id: cardId, column })
	}

	return (
		<section className="w-full">
			<div className="border-border bg-muted flex items-center justify-between rounded-md border px-2 py-1">
				<div className="text-md inline-flex items-center gap-2">
					<h3>{title}</h3>
				</div>
				<div
					className={`inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-xs ${textColor} ${bgColor}`}>
					{COLUMNSICONS[column]}
					{cardFilter?.length}
				</div>
			</div>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`flex h-[80dvh] flex-col gap-1 transition-colors duration-200 ease-in-out ${active ? "bg-muted/50" : "bg-muted/0"}`}>
				{cardFilter?.map(c => (
					<Card key={c._id} task={c} handleDragStart={handleDragStart} />
				))}
				<DropIndicator beforeId="-1" column={column} />
			</div>
		</section>
	)
}
