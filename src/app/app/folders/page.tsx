import type { Metadata } from "next"
import FoldersPageContent from "./components/folder-page-content"

export const metadata: Metadata = {
	title: "Organzi - Carpetas y Notas",
	description: "Organiza tus pensamientos y archivos en carpetas dentro de Organzi.",
	robots: {
		index: false,
		follow: false
	}
}

export default function FoldersPage() {
	return <FoldersPageContent />
}
