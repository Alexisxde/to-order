"use client"
import Button from "@/components/ui/button"
import { DragDrawer, DragDrawerContent, DragDrawerTrigger } from "@/components/ui/drag-draw"
import Error from "@/components/ui/error"
import { Modal, ModalClose, ModalContent, ModalHeader, ModalPortal } from "@/components/ui/modal"
import { useFolder } from "@/hooks/useFolder"
import { useIsMobile } from "@/hooks/useIsMobile"
import { createFolderSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Folder } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type FormData = z.infer<typeof createFolderSchema>

export function CreateFolder({ isOpen: initialIsOpen }: { isOpen: boolean }) {
	const [isOpen, setIsOpen] = useState(false)
	const isMobile = useIsMobile()
	const { folderId, createFolder } = useFolder()
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors }
	} = useForm<FormData>({ resolver: zodResolver(createFolderSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({ name }) => {
		await createFolder(folderId, {
			name: `${name.trim()[0].toUpperCase()}${name.trim().slice(1)}`
		})
		reset()
		setIsOpen(false)
	}

	return (
		<AnimatePresence>
			{initialIsOpen && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 10, transition: { delay: 0.05 } }}
					transition={{ delay: 0.05 }}>
					{isMobile ? (
						<DragDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
							<DragDrawerTrigger asChild>
								<Button variant={"secondary"} className="size-10 rounded-full" size={"icon"}>
									<Folder className="size-5" />
								</Button>
							</DragDrawerTrigger>
							<DragDrawerContent>
								<h2 className="mb-4 text-xl font-medium">Nueva Carpeta</h2>
								<form className="text-primary/75 flex flex-col gap-2 text-sm" onSubmit={handleSubmit(onSubmit)}>
									<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
										<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
											Nombre <b className="text-destructive">*</b>
										</span>
										<Folder className="size-5" />
										<input
											type="text"
											className="size-full px-3 py-1.5 focus:outline-none"
											placeholder="Añadir nombre"
											{...register("name")}
										/>
									</label>
									{errors.name && <Error message={errors.name.message} />}
									<div className="flex items-center gap-2">
										<Button
											type="button"
											variant={"ghost"}
											size={"lg"}
											className="flex-1"
											onClick={() => setIsOpen(false)}
											disabled={isSubmitting}>
											Cancelar
										</Button>
										<Button type="submit" size={"lg"} className="flex-1" disabled={isSubmitting}>
											{isSubmitting ? "Guardando..." : "Guardar"}
										</Button>
									</div>
								</form>
							</DragDrawerContent>
						</DragDrawer>
					) : (
						<>
							<Button
								variant={"secondary"}
								className="size-10 rounded-full"
								size={"icon"}
								onClick={() => setIsOpen(true)}>
								<Folder className="size-5" />
							</Button>
							<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
								<ModalPortal>
									<ModalContent className="w-full max-w-xs space-y-2">
										<ModalHeader>
											<h2 className="mb-4 text-xl font-medium">Nueva Carpeta</h2>
											<ModalClose />
										</ModalHeader>
										<form className="text-primary/75 flex flex-col gap-2 text-sm" onSubmit={handleSubmit(onSubmit)}>
											<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
												<span className="bg-background pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
													Nombre <b className="text-destructive">*</b>
												</span>
												<Folder className="size-5" />
												<input
													type="text"
													className="size-full px-3 py-1.5 focus:outline-none"
													placeholder="Añadir nombre"
													{...register("name")}
												/>
											</label>
											{errors.name && <Error message={errors.name.message} />}
											<div className="flex items-center gap-2">
												<Button
													type="button"
													variant={"ghost"}
													size={"lg"}
													className="flex-1"
													onClick={() => setIsOpen(false)}>
													Cancelar
												</Button>
												<Button type="submit" size={"lg"} className="flex-1" disabled={isSubmitting}>
													{isSubmitting ? "Guardando..." : "Guardar"}
												</Button>
											</div>
										</form>
									</ModalContent>
								</ModalPortal>
							</Modal>
						</>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
