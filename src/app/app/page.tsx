import DashboardFolders from "./components/dashboard-folders"

export default function AppPage() {
	return (
		<div className="grid grid-cols-5 grid-rows-5 gap-4 p-4 h-dvh">
			<div className="bg-muted rounded-lg" />
			<div className="bg-muted rounded-lg col-start-2 row-start-1" />
			<div className="bg-muted rounded-lg col-start-3 row-start-1" />
			<div className="bg-muted rounded-lg col-start-4 row-start-1" />

			<div className="bg-muted rounded-lg row-span-3 col-start-1 row-start-2" />
			<div className="bg-muted rounded-lg col-span-3 row-span-3 col-start-2 row-start-2" />
			<div className="bg-muted rounded-lg row-span-2 col-start-5 row-start-1" />
			<div className="bg-muted rounded-lg col-span-4 row-start-5" />
			<DashboardFolders />
		</div>
	)
}
