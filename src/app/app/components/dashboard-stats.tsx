"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ClipboardList, Clock, Eye, TrendingUp } from "lucide-react"
import useTask from "@/features/tasks/hooks/use-task"
import { useMemo } from "react"

export default function DashboardStats() {
	const { data: tasks = [] } = useTask()

	const stats = useMemo(() => {
		const total = tasks.length
		const pending = tasks.filter((t) => t.column === "todo" || t.column === "in-progress").length
		const review = tasks.filter((t) => t.column === "review").length
		const completed = tasks.filter((t) => t.column === "done").length
		const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

		return [
			{
				title: "Total Tareas",
				value: total,
				icon: ClipboardList,
				color: "text-blue-500",
				bg: "bg-blue-500/10",
				description: "Tareas registradas"
			},
			{
				title: "Pendientes",
				value: pending,
				icon: Clock,
				color: "text-amber-500",
				bg: "bg-amber-500/10",
				description: "Por completar"
			},
			{
				title: "En Revisión",
				value: review,
				icon: Eye,
				color: "text-purple-500",
				bg: "bg-purple-500/10",
				description: "Esperando feedback"
			},
			{
				title: "Completadas",
				value: completed,
				icon: CheckCircle2,
				color: "text-emerald-500",
				bg: "bg-emerald-500/10",
				description: `${completionRate}% de éxito`
			}
		]
	}, [tasks])

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
			{stats.map((stat) => (
				<div key={stat.title}>
					<Card className="overflow-hidden border-none shadow-sm bg-card/50 backdrop-blur-sm hover:bg-card transition-colors">
						<CardContent className="p-5">
							<div className="flex items-center justify-between">
								<div className={`p-2.5 rounded-xl ${stat.bg}`}>
									<stat.icon className={`size-5 ${stat.color}`} />
								</div>
								{stat.title === "Completadas" && stats[0].value > 0 && (
									<div className="flex items-center gap-1 text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
										<TrendingUp className="size-3" />
										Activo
									</div>
								)}
							</div>
							<div className="mt-4">
								<h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
								<div className="flex items-baseline gap-2">
									<span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
									<span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
										{stat.description}
									</span>
								</div>
							</div>
						</CardContent>
						<div className={`h-1 w-full ${stat.bg.replace("/10", "/30")}`} />
					</Card>
				</div>
			))}
		</div>
	)
}
