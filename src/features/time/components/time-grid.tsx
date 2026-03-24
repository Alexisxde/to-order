"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import type { Time } from "../time.type"
import { TimeCard } from "./time-card"

interface TimeGridProps {
	times: Time[]
	onEdit: (time: Time) => void
	onAdd: (day: string) => void
}

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export function TimeGrid({ times, onEdit, onAdd }: TimeGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 pb-6 h-full">
			{DAYS.map((day) => {
				const dayTimes = times
					.filter((t) => t.day === day)
					.sort((a, b) => a.time_start.localeCompare(b.time_start))

				return (
					<div key={day} className="flex flex-col gap-3 h-full">
						<div className="flex items-center justify-between px-2 py-1 bg-secondary/30 rounded-lg">
							<h3 className="text-xs font-semibold tracking-widest text-foreground">
								{day}
							</h3>
							<Button
								variant="ghost"
								size="icon"
								className="size-7 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
								onClick={() => onAdd(day)}>
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						<ScrollArea className="flex-1 min-h-[240px] lg:min-h-0 bg-secondary/20 rounded-xl p-3 border border-border/40">
							<div className="flex flex-col gap-3 h-full">
								{dayTimes.map((time) => (
									<TimeCard key={time._id} time={time} onEdit={onEdit} />
								))}
								{dayTimes.length === 0 && (
									<div className="flex flex-1 flex-col items-center justify-center opacity-40 min-h-[180px]">
										<p className="text-[10px] font-medium tracking-widest text-center">
											Sin materias
										</p>
									</div>
								)}
							</div>
						</ScrollArea>
					</div>
				)
			})}
		</div>
	)
}
