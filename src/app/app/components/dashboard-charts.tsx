"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import useTask from "@/features/tasks/hooks/use-task"
import useTimes from "@/features/time/hooks/use-times"
import { useMemo } from "react"

export default function DashboardCharts() {
	const { data: tasks = [] } = useTask()
	const { data: schedule = [] } = useTimes()

	const taskData = useMemo(() => {
		const statuses = ["todo", "in-progress", "review", "done"]
		const labels: Record<string, string> = {
			todo: "Por hacer",
			"in-progress": "En progreso",
			review: "Revisión",
			done: "Hecho"
		}
		
		return statuses.map(status => ({
			status: labels[status],
			count: tasks.filter(t => t.column === status).length,
			fill: status === "done" ? "hsl(var(--success))" : "hsl(var(--primary))"
		}))
	}, [tasks])

	const weeklyData = useMemo(() => {
		const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
		return days.map(day => ({
			day: day.substring(0, 3),
			clases: schedule.filter(s => s.day === day).length,
			tareas: tasks.filter(t => {
				const date = new Date(t.createdAt)
				const dayName = date.toLocaleDateString('es-ES', { weekday: 'long' })
				return dayName.toLowerCase() === day.toLowerCase()
			}).length
		}))
	}, [tasks, schedule])

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
			<div>
				<Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
							Estado de Tareas
						</CardTitle>
					</CardHeader>
					<CardContent className="h-[250px] pt-4">
						<ChartContainer config={{
							count: { label: "Tareas", color: "hsl(var(--primary))" }
						}}>
							<BarChart data={taskData}>
								<CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
								<XAxis 
									dataKey="status" 
									tickLine={false} 
									axisLine={false} 
									tick={{fontSize: 10, fontWeight: 600}} 
								/>
								<Bar 
									dataKey="count" 
									radius={[4, 4, 0, 0]} 
									barSize={40} 
									className="fill-primary/80"
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			<div>
				<Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
							Actividad Semanal
						</CardTitle>
					</CardHeader>
					<CardContent className="h-[250px] pt-4">
						<ChartContainer config={{
							clases: { label: "Clases", color: "hsl(var(--primary))" },
							tareas: { label: "Tareas", color: "hsl(var(--secondary))" }
						}}>
							<AreaChart data={weeklyData}>
								<defs>
									<linearGradient id="fillClases" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
										<stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
									</linearGradient>
								</defs>
								<CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
								<XAxis 
									dataKey="day" 
									tickLine={false} 
									axisLine={false} 
									tick={{fontSize: 10, fontWeight: 600}} 
								/>
								<Area 
									type="monotone" 
									dataKey="clases" 
									stroke="hsl(var(--primary))" 
									fillOpacity={1} 
									fill="url(#fillClases)" 
									strokeWidth={2}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
