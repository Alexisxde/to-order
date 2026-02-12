"use client"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { FolderTreeNode, Folder as FolderType } from "@/module/folders/folder.type"
import { ChevronRight, Folder, FolderOpen, FolderSymlink, Home } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { toast } from "sonner"
import { useFolders } from "./hooks/use-folders"

const ROOT_VALUE = "__root__"

type Props = { folderId: string }

function buildFolderTree(folders: FolderType[], parentId: string | null = null): FolderTreeNode[] {
	return folders
		.filter((folder) => folder.rootId === parentId && folder.delete === false)
		.map((folder) => ({ ...folder, children: buildFolderTree(folders, folder._id) }))
}

export default function FolderDialogMove({ folderId }: Props) {
	const [open, setOpen] = useState(false)
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { folders, move } = useFolders()

	const getChildFolderIds = useCallback(
		(parentId: string): string[] => {
			const children = folders.filter((f) => f.rootId === parentId)
			return [...children.map((c) => c._id), ...children.flatMap((c) => getChildFolderIds(c._id))]
		},
		[folders]
	)

	const disabledFolderIds = useMemo(() => {
		const childIds = getChildFolderIds(folderId)
		return new Set([folderId, ...childIds])
	}, [folderId, getChildFolderIds])

	const tree = useMemo(() => buildFolderTree(folders), [folders])

	const handleSelect = useCallback((id: string) => {
		setSelectedId(id)
	}, [])

	const handleOpenChange = useCallback((next: boolean) => {
		setOpen(next)
		if (!next) setSelectedId(null)
	}, [])

	const handleSubmit = useCallback(async () => {
		if (!selectedId) return
		const rootId = selectedId === ROOT_VALUE ? null : selectedId
		if (folderId === rootId) return toast.error("La carpeta ya está en la ubicación seleccionada.")
		setIsSubmitting(true)
		move({ id: folderId, rootId })
		setOpen(false)
		setSelectedId(null)
		setIsSubmitting(false)
	}, [selectedId, move, folderId])

	const currentFolder = folders.find((f) => f._id === folderId)
	const isCurrentFolderInRoot = currentFolder?.rootId === null

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-full cursor-pointer justify-start">
					<FolderSymlink className="size-4" />
					<span>Mover a</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-md gap-0">
				<DialogHeader className="pb-4">
					<DialogTitle>Mover {currentFolder ? `"${currentFolder.name}"` : "carpeta"}</DialogTitle>
					<DialogDescription>Selecciona la carpeta de destino.</DialogDescription>
				</DialogHeader>

				<RadioGroup value={selectedId ?? ""} onValueChange={handleSelect} className="gap-0">
					<ScrollArea className="h-72 rounded-md border border-border">
						<div className="p-2">
							<div
								className={cn(
									"group flex items-center gap-1 rounded-md py-1.5 pl-2 pr-2 transition-colors",
									isCurrentFolderInRoot
										? "cursor-not-allowed opacity-50"
										: selectedId === ROOT_VALUE
											? "bg-primary/10 text-foreground"
											: "text-foreground hover:bg-muted"
								)}>
								<span className="w-7 shrink-0" />
								<Label
									htmlFor="folder-root"
									className={cn(
										"flex flex-1 items-center gap-2 transition-colors",
										isCurrentFolderInRoot ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer"
									)}
									onClick={() => !isCurrentFolderInRoot && handleSelect(ROOT_VALUE)}>
									<Home className="size-4 shrink-0 text-muted-foreground" />
									<span className="text-sm font-medium">Inicio</span>
								</Label>
								<RadioGroupItem
									value={ROOT_VALUE}
									id="folder-root"
									className="shrink-0"
									disabled={isCurrentFolderInRoot}
								/>
							</div>
							{tree.map((node) => (
								<FolderTreeNodeItem
									key={node._id}
									node={node}
									selectedId={selectedId}
									onSelect={handleSelect}
									disabledIds={disabledFolderIds}
								/>
							))}
							{tree.length === 0 && (
								<p className="py-6 text-center text-sm text-muted-foreground">No hay otras carpetas disponibles.</p>
							)}
						</div>
					</ScrollArea>
				</RadioGroup>

				<DialogFooter className="pt-4">
					<Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isSubmitting}>
						Cancelar
					</Button>
					<Button onClick={handleSubmit} disabled={!selectedId || isSubmitting}>
						{isSubmitting ? "Moviendo..." : "Mover aquí"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

interface FolderTreeNodeItemProps {
	node: FolderTreeNode
	selectedId: string | null
	onSelect: (id: string) => void
	disabledIds?: Set<string>
	depth?: number
}

function FolderTreeNodeItem({
	node,
	selectedId,
	onSelect,
	disabledIds = new Set(),
	depth = 1
}: FolderTreeNodeItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const hasChildren = node.children.length > 0
	console.log(`Node`, node)
	const isSelected = selectedId === node._id
	const isDisabled = disabledIds.has(node._id)

	// Filtrar hijos que no están deshabilitados para mostrar
	const visibleChildren = node.children.filter((child) => !disabledIds.has(child._id))
	console.log(`visibleChildren`, visibleChildren)
	const hasVisibleChildren = visibleChildren.length > 0

	return (
		<div>
			<Collapsible open={isOpen} onOpenChange={setIsOpen}>
				<div
					className={cn(
						"group flex items-center gap-1 rounded-md py-1.5 pr-2 transition-colors",
						isDisabled
							? "cursor-not-allowed opacity-50"
							: isSelected
								? "bg-primary/10 text-foreground"
								: "hover:bg-muted text-foreground"
					)}
					style={{ paddingLeft: `${depth * 12 + 4}px` }}>
					{hasVisibleChildren ? (
						<CollapsibleTrigger asChild>
							<button
								type="button"
								className={cn(
									"flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors",
									isDisabled
										? "text-muted-foreground cursor-not-allowed hover:text-muted-foreground"
										: "text-muted-foreground hover:bg-accent hover:text-foreground"
								)}
								disabled={isDisabled}
								aria-label={isOpen ? `Cerrar ${node.name}` : `Abrir ${node.name}`}>
								<ChevronRight className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-90")} />
							</button>
						</CollapsibleTrigger>
					) : (
						<span className="w-7 shrink-0" />
					)}

					<Label
						htmlFor={`folder-${node._id}`}
						className={cn(
							"flex flex-1 items-center gap-2 transition-colors",
							isDisabled ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer"
						)}
						onClick={() => !isDisabled && onSelect(node._id)}>
						{isOpen && hasVisibleChildren ? (
							<FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
						) : (
							<Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
						)}
						<span className="truncate text-sm">{node.name}</span>
					</Label>

					<RadioGroupItem value={node._id} id={`folder-${node._id}`} className="shrink-0" disabled={isDisabled} />
				</div>

				{hasVisibleChildren && (
					<CollapsibleContent>
						{visibleChildren.map((child) => (
							<FolderTreeNodeItem
								key={child._id}
								node={child}
								selectedId={selectedId}
								onSelect={onSelect}
								disabledIds={disabledIds}
								depth={depth + 1}
							/>
						))}
					</CollapsibleContent>
				)}
			</Collapsible>
		</div>
	)
}
