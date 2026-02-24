"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { FolderIcon, Pin } from "lucide-react"
import { useRouter } from "next/navigation"
import { useFolders } from "../folders/components/hooks/use-folders"

export default function DashboardFolders() {
	const { folders, changeFolder } = useFolders()
	const { push } = useRouter()
	const pinnedFolders = folders.filter((folder) => folder.fav === true)

	const onChange = ({ _id, name, rootId }: { _id: string; name: string; rootId: string | null }) => {
		changeFolder({ _id, name, rootId })
		push("/app/folders")
	}

	return (
		<Card className="space-y-4 gap-0 p-6 lg:row-span-3 lg:col-start-5 lg:row-start-3">
			<CardHeader className="p-0 mb-2">
				<CardTitle className="flex gap-4">
					<Pin className="size-4" />
					Carpetas
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 p-0">
				{pinnedFolders.length > 0 ? (
					pinnedFolders.map(({ _id, name, rootId }) => (
						<Button
							onClick={() => onChange({ _id, name, rootId })}
							variant="ghost"
							key={_id}
							className="flex gap-2 justify-start w-full cursor-pointer">
							<FolderIcon className="size-5" />
							<span>{name}</span>
						</Button>
					))
				) : (
					<Empty className="gap-2 md:p-3 w-full max-w-sm">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<FolderIcon />
							</EmptyMedia>
							<EmptyTitle className="text-base">No poseé ninguna carpeta guardada.</EmptyTitle>
							<EmptyDescription className="text-sm">
								Las carpetas que marque como favoritos aparecerán aquí.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				)}
			</CardContent>
			<CardFooter className="p-0">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-full cursor-pointer">Ver todo</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Lista de Guardado</DialogTitle>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	)
}
