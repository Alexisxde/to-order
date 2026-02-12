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
import type { Note } from "@/module/notes/note.type"
import { EditIcon, FileText, FolderSymlink, Heart, InfoIcon, MoreVertical, Trash2Icon } from "lucide-react"
import NoteDialogEditor from "./note-dialog-editor"

type Props = { note: Note }

export default function NoteCard({ note }: Props) {
	const { _id, name, createdAt, updateAt } = note

	return (
		<NoteDialogEditor note={note}>
			<Card>
				<CardContent className="flex justify-between">
					<CardHeader className="cursor-pointer flex flex-col w-full p-0">
						<CardTitle className="flex items-center gap-2 font-medium">
							<FileText className="size-5" />
							{name}
						</CardTitle>
						<CardDescription className="text-xs">
							{updateAt ? `Modificado ${month(new Date(updateAt))}` : `Creado ${month(new Date(createdAt))}`}
						</CardDescription>
					</CardHeader>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreVertical className="size-5 text-muted-foreground hover:text-foreground" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem asChild>
								<Button variant="ghost" className="cursor-pointer w-full justify-start">
									<Heart className="size-4" />
									<span>Favorito</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Button variant="ghost" className="cursor-pointer w-full justify-start">
									<FolderSymlink className="size-4" />
									<span>Mover a</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Button variant="ghost" className="cursor-pointer w-full justify-start">
									<EditIcon className="size-4" />
									<span>Cambiar nombre</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Button variant="ghost" className="cursor-pointer w-full justify-start">
									<InfoIcon className="size-4" />
									<span>Información</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuSeparator className="mx-1" />
							<DropdownMenuItem variant="destructive">
								<Trash2Icon className="size-4" />
								<span>Eliminar</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardContent>
			</Card>
		</NoteDialogEditor>
	)
}
