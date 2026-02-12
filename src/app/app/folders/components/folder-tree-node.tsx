"use client"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import type { FolderTreeNode } from "@/module/folders/folder.type"
import { ChevronRight, Folder, FolderOpen } from "lucide-react"
import { useState } from "react"

interface FolderTreeNodeItemProps {
	node: FolderTreeNode
	selectedId: string | null
	onSelect: (id: string) => void
	disabledIds?: Set<string>
	depth?: number
}

export function FolderTreeNodeItem({
	node,
	selectedId,
	onSelect,
	disabledIds = new Set(),
	depth = 1
}: FolderTreeNodeItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const hasChildren = node.children.length > 0
	const isSelected = selectedId === node._id
	const isDisabled = disabledIds.has(node._id)

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<div
				className={cn(
					"group flex items-center gap-1 rounded-md pr-2 transition-colors",
					isDisabled
						? "cursor-not-allowed opacity-50"
						: isSelected
							? "bg-primary/10 text-foreground"
							: "hover:bg-muted text-foreground"
				)}
				style={{ paddingLeft: `${depth * 12 + 4}px` }}>
				{hasChildren ? (
					<CollapsibleTrigger asChild>
						<button
							type="button"
							className={cn(
								"flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors",
								isDisabled
									? "text-muted-foreground cursor-not-allowed hover:text-muted-foreground"
									: "text-muted-foreground hover:text-foreground"
							)}
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
						"flex flex-1 items-center gap-2 py-1.5 transition-colors",
						isDisabled ? "cursor-not-allowed text-muted-foreground" : "cursor-pointer"
					)}
					onClick={() => !isDisabled && onSelect(node._id)}>
					{isOpen && hasChildren ? (
						<FolderOpen
							className={cn("h-4 w-4 shrink-0", isDisabled ? "text-muted-foreground" : "text-muted-foreground")}
						/>
					) : (
						<Folder
							className={cn("h-4 w-4 shrink-0", isDisabled ? "text-muted-foreground" : "text-muted-foreground")}
						/>
					)}
					<span className="truncate text-sm">{node.name}</span>
				</Label>

				<RadioGroupItem value={node._id} id={`folder-${node._id}`} className="shrink-0" disabled={isDisabled} />
			</div>

			{hasChildren && (
				<CollapsibleContent>
					{node.children.map((child) => (
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
	)
}
