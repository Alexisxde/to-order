import DashboardFolders from "./components/dashboard-folders"
import DashboardTasks from "./components/dashboard-tasks"

export default function AppPage() {
	return (
		<div className="grid grid-cols-2 grid-rows-4 lg:grid-cols-5 lg:grid-rows-5 gap-4">
			<DashboardTasks />
			<div className="bg-yellow-500 rounded-lg lg:row-span-2 lg:col-start-5 lg:row-start-1" />
			<div className="bg-green-500 rounded-lg lg:row-span-3 lg:col-start-1 lg:row-start-2" />
			<div className="bg-blue-500 rounded-lg lg:col-span-3 lg:row-span-3 lg:col-start-2 lg:row-start-2" />
			<DashboardFolders />
			<div className="bg-pink-500 rounded-lg lg:col-span-4 lg:row-start-5" />
		</div>
	)
}
