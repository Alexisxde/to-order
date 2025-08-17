import DropIndicator from "@/components/desktop/drop-indicator"
import { month } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { motion } from "motion/react"

interface Props {
	task: any
	handleDragStart: (e: any, task: any) => void // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function Card({ task, handleDragStart }: Props) {
	const { _id, title, column, description, created_at } = task
	const data_format = new Date(created_at)

	return (
		<>
			<DropIndicator beforeId={_id} column={column} />
			<motion.article
				layout
				layoutId={_id}
				exit={{ opacity: 0, height: 0 }}
				draggable
				onDragStart={e => handleDragStart(e, task)}
				className="cursor-grab space-y-1 rounded-md border border-neutral-800 bg-neutral-900 p-4 active:cursor-grabbing">
				<div className="flex flex-col gap-2">
					<span className="inline-flex items-center gap-1 text-[11px] font-normal text-neutral-400">
						<Calendar className="size-4" />
						<span>
							{month(data_format.getMonth())}{" "}
							{data_format.getDate() < 10
								? `0${data_format.getDate()}`
								: data_format.getDate()}
							{", "}
							{data_format.getFullYear()}
						</span>
					</span>
					<span className="text-sm font-medium text-neutral-100">{title}</span>
				</div>
				{description && (
					<>
						<p className="mb-2 text-xs text-pretty text-neutral-400">
							{description}
						</p>
						<div className="my-2 border-b-1 border-neutral-800"></div>
					</>
				)}
			</motion.article>
		</>
	)
}
