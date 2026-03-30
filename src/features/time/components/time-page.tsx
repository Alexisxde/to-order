"use client"
import { useState } from "react"
import useTimes from "../hooks/use-times"
import type { Time } from "../time.type"
import { TimeGrid } from "./time-grid"
import { TimeSheetCreate } from "./time-sheet-create"
import { TimeSheetUpdate } from "./time-sheet-update"

export default function TimePage() {
	const { data: times = [] } = useTimes()
	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [selectedTime, setSelectedTime] = useState<Time | null>(null)
	const [selectedDay, setSelectedDay] = useState<string | undefined>()

	const handleAdd = (day?: string) => {
		setSelectedDay(day)
		setIsCreateOpen(true)
	}

	const handleEdit = (time: Time) => {
		setSelectedTime(time)
		setIsUpdateOpen(true)
	}

	return (
		<section className="flex flex-col gap-6 size-full">
			<TimeGrid times={times} onEdit={handleEdit} onAdd={handleAdd} />
			<TimeSheetCreate open={isCreateOpen} onOpenChange={setIsCreateOpen} defaultDay={selectedDay} />
			<TimeSheetUpdate time={selectedTime} open={isUpdateOpen} onOpenChange={setIsUpdateOpen} />
		</section>
	)
}
