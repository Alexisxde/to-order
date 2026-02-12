"use client"
import { Folder as FolderIcon } from "lucide-react"
import FolderBreadcrumb from "./folder-breadcrumb"
import FolderCardSkeleton from "./folder-card-skeleton"
import FolderList from "./folder-list"
import { useFolders } from "./hooks/use-folders"
import { useNotes } from "./hooks/use-notes"
import NoteList from "./note-list"

export default function FoldersPageContent() {
	const { folders, isLoading: isLoadingFolders } = useFolders()
	const { notes, isLoading: isLoadingNotes } = useNotes()

	return (
		<section className="flex h-full w-full flex-1 flex-col">
			<FolderBreadcrumb />
			{isLoadingFolders && (
				<div className="flex flex-1 flex-col gap-3 p-4 pt-0">
					<section className="space-y-4">
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{Array.from({ length: 4 }).map((_, index) => (
								<FolderCardSkeleton key={index} />
							))}
						</div>
					</section>
				</div>
			)}
			{!isLoadingFolders && (!folders || folders.length === 0) && !isLoadingNotes && (!notes || notes.length === 0) && (
				<div className="flex w-full flex-1 flex-col items-center justify-center py-8">
					<FolderIcon className="text-muted-foreground mb-2 size-8 lg:size-10" />
					<p className="text-muted-foreground mb-1 text-sm">¡Aún no tienes carpetas ni notas!</p>
					<p className="text-muted-foreground mb-2 text-xs">Crea tus carpetas para organizar tus notas.</p>
				</div>
			)}
			<div className="flex flex-1 flex-col gap-3 p-4 pt-0">
				{!isLoadingFolders && folders && folders.length > 0 && (
					<section className="space-y-4">
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							<FolderList />
							<NoteList />
						</div>
					</section>
				)}
			</div>
		</section>
	)
}
