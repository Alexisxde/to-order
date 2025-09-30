import {
	DropDown,
	DropDownContainer,
	DropDownContent,
	DropDownOption,
	DropDownTrigger
} from "@/components/ui/drop-down"
import { useFolder } from "@/hooks/useFolder"
import { month } from "@/lib/utils"
import type { Folder } from "@/types"
import { Archive, EditIcon, FolderIcon, FolderSymlink, Trash2Icon } from "lucide-react"
import { motion } from "motion/react"

interface Props {
	folder: Folder
	setIsOpenDelete: React.Dispatch<React.SetStateAction<boolean>>
	setDeleteFolderId: React.Dispatch<React.SetStateAction<string | null>>
}

export default function FolderCard({ folder, setIsOpenDelete, setDeleteFolderId }: Props) {
	const { setFolderId } = useFolder()
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
			<DropDown>
				<DropDownContainer>
					<DropDownTrigger />
					<DropDownContent>
						<DropDownOption onClick={() => alert("Próximamente")} Icon={FolderSymlink} text="Mover" />
						<DropDownOption onClick={() => alert("Próximamente")} Icon={Archive} text="Archivar" />
						<DropDownOption onClick={() => alert("Próximamente")} Icon={EditIcon} text="Renombrar" />
						<DropDownOption
							onClick={() => {
								setDeleteFolderId(_id)
								setIsOpenDelete(true)
							}}
							Icon={Trash2Icon}
							text="Eliminar"
						/>
					</DropDownContent>
				</DropDownContainer>
			</DropDown>
		</motion.div>
	)
}
