"use client"
import Card from "@/components/card"
import DropIndicator from "@/components/drop-indicator"
import { ArrowBigDown, CheckCheckIcon, PenSquare, Plus } from "lucide-react"
import { JSX, useState } from "react"

interface Props {
	title: string
	column: string
	textColor: string
	bgColor: string
}

const COLUMNSICONS: Record<string, JSX.Element> = {
	new: <Plus />,
	todo: <PenSquare />,
	process: <ArrowBigDown />,
	completed: <CheckCheckIcon />
} as const

const tasks = [{ id: "1", title: "Test", column: "new" }]

export default function Column({ title, column, textColor, bgColor }: Props) {
	const cardFilter = tasks?.filter(c => c.column === column)
	const [active, setActive] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleDragStart = (e: any, card: any) => {
		e.dataTransfer.setData("cardId", card.id)
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

		if (before !== cardId) {
			// updateTasks({ id: cardId, column })
		}
	}

	return (
		<section className="w-full flex-1">
			<div className="sticky top-13 z-20 mb-2 flex items-center justify-between rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1">
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
				className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-slate-800/0"}`}>
				{cardFilter?.map(c => (
					<Card key={c.id} task={c} handleDragStart={handleDragStart} />
				))}
				<DropIndicator beforeId="-1" column={column} />
			</div>
		</section>
	)
}
