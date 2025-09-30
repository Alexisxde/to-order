"use client"
import { Modal, ModalAction, ModalClose, ModalContent, ModalHeader, ModalPortal } from "@/components/ui/modal"
import { useFolder } from "@/hooks/useFolder"

interface Props {
	idFolderDelete: string | null
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteFolder({ idFolderDelete, isOpen, setIsOpen }: Props) {
	if (!idFolderDelete) return
	const { deleteFolder } = useFolder()
	const handleDelete = async (id: string) => await deleteFolder(id)

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalPortal>
				<ModalContent className="w-full max-w-xs space-y-2">
					<ModalHeader>
						<h2 className="text-2xl font-medium">¿Estás seguro?</h2>
						<ModalClose />
					</ModalHeader>
					<div className="flex flex-col gap-2">
						<p className="text-primary/70 text-xs">¿Quieres eliminar esta carpeta? Esta acción no se puede deshacer.</p>
						<div className="flex items-center justify-end gap-2">
							<ModalClose variant={"outline"} size="default" className="rounded-md">
								Cancelar
							</ModalClose>
							<ModalAction onClick={() => idFolderDelete && handleDelete(idFolderDelete)}>Confirmar</ModalAction>
						</div>
					</div>
				</ModalContent>
			</ModalPortal>
		</Modal>
	)
}
