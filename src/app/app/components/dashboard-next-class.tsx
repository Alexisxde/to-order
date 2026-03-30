"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, GraduationCap } from "lucide-react"
import useTimes from "@/features/time/hooks/use-times"
import { useMemo } from "react"

export default function DashboardNextClass() {
	const { data: schedule = [] } = useTimes()

	const nextClass = useMemo(() => {
		if (schedule.length === 0) return null

		const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
		const now = new Date()
		const currentDay = days[now.getDay()]
		const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`

		// Filter classes for today that haven't ended yet
		const todayClasses = schedule
			.filter((s) => s.day === currentDay && s.time_end > currentTime)
			.sort((a, b) => a.time_start.localeCompare(b.time_start))

		if (todayClasses.length > 0) return todayClasses[0]

		// If no more classes today, find first class of tomorrow (or next available day)
		const sortedSchedule = [...schedule].sort((a, b) => {
			const dayOrder: Record<string, number> = { Lunes: 1, Martes: 2, Miércoles: 3, Jueves: 4, Viernes: 5, Sábado: 6 }
			if (dayOrder[a.day] !== dayOrder[b.day]) return dayOrder[a.day] - dayOrder[b.day]
			return a.time_start.localeCompare(b.time_start)
		})

		return sortedSchedule[0]
	}, [schedule])

	if (!nextClass) return null

	return (
		<div className="h-full">
			<Card className="h-full border-none shadow-lg bg-primary text-primary-foreground overflow-hidden relative group">
				<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
					<GraduationCap className="size-32" />
				</div>
				<CardHeader className="pb-2">
					<CardTitle className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Siguiente Clase</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col justify-between h-[calc(100%-60px)] relative z-10">
					<div>
						<h3 className="text-2xl font-bold leading-tight mb-2">{nextClass.subject}</h3>
						<Badge variant="secondary" className="bg-white/20 text-white border-none font-semibold">
							{nextClass.type}
						</Badge>
					</div>

					<div className="space-y-3 mt-6">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white/10 rounded-lg">
								<Clock className="size-4" />
							</div>
							<div>
								<p className="text-[10px] uppercase font-bold opacity-70">Horario</p>
								<p className="text-sm font-semibold">
									{nextClass.day}, {nextClass.time_start} - {nextClass.time_end}
								</p>
							</div>
						</div>

						{nextClass.description && (
							<div className="flex items-center gap-3">
								<div className="p-2 bg-white/10 rounded-lg">
									<MapPin className="size-4" />
								</div>
								<div>
									<p className="text-[10px] uppercase font-bold opacity-70">Ubicación</p>
									<p className="text-sm font-semibold line-clamp-1">{nextClass.description}</p>
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
