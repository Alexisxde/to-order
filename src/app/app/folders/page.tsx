"use client"
import NoteCard from "@/components/mobile/note-card"
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
import { Fragment, useEffect, useState } from "react"

export default function FoldersPage() {
	const [grid, setGrid] = useState(true)
	const [_id, setId] = useState<string | null>(null)
	const { history, folders, notes, getFolderId } = useFolder()

	useEffect(() => {
		getFolderId(_id)
	}, [_id])

	useEffect(() => {}, [grid])

	return (
		<main className="flex w-full flex-col gap-2 p-4">
			<header className="flex items-center justify-between px-2">
				<div className="flex items-center">
					{history.map((h, i) => (
						<Fragment key={h._id}>
							<Button
								variant={"link"}
								className="text-xs"
								onClick={() => setId(h._id)}>
								{h.name}
							</Button>
							{i < history.length - 1 && <span className="text-xs">/</span>}
						</Fragment>
					))}
				</div>
				<div className="flex items-center justify-center gap-2">
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => setGrid(false)}
						className={`${!grid && "bg-card"}`}>
						<Rows3Icon className="size-5" />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						onClick={() => setGrid(true)}
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
				{folders?.length === 0 && <div>No hay nada :c</div>}
				{folders?.map(({ _id, name, created_at }) => (
					<motion.div
						key={_id}
						initial={{ opacity: 0, y: 40, x: -20 }}
						animate={{ opacity: 1, y: 0, x: 0 }}
						className="border-border bg-card flex items-center justify-between gap-2 rounded-lg border px-4 py-2">
						<button
							onClick={() => setId(_id)}
							className="flex-1 cursor-pointer">
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
						</button>
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
				{notes?.map(note => (
					<NoteCard key={note._id} note={note} />
				))}
			</section>
		</main>
	)
}
