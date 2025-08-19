"use client"
import Column from "@/components/desktop/column"
import DeleteCard from "@/components/desktop/delete-card"
import { month } from "@/lib/utils"
import { useSidebar } from "@/providers/sidebar-provider"
import { useTask } from "@/providers/task-provider"
import { Calendar, EllipsisVertical, Plus } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"
import Button from "./ui/button"
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger
} from "./ui/morphing-dialog"

const COLUMNS = [
	{
		title: "Nuevas",
		column: "new",
		textColor: "text-neutral-600",
		bgColor: "bg-neutral-300"
	},
	{
		title: "En progreso",
		column: "progress",
		textColor: "text-blue-600",
		bgColor: "bg-blue-300"
	},
	{
		title: "Completadas",
		column: "completed",
		textColor: "text-emerald-600",
		bgColor: "bg-emerald-300"
	}
] as const

export default function Task() {
	const { mode } = useSidebar()
	const [tab, setTab] = useState("new")
	const [isOpen, setIsOpen] = useState(false)
	const { tasks } = useTask()

	if (mode === "mobile") {
		return (
			<section className="flex flex-col">
				<div className="bg-background sticky top-0 z-30 flex flex-1 items-center justify-between px-4 py-2">
					{COLUMNS.map(({ title, column }) => (
						<Chip
							title={title}
							column={column}
							selected={tab === column}
							setSelected={setTab}
							key={column}
						/>
					))}
				</div>
				<div className="flex h-full flex-col gap-1 px-4 pb-4">
					{tasks
						.filter(task => task.column === tab)
						.map(({ _id, title, created_at, description }) => {
							const data_format = new Date(created_at)

							return (
								<motion.article
									key={_id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="border-border rounded-md border p-4">
									<div className="space-y-1">
										<div className="flex items-center justify-between">
											<span className="flex items-center gap-1 text-xs text-neutral-400">
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
											<button>
												<EllipsisVertical className="size-4" />
											</button>
										</div>
										<span className="text-sm font-medium text-neutral-100">
											{title}
										</span>
									</div>
									{description && (
										<p className="mb-2 text-xs text-pretty text-neutral-400">
											{description}
										</p>
									)}
									{/* <div className="my-2 border-b-1 border-neutral-800"></div> */}
								</motion.article>
							)
						})}
				</div>
				<div className="fixed right-4 bottom-1/7">
					<MorphingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
						<MorphingDialogTrigger>
							<Button className="size-12 rounded-full" size={"icon"}>
								<Plus className="size-6" />
							</Button>
						</MorphingDialogTrigger>
						<MorphingDialogContainer>
							<MorphingDialogContent className="h-[97dvh] w-[97vw] lg:h-[95dvh]">
								<MorphingDialogClose />
							</MorphingDialogContent>
						</MorphingDialogContainer>
					</MorphingDialog>
				</div>
			</section>
		)
	}

	return (
		<div className="flex gap-4 p-4">
			{COLUMNS.map(({ title, column, textColor, bgColor }) => (
				<Column
					key={column}
					title={title}
					column={column}
					textColor={textColor}
					bgColor={bgColor}
				/>
			))}
			<DeleteCard />
		</div>
	)
}

type ChipProps = {
	title: string
	column: "new" | "progress" | "completed"
	selected: boolean
	setSelected: React.Dispatch<React.SetStateAction<string>>
}

const Chip = ({ title, column, selected, setSelected }: ChipProps) => {
	return (
		<button
			onClick={() => setSelected(column)}
			className={`${
				selected ? "text-primary" : "text-primary/80"
			} relative h-9 cursor-pointer rounded-md px-4 py-2 text-sm transition-colors duration-200 ease-in-out`}>
			<span className="relative z-10">{title}</span>
			{selected && (
				<motion.span
					layoutId="pill-tab"
					transition={{ type: "spring", duration: 0.3 }}
					className="bg-muted dark:bg-muted/50 absolute inset-0 z-0 rounded-md px-2"
				/>
			)}
		</button>
	)
}
