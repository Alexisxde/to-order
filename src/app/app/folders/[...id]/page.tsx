"use client"
import Button from "@/components/ui/button"
import {
	DropDown,
	DropDownContainer,
	DropDownContent,
	DropDownOption,
	DropDownTrigger
} from "@/components/ui/drop-down"
import { month } from "@/lib/utils"
import { useFolder } from "@/providers/folder-provider"
import {
	Columns3Icon,
	EditIcon,
	FolderIcon,
	Rows3Icon,
	Trash2Icon
} from "lucide-react"
import { motion } from "motion/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type Note = {
	_id: string
	name: string
	content: string
	created_at: string
	update_at: string
}

export default function FolderId() {
	const { id } = useParams()
	const [grid, setGrid] = useState(true)
	const { folders, getFolders } = useFolder()

	useEffect(() => {
		getFolders(id?.[id?.length - 1] ?? null)
	}, [])

	useEffect(() => {}, [grid])

	return (
		<main className="flex w-full flex-col gap-2 p-4">
			<header className="flex items-center justify-between px-2">
				<span className="text-xs">Carpetas</span>
				<div className="flex items-center justify-center gap-2">
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => setGrid(prev => !prev)}
						className={`${!grid && "bg-card"}`}>
						<Rows3Icon className="size-5" />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => setGrid(prev => !prev)}
						className={`${grid && "bg-card"}`}>
						<Columns3Icon className="size-5" />
					</Button>
				</div>
			</header>
			<section
				className={
					grid
						? "grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4"
						: "grid grid-cols-1 gap-2"
				}>
				{folders.length === 0 && <h1>No hay más Carpetas</h1>}
				{folders.map(({ _id, name, created_at }) => (
					<motion.div
						key={_id}
						layoutId={_id}
						className="border-border bg-card flex items-center justify-between gap-2 rounded-lg border px-4 py-2">
						<a href={`${id}/${_id}`} className="flex-1 cursor-pointer">
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center gap-2">
									<FolderIcon className="size-5" />
									<div className="flex flex-col items-start gap-0.5">
										<span className="text-xs">{name}</span>
										<span className="text-[9px]">
											Creado {month(new Date(created_at))}
										</span>
									</div>
								</div>
							</div>
						</a>
						<DropDown>
							<DropDownContainer>
								<DropDownTrigger />
								<DropDownContent>
									<DropDownOption
										onClick={() => {}}
										Icon={EditIcon}
										text="Editar"
									/>
									<DropDownOption
										onClick={() => {}}
										Icon={Trash2Icon}
										text="Eliminar"
									/>
								</DropDownContent>
							</DropDownContainer>
						</DropDown>
					</motion.div>
				))}
			</section>
		</main>
	)
}
