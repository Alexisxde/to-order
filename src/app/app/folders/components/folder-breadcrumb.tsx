"use client"
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import { ArrowLeft, Folder, FolderOpen } from "lucide-react"
import { useFolders } from "./hooks/use-folders"

export default function FolderHeader() {
	const isMobile = useIsMobile()
	const { folderId, history, changeFolder, backFolder } = useFolders()
	const displayFolders = history.length > 3 ? history.slice(-1) : history.slice(1)

	return (
		<nav className="flex items-center gap-2">
			{isMobile && history.length > 1 && (
				<Button variant="ghost" size="icon" onClick={backFolder}>
					<ArrowLeft className="size-4" />
				</Button>
			)}
			<Breadcrumb>
				<BreadcrumbList>
					{history[0]._id === folderId ? (
						<span className="text-primary">{history[0].name}</span>
					) : (
						<>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<button type="button" className="flex items-center gap-1" onClick={() => changeFolder(history[0])}>
										<Folder className="size-4" />
										{history[0].name}
									</button>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</>
					)}
					{history.length > 3 && (
						<>
							<BreadcrumbItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="icon-sm" variant="ghost">
											<BreadcrumbEllipsis />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										<DropdownMenuGroup>
											{history.slice(1, -1).map((folder) => (
												<DropdownMenuItem
													className="flex items-center gap-1"
													key={folder._id}
													onClick={() => changeFolder(folder)}>
													<Folder className="size-4" />
													{folder.name}
												</DropdownMenuItem>
											))}
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
						</>
					)}
					{displayFolders.map((folder, index) => (
						<div key={folder._id}>
							{index === displayFolders.length - 1 ? (
								<BreadcrumbItem>
									<BreadcrumbPage className="flex items-center gap-1">
										<FolderOpen className="size-4" />
										{folder.name}
									</BreadcrumbPage>
								</BreadcrumbItem>
							) : (
								<>
									<BreadcrumbItem>
										<BreadcrumbLink asChild>
											<button type="button" className="flex items-center gap-1" onClick={() => changeFolder(folder)}>
												<Folder className="size-4" />
												{folder.name}
											</button>
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
								</>
							)}
						</div>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</nav>
	)
}
