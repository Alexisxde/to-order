import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { CalendarIcon } from "lucide-react"

export default function Page() {
  return (
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
