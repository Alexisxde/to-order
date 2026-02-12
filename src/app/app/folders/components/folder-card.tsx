"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { month } from "@/lib/utils"
import type { Folder } from "@/module/folders/folder.type"
import { FolderIcon, FolderOpen, Heart, InfoIcon, MoreVertical } from "lucide-react"
import { FolderDialogDelete } from "./folder-dialog-delete"
import FolderDialogMove from "./folder-dialog-move"
import FolderDialogUpdate from "./folder-dialog-update"
import { useFolders } from "./hooks/use-folders"

type Props = { folder: Folder }

export default function FolderCard({ folder }: Props) {
	const { _id, name, rootId, createdAt } = folder
	const { changeFolder } = useFolders()

	return (
		<Card>
			<CardContent className="flex justify-between">
				<CardHeader onClick={() => changeFolder({ _id, name, rootId })} className="cursor-pointer flex flex-col w-full p-0">
					<CardTitle className="flex items-center gap-2 font-medium">
						<FolderIcon className="size-5" />
						{name}
					</CardTitle>
					<CardDescription className="text-xs">Creado {month(new Date(createdAt))}</CardDescription>
				</CardHeader>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreVertical className="size-5 text-muted-foreground hover:text-foreground" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem asChild>
							<Button variant="ghost" className="cursor-pointer w-full justify-start" onClick={() => changeFolder({ _id, name, rootId })}>
								<FolderOpen className="size-4" />
								<span>Abrir</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Button variant="ghost" className="cursor-pointer w-full justify-start">
								<Heart className="size-4" />
								<span>Favorito</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<FolderDialogMove folderId={_id} />
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<FolderDialogUpdate folder={folder} />
						</DropdownMenuItem>
						<DropdownMenuItem asChild disabled>
							<Button variant="ghost" className="cursor-pointer w-full justify-start">
								<InfoIcon className="size-4" />
								<span>Información</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuSeparator className="mx-1" />
						<DropdownMenuItem asChild variant="destructive">
							<FolderDialogDelete folderId={_id} folderName={name} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardContent>
		</Card>
	)
}
