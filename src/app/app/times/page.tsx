import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Timer } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Organzi - Horarios",
	description: "Controla el tus hoarios para tus materias con Organzi.",
	robots: {
		index: false,
		follow: false
	}
}

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Timer />
          </EmptyMedia>
          <EmptyTitle>Próximamente</EmptyTitle>
          <EmptyDescription>
            La sección de los horarios estará disponible pronto.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
