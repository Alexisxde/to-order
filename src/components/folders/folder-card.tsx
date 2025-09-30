// import Button from "@/components/ui/button"
// import { DragDrawer, DragDrawerContent, DragDrawerTrigger } from "@/components/ui/drag-draw"
// import {
// 	DropDown,
// 	DropDownContainer,
// 	DropDownContent,
// 	DropDownOption,
// 	DropDownTrigger
// } from "@/components/ui/drop-down"
import { useFolder } from "@/hooks/useFolder"
import { useIsMobile } from "@/hooks/useIsMobile"
import { month } from "@/lib/utils"
import type { Folder } from "@/types"
import { FolderIcon } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

interface Props {
	folder: Folder
}

export default function FolderCard({ folder }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const isMobile = useIsMobile()
	const { history, setFolderId } = useFolder()
	const { _id, name, created_at } = folder

	return (
		<motion.div
			key={_id}
			initial={{ opacity: 0, y: 40, x: -20 }}
			animate={{ opacity: 1, y: 0, x: 0 }}
			className="border-border bg-card flex items-center justify-between gap-2 rounded-lg border px-4 py-2">
			<button onClick={() => setFolderId(_id)} className="flex-1 cursor-pointer">
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center gap-2">
						<FolderIcon className="size-5" />
						<div className="flex flex-col items-start gap-0.5">
							<span className="text-xs">{name}</span>
							<span className="text-[9px]">Creado {month(new Date(created_at))}</span>
						</div>
					</div>
				</div>
			</button>
			{/* { isMobile ? (
				<DragDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
					<DragDrawerTrigger asChild>
						<button className="flex cursor-pointer items-center gap-2 p-1">
							<EllipsisVerticalIcon className="size-4" />
						</button>
					</DragDrawerTrigger>
					<DragDrawerContent className="h-fit">
						<div className="mb-4 flex w-full flex-col items-start gap-1 px-2">
							<p className="text-primary text-xs">Carpeta: {name}</p>
							<p className="text-primary text-xs">
								Ubicación:{" "}
								{history.map((h, i) => (
									<>
										<span key={h._id} className="text-xs">
											{h.name}
										</span>
										{i < history.length - 1 && <span className="text-xs">/</span>}
									</>
								)) ?? "/root"}
							</p>
							<p className="text-primary text-xs">Creación: {month(new Date(created_at))}</p>
						</div>
						<div className="flex w-full flex-col items-center gap-2">
							<Button variant={"secondary"} className="w-full" size={"icon"}>
								<FolderSymlink className="stroke-icon-primary size-4" />
								Mover
							</Button>
							<Button variant={"secondary"} className="w-full" size={"icon"}>
								<Archive className="stroke-icon-primary size-4" />
								Archivar
							</Button>
							<Button variant={"secondary"} className="w-full" size={"icon"}>
								<EditIcon className="stroke-icon-primary size-4" />
								Renombrar
							</Button>
							<Button variant={"secondary"} className="w-full" size={"icon"}>
								<Trash2Icon className="stroke-icon-primary size-4" />
								Eliminar
							</Button>
						</div>
					</DragDrawerContent>
				</DragDrawer>
			) : (
				<DropDown>
					<DropDownContainer>
						<DropDownTrigger />
						<DropDownContent>
							<DropDownOption onClick={() => {}} Icon={FolderSymlink} text="Mover" />
							<DropDownOption onClick={() => {}} Icon={Archive} text="Archivar" />
							<DropDownOption onClick={() => {}} Icon={EditIcon} text="Renombrar" />
							<DropDownOption onClick={() => {}} Icon={Trash2Icon} text="Eliminar" />
						</DropDownContent>
					</DropDownContainer>
				</DropDown>
			)} */}
		</motion.div>
	)
}
