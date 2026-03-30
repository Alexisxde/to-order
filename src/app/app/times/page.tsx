import TimePage from "@/features/time/components/time-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Organzi - Horarios",
	description: "Controla tus horarios de tus materias con Organzi.",
	robots: {
		index: false,
		follow: false
	}
}

export default function Page() {
	return (
		<>
			<header className="flex flex-col gap-2 mb-4">
				<h1 className="text-2xl font-medium text-foreground">Horarios Universitarios</h1>
				<p className="text-sm font-medium text-muted-foreground">Gestiona tus clases y actividades semanales</p>
			</header>
			<TimePage />
		</>
	)
}
