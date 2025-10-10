import {
	DropDown,
	DropDownContainer,
	DropDownContent,
	DropDownOption,
	DropDownTrigger
} from "@/components/ui/drop-down"
import { useFolder, useFolderActions } from "@/hooks/useFolder"
import { month } from "@/lib/utils"
import type { Folder } from "@/types"
import { Archive, EditIcon, FolderIcon, FolderOpen, FolderSymlink, Trash2Icon } from "lucide-react"
import { motion } from "motion/react"

interface Props {
	folder: Folder
}

export default function FolderCard({ folder }: Props) {
	const { _id, name, created_at } = folder
	const { setFolderId } = useFolder()
	const { handleSetActionType } = useFolderActions()

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
						<DropDownOption onClick={() => setFolderId(_id)} Icon={FolderOpen} text="Abrir" />
						<DropDownOption onClick={() => {}} Icon={Archive} text="Archivar" />
						<DropDownOption onClick={() => handleSetActionType("move", folder)} Icon={FolderSymlink} text="Mover" />
						<DropDownOption onClick={() => handleSetActionType("rename", folder)} Icon={EditIcon} text="Renombrar" />
						<hr className="border-border border-t" />
						<DropDownOption onClick={() => handleSetActionType("delete", folder)} Icon={Trash2Icon} text="Eliminar" />
					</DropDownContent>
				</DropDownContainer>
			</DropDown>
		</motion.div>
	)
}
