"use client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { SubmitHandler } from "react-hook-form"
import type { z } from "zod"
import useCreateTime from "../hooks/use-create-time"
import { timeCreateSchema } from "../schemas/time.schema"
import { TimeForm } from "./time-form"

interface TimeSheetCreateProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	defaultDay?: string
}

export function TimeSheetCreate({ open, onOpenChange, defaultDay }: TimeSheetCreateProps) {
	const { mutate: create } = useCreateTime()

	const onSubmit: SubmitHandler<z.infer<typeof timeCreateSchema>> = (data) => {
		create(data)
		onOpenChange(false)
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className="sm:max-w-md overflow-y-auto">
				<SheetHeader className="mb-6">
					<SheetTitle>Añadir Horario</SheetTitle>
					<SheetDescription>Configura el horario de tu materia.</SheetDescription>
				</SheetHeader>
				<TimeForm
					submitText="Añadir"
					onSubmit={onSubmit}
					onCancel={() => onOpenChange(false)}
					defaultValues={{ day: defaultDay as any }}
				/>
			</SheetContent>
		</Sheet>
	)
}
