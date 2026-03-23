import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { CalendarIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Calendario",
	description: "Visualiza tus tareas y eventos en el calendario de Organzi.",
	robots: {
		index: false,
		follow: false
	}
}

export default function Page() {
...
    <div className="flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CalendarIcon />
          </EmptyMedia>
          <EmptyTitle>Próximamente</EmptyTitle>
          <EmptyDescription>
            La sección del calendario estará disponible pronto.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
