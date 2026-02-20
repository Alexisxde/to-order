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
import { EditIcon, FileText, MoreVertical } from "lucide-react"
import NoteDialogDelete from "./note-dialog-delete"
import NoteDialogEditor from "./note-dialog-editor"
import NoteDialogMove from "./note-dialog-move"

type Props = { note: Note }

export default function NoteCard({ note }: Props) {
	const { _id, name, createdAt, updateAt, folderId } = note

	return (
		<Card>
			<CardContent className="flex justify-between">
				<NoteDialogEditor note={note}>
					<CardHeader className="cursor-pointer flex flex-col w-full p-0">
						<CardTitle className="flex items-center gap-2 font-medium">
							<FileText className="size-5" />
							{name}
						</CardTitle>
						<CardDescription className="text-xs">
							{updateAt ? `Modificado ${month(new Date(updateAt))}` : `Creado ${month(new Date(createdAt))}`}
						</CardDescription>
					</CardHeader>
				</NoteDialogEditor>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreVertical className="size-5 text-muted-foreground hover:text-foreground" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem asChild>
							<DropdownMenuItem asChild>
								<NoteDialogEditor note={note}>
									<Button variant="ghost" className="cursor-pointer w-full justify-start">
										<FileText className="size-4" />
										Abrir
									</Button>
								</NoteDialogEditor>
							</DropdownMenuItem>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<DropdownMenuItem asChild>
								<NoteDialogMove noteId={_id} folderId={folderId} />
							</DropdownMenuItem>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Button variant="ghost" className="cursor-pointer w-full justify-start">
								<EditIcon className="size-4" />
								<span>Cambiar nombre</span>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuSeparator className="mx-1" />
						<DropdownMenuItem asChild variant="destructive">
							<NoteDialogDelete noteId={_id} noteName={name} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardContent>
		</Card>
	)
}
