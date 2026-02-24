import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ClipboardList, Clock, Eye } from "lucide-react"

export default function DashboardTasks() {
  return (
    <>
    <Card className="bg-card p-4 flex flex-row gap-2 items-center justify-center">
            <div className="bg-muted p-2 rounded-full h-fit">
              <ClipboardList className="text-muted-foreground" />
            </div>
            <CardContent className="flex-1 p-0">
              <CardHeader className="p-0">
                <CardTitle className="text-sm">Total Tareas</CardTitle>
                <p className="text-2xl font-bold">24</p>
              </CardHeader>
            </CardContent>
          </Card>
          <Card className="bg-card p-4 flex flex-row gap-2 items-center justify-center">
            <div className="bg-muted p-2 rounded-full h-fit">
              <Clock className="text-muted-foreground" />
            </div>
            <CardContent className="flex-1 p-0">
              <CardHeader className="p-0">
                <CardTitle className="text-sm">Tareas Pendientes</CardTitle>
                <p className="text-2xl font-bold">10</p>
              </CardHeader>
            </CardContent>
          </Card>
          <Card className="bg-card p-4 flex flex-row gap-2 items-center justify-center">
            <div className="bg-muted p-2 rounded-full h-fit">
              <Eye className="text-muted-foreground" />
            </div>
            <CardContent className="flex-1 p-0">
              <CardHeader className="p-0">
                <CardTitle className="text-sm">Tareas en Revisión</CardTitle>
                <p className="text-2xl font-bold">4</p>
              </CardHeader>
            </CardContent>
          </Card>
          <Card className="bg-card p-4 flex flex-row gap-2 items-center justify-center">
            <div className="bg-muted p-2 rounded-full h-fit">
              <CheckCircle2 className="text-muted-foreground" />
            </div>
            <CardContent className="flex-1 p-0">
              <CardHeader className="p-0">
                <CardTitle className="text-sm">Tareas Completadas</CardTitle>
                <p className="text-2xl font-bold">10</p>
              </CardHeader>
            </CardContent>
          </Card>
    </>
  )
}
