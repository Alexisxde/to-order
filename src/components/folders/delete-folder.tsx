"use client"
import { Modal, ModalAction, ModalClose, ModalContent, ModalHeader, ModalPortal } from "@/components/ui/modal"
import { useFolderActions } from "@/hooks/useFolder"

export default function DeleteFolder() {
	const { handleDeleteFolder, isOpen, setIsOpen } = useFolderActions()

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
							<ModalAction onClick={handleDeleteFolder}>Confirmar</ModalAction>
						</div>
					</div>
				</ModalContent>
			</ModalPortal>
		</Modal>
	)
}
