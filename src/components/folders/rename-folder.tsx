"use client"
import Button from "@/components/ui/button"
import Error from "@/components/ui/error"
import { Modal, ModalClose, ModalContent, ModalHeader, ModalPortal } from "@/components/ui/modal"
import { useFolderActions } from "@/hooks/useFolder"
import { createFolderSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Folder } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type FormData = z.infer<typeof createFolderSchema>

export default function RenameFolder() {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { isSubmitting, errors }
	} = useForm<FormData>({ resolver: zodResolver(createFolderSchema) })
	const { isOpen, setIsOpen, folder, handleRenameFolder } = useFolderActions()

	const onSubmit: SubmitHandler<FormData> = async ({ name }) => {
		await handleRenameFolder(name)
		reset()
		setIsOpen(false)
	}

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalPortal>
				<ModalContent className="w-full max-w-xs space-y-2">
					<ModalHeader>
						<h2 className="mb-4 text-xl font-medium">Editar Nombre</h2>
						<ModalClose />
					</ModalHeader>
					<form className="text-primary/75 flex flex-col gap-2 text-sm" onSubmit={handleSubmit(onSubmit)}>
						<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
							<span className="bg-background pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
								Nombre <b className="text-destructive">*</b>
							</span>
							<Folder className="size-5" />
							<input
								defaultValue={folder?.name}
								type="text"
								className="size-full px-3 py-1.5 focus:outline-none"
								placeholder="Añadir nombre"
								{...register("name")}
							/>
						</label>
						{errors.name && <Error message={errors.name.message} />}
						<div className="flex items-center gap-2">
							<Button type="button" variant={"ghost"} size={"lg"} className="flex-1" onClick={() => setIsOpen(false)}>
								Cancelar
							</Button>
							<Button
								type="submit"
								size={"lg"}
								className="flex-1"
								disabled={isSubmitting && folder?.name !== watch("name")}>
								{isSubmitting && folder?.name !== watch("name") ? "Guardando..." : "Guardar"}
							</Button>
						</div>
					</form>
				</ModalContent>
			</ModalPortal>
		</Modal>
	)
}
