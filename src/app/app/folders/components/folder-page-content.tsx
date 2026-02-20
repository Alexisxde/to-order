"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { FolderIcon } from "lucide-react"
import FolderBreadcrumb from "./folder-breadcrumb"
import FolderCardSkeleton from "./folder-card-skeleton"
import FolderDialogCreate from "./folder-dialog-create"
import FolderList from "./folder-list"
import { useFolders } from "./hooks/use-folders"
import { useNotes } from "./hooks/use-notes"
import NoteDialogCreate from "./note-dialog-create"
import NoteList from "./note-list"

export default function FoldersPageContent() {
	const isMobile = useIsMobile()
	const { folders, isLoading: isLoadingFolders, folderId } = useFolders()
	const { notes, isLoading: isLoadingNotes } = useNotes()
	const allFolders = folders.filter((folder) => folder.rootId === folderId && folder.delete === false)
	const allNotes = notes.filter((note) => note.folderId === folderId && note.deleted === false)

	return (
		<section className="flex h-full w-full flex-1 flex-col">
			<header className="flex items-center justify-between py-2 px-4">
				<div className="flex items-center gap-4">
					{isMobile && <SidebarTrigger />}
					<FolderBreadcrumb />
				</div>
				<div className="flex items-center gap-1">
					<FolderDialogCreate />
					<NoteDialogCreate />
				</div>
			</header>
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
			{!isLoadingFolders &&
				(!allFolders || allFolders.length === 0) &&
				!isLoadingNotes &&
				(!allNotes || allNotes.length === 0) && (
					<div className="flex w-full flex-1 flex-col items-center justify-center py-8">
						<FolderIcon className="text-muted-foreground mb-2 size-8 lg:size-10" />
						<p className="text-muted-foreground mb-1 text-sm">¡Aún no tienes carpetas ni notas!</p>
						<p className="text-muted-foreground mb-2 text-xs">Crea tus carpetas para organizar tus notas.</p>
					</div>
				)}
			<div className="flex flex-1 flex-col gap-3 p-4 pt-0">
				<section className="space-y-4">
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						<FolderList folders={allFolders} />
						<NoteList notes={allNotes} />
					</div>
				</section>
			</div>
		</section>
	)
}
