"use client"
import { useTime } from "@/providers/time-provider"

export default function TimeCalendar() {
	const { times } = useTime()

	const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"]

	const getMinutes = (str: string) => {
		const [h, m] = str.split(":").map(Number)
		return h * 60 + m
	}

	const minTime = Math.min(...times.map(t => getMinutes(t.time_start)))
	const maxTime = Math.max(...times.map(t => getMinutes(t.time_end)))
	const hourStart = Math.floor(minTime / 60)
	const hourEnd = Math.ceil(maxTime / 60)
	const totalHours = hourEnd - hourStart
	const blockHeight = 100 / totalHours

	return (
		<>
			<div className="bg-background border-border sticky top-15 z-30 flex w-full items-center justify-center overflow-x-hidden border-b py-2">
				<div className="bg-muted w-20 rounded-xl px-2 py-1.5 text-center text-xs">
					Horarios
				</div>
				<div className="flex w-full items-center justify-center">
					{days.map(day => (
						<div
							key={day}
							className="bg-muted mx-1 flex w-full items-center justify-center truncate rounded-full px-2 py-1.5 text-center text-xs">
							{day}
						</div>
					))}
				</div>
			</div>
			<section className="flex h-dvh w-full pb-4">
				<div className="flex w-20 flex-col">
					{Array.from({ length: totalHours }, (_, i) => {
						const hour = hourStart + i
						return (
							<div
								key={i}
								className="border-border flex items-center justify-center border-r text-xs not-first:border-t"
								style={{ height: `${blockHeight}%` }}>
								<span className="bg-muted rounded-lg p-2">{`${hour.toString().padStart(2, "0")}:00`}</span>
							</div>
						)
					})}
				</div>
				{days.map(day => (
					<div
						key={day}
						className="border-border relative flex w-full flex-1 gap-2 border-r">
						{/* Fondo de bloques */}
						{Array.from({ length: totalHours }, (_, i) => (
							<div key={i} style={{ height: `${blockHeight}%` }} />
						))}

						{times
							.filter(t => t.day === day)
							.map((event, idx) => {
								const startMin = getMinutes(event.time_start)
								const endMin = getMinutes(event.time_end)
								const offset =
									((startMin - hourStart * 60) / (totalHours * 60)) * 100
								const duration = endMin - startMin
								const height = (duration / 60) * blockHeight
								return (
									<article
										key={event._id}
										className="text-primary absolute right-0 left-0 mx-2 flex flex-col rounded-lg border p-1 text-xs"
										style={{
											top: `${offset + 0.5}%`,
											height: `${height - 0.5}%`,
											borderColor: event.color,
											backgroundColor: `${event.color}50`
										}}>
										<div
											className="flex flex-col gap-2 truncate text-xs font-semibold"
											style={{ color: `${event.color}` }}>
											<h3>
												{event.subject} - {event.type}
											</h3>
										</div>
										<p>
											{event.time_start} - {event.time_end}
										</p>
									</article>
								)
							})}
					</div>
				))}
			</section>
		</>
	)
}
