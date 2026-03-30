import SyllabusMainPage from "@/features/syllabus/components/syllabus-main-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Organzi - Temarios",
	description: "Visualiza los temarios de las asignaturas en Organzi.",
	robots: {
		index: false,
		follow: false
	}
}

export default function SyllabusAppPage() {
	return <SyllabusMainPage />
}
