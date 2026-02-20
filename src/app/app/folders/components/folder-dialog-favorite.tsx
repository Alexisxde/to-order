"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Heart } from "lucide-react"
import { useState } from "react"
import { useFolders } from "./hooks/use-folders"

type Props = { folderId: string; folderName: string; folderFav: boolean }

export default function FolderDialogFavorite({ folderId, folderName, folderFav }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const { favorite } = useFolders()

	const handleFavorite = async () => {
		favorite({ id: folderId, fav: !folderFav })
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="cursor-pointer w-full justify-start">
					<Heart className={`size-4 ${folderFav && "text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400"}`} />
					<span>Favorito</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md" showCloseButton={false}>
				<DialogHeader className="flex flex-col items-center text-center">
					<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
						<Heart className="size-6 text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400" />
					</div>
					<DialogTitle className="text-xl font-semibold">
						{folderFav ? "Eliminar de favoritos" : "Guardar como favorito"}
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground mt-2">
						¿Deseas {folderFav ? "desmarcar" : "marcar"} la carpeta {folderName} como favorita?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:gap-2">
					<Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
						Cancelar
					</Button>
					<Button onClick={() => handleFavorite()} className="flex-1">
						{folderFav ? "Desmarcar" : "Marcar"} como favorito
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
