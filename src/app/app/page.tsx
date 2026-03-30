"use client"
import DashboardFolders from "./components/dashboard-folders"
import DashboardStats from "./components/dashboard-stats"
import DashboardCharts from "./components/dashboard-charts"
import DashboardNextClass from "./components/dashboard-next-class"

export default function AppPage() {
	return (
		<div className="flex flex-col gap-6 w-full pb-8">
			<header className="flex flex-col gap-1">
				<h1 className="text-3xl font-semibold tracking-tighter text-foreground uppercase italic">Overview</h1>
				<p className="text-sm font-medium text-muted-foreground">
					Bienvenido de nuevo. Aquí tienes un resumen de tu actividad actual.
				</p>
			</header>
			<div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
				<div className="xl:col-span-3 flex flex-col gap-6">
					<DashboardStats />
					<DashboardCharts />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">{/* Podrías agregar más widgets aquí */}</div>
				</div>
				<div className="xl:col-span-1 flex flex-col gap-6">
					<DashboardNextClass />
					<DashboardFolders />
				</div>
			</div>
		</div>
	)
}
