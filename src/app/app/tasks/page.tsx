import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ClipboardList } from "lucide-react"

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ClipboardList />
          </EmptyMedia>
          <EmptyTitle>Próximamente</EmptyTitle>
          <EmptyDescription>
            La sección de tareas estará disponible pronto.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  )
}
