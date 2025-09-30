"use client"
import { CreateFolder } from "@/components/folders/create-folder"
import { CreateNote } from "@/components/folders/create-note"
import FolderCard from "@/components/folders/folder-card"
import NoteCard from "@/components/folders/note-card"
import Button from "@/components/ui/button"
import { useFolder } from "@/hooks/useFolder"
import { Columns3Icon, Folder, Loader2, Plus, Rows3Icon } from "lucide-react"
import { Fragment, useEffect, useState } from "react"

export default function FoldersPage() {
	const [grid, setGrid] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const { loading, history, folders, notes, getFolderId, folderId, setFolderId } = useFolder()

	useEffect(() => {
		getFolderId(folderId)
	}, [folderId])

	return (
		<main className="flex w-full flex-1 flex-col gap-2 p-4">
			<header className="flex w-full items-center justify-between">
				<div className="flex items-center">
					{history.map((h, i) => (
						<Fragment key={h._id}>
							<Button variant={"link"} className="text-xs" onClick={() => setFolderId(h._id)}>
								{h.name}
							</Button>
							{i < history.length - 1 && <span className="text-xs">/</span>}
						</Fragment>
					))}
				</div>
				<div className="flex items-center justify-center gap-2">
					<Button variant={"ghost"} size={"icon"} onClick={() => setGrid(false)} className={`${!grid && "bg-muted"}`}>
						<Rows3Icon className="size-5" />
					</Button>
					<Button variant={"ghost"} size={"icon"} onClick={() => setGrid(true)} className={`${grid && "bg-muted"}`}>
						<Columns3Icon className="size-5" />
					</Button>
				</div>
			</header>
			{loading && (
				<div className="flex w-full flex-col items-center justify-center py-8">
					<Loader2 className="text-primary size-8 animate-spin lg:size-10" />
				</div>
			)}
			{folders?.length === 0 && !loading && notes?.length === 0 && (
				<div className="flex w-full flex-col items-center justify-center py-8">
					<Folder className="text-gray mb-2 size-8 lg:size-10" />
					<p className="text-gray mb-1 text-sm">¡Aún no tienes carpetas!</p>
					<p className="text-gray mb-2 text-xs">Crea tus carpetas para organizar tus notas.</p>
					<span className="text-gray text-xs">
						Haz clic en <Plus className="inline size-4 align-text-bottom" /> para empezar.
					</span>
				</div>
			)}
			<section className={grid ? "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4" : "grid grid-cols-1 gap-2"}>
				{folders?.map(folder => (
					<FolderCard key={folder._id} folder={folder} />
				))}
				{notes?.map(note => (
					<NoteCard key={note._id} note={note} />
				))}
			</section>
			<div className="fixed right-4 bottom-1/12 lg:bottom-4">
				<div className="relative">
					<div className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col items-center gap-2">
						<CreateFolder isOpen={isOpen} />
						<CreateNote isOpen={isOpen} />
					</div>
					<Button
						onClick={() => setIsOpen(prev => !prev)}
						className={`size-12 rounded-full ${isOpen && "rotate-45"}`}
						size={"icon"}>
						<Plus className="size-6" />
					</Button>
				</div>
			</div>
		</main>
	)
}
