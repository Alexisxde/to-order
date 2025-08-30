"use client"
import Column from "@/components/desktop/column"
import DeleteCard from "@/components/desktop/delete-card"
import { useIsMobile } from "@/hooks/useIsMobile"
import { createTaskSchema } from "@/lib/schema"
import { Plus } from "lucide-react"
import { useState } from "react"
import { z } from "zod"
import FormCreateTask from "./form-create-task"
import Tab from "./mobile/tab"
import Button from "./ui/button"
import {
	DragDrawer,
	DragDrawerContent,
	DragDrawerTrigger
} from "./ui/drag-draw"
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger
} from "./ui/morphing-dialog"

type FormData = z.infer<typeof createTaskSchema>

type ColumnType = {
	title: string
	column: "new" | "progress" | "completed"
	textColor: string
	bgColor: string
}

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
] as ColumnType[]

export default function Task() {
	const isMobile = useIsMobile()
	const [isOpen, setIsOpen] = useState(false)

	return isMobile ? (
		<section className="flex flex-col">
			<Tab columns={COLUMNS} />
			<div className="fixed right-4 bottom-1/6">
				<DragDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
					<DragDrawerTrigger asChild>
						<Button className="size-12 rounded-full" size={"icon"}>
							<Plus className="size-6" />
						</Button>
					</DragDrawerTrigger>
					<DragDrawerContent className="h-fit">
						<FormCreateTask setIsOpen={setIsOpen} />
					</DragDrawerContent>
				</DragDrawer>
			</div>
		</section>
	) : (
		<section className="flex gap-4 p-4">
			{COLUMNS.map(({ title, column, textColor, bgColor }) => (
				<Column
					key={column}
					title={title}
					column={column}
					textColor={textColor}
					bgColor={bgColor}
				/>
			))}
			<div className="fixed right-4 bottom-4">
				<MorphingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
					<MorphingDialogTrigger asChild>
						<Button className="size-12 rounded-full" size={"icon"}>
							<Plus className="size-6" />
						</Button>
					</MorphingDialogTrigger>
					<MorphingDialogContainer
						overlay={false}
						className="items-end justify-end pr-4 pb-5">
						<MorphingDialogContent className="bg-card size-fit">
							<MorphingDialogClose />
							<FormCreateTask setIsOpen={setIsOpen} />
						</MorphingDialogContent>
					</MorphingDialogContainer>
				</MorphingDialog>
			</div>
			<DeleteCard />
		</section>
	)
}
