"use client"
import Button from "@/components/ui/button"
import { Modal, ModalClose, ModalContent, ModalHeader, ModalPortal } from "@/components/ui/modal"
import { useFolder, useFolderActions } from "@/hooks/useFolder"
import { cn } from "@/lib/utils"
import type { Folder } from "@/types"
import { FolderIcon, FolderOpenIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import React, { useState, type HTMLAttributes, type ReactNode } from "react"
// import { useFolderActions } from "@/hooks/useFolder"
import { moveFolderSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import Error from "../ui/error"
import { useToast } from "../ui/toast"

type FormData = z.infer<typeof moveFolderSchema>

type FolderTree = Folder & {
	children: Folder[]
}

export default function MoveFolder() {
	const { allFolders } = useFolder()
	const { isOpen, setIsOpen, folder } = useFolderActions()
	if (!allFolders || !Array.isArray(allFolders)) return
	const folderTree = buildFolderTree(allFolders)
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { isSubmitting, errors }
	} = useForm<FormData>({ resolver: zodResolver(moveFolderSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({ _id }) => {
		if (folder?._id === _id) toast.error({ text: `Error en hacer esa acción. ${_id}` })
		// Aca mandar la petición para mover
		reset()
		setIsOpen(false)
	}

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<ModalPortal>
				<ModalContent className="w-full max-w-md space-y-2">
					<ModalHeader>
						<h2 className="text-2xl font-medium">Mover la carpeta {folder?.name}</h2>
						<ModalClose />
					</ModalHeader>
					<form className="text-primary/75 flex flex-col gap-2 text-sm" onSubmit={handleSubmit(onSubmit)}>
						<div>{renderFolderTree(folderTree, register)}</div>
						{errors._id && <Error message={errors._id.message} />}
						<div className="flex items-center gap-2">
							<Button type="button" variant={"ghost"} size={"lg"} className="flex-1" onClick={() => setIsOpen(false)}>
								Cancelar
							</Button>
							<Button type="submit" size={"lg"} className="flex-1" disabled={isSubmitting}>
								Mover
							</Button>
						</div>
					</form>
				</ModalContent>
			</ModalPortal>
		</Modal>
	)
}

function buildFolderTree(folders: Folder[], parentId: string | null = null): FolderTree[] {
	return folders
		.filter(folder => folder.id_root === parentId)
		.map(folder => ({
			...folder,
			children: buildFolderTree(folders, folder._id)
		}))
}

function renderFolderTree(folders: FolderTree[], register: ReturnType<typeof useForm>["register"]) {
	return folders.map(folder => (
		<Tree
			key={folder._id}
			contentTree={folder.name}
			name={folder.name}
			value={folder._id}
			defaultCollapsed={true}
			disabledIcon={folder.children.length > 0}
			register={register}>
			{folder.children && folder.children.length > 0 && renderFolderTree(folder.children, register)}
		</Tree>
	))
}

type TreeProps = {
	contentTree: ReactNode
	children?: ReactNode
	defaultCollapsed?: boolean
	depth?: number
	disabledIcon?: boolean
	name: string
	value: string
	register: ReturnType<typeof useForm>["register"]
} & HTMLAttributes<HTMLDivElement>

const Tree = ({
	className,
	contentTree,
	children,
	defaultCollapsed = false,
	depth = 0,
	disabledIcon = false,
	register,
	name,
	value,
	...rest
}: TreeProps) => {
	const [collapsed, setCollapsed] = useState(defaultCollapsed)
	const hasChildren = React.Children.count(children) > 0
	const toggleCollapse = () => {
		if (hasChildren && disabledIcon) {
			setCollapsed(!collapsed)
		}
	}

	return (
		<div {...rest} className={cn("cursor-pointer select-none", className)}>
			<div
				onClick={toggleCollapse}
				className={cn(
					"group relative flex min-h-8 w-full items-center gap-2",
					"before:border-muted before:bg-muted before:absolute before:inset-0 before:scale-75 before:rounded-md before:border before:opacity-0 before:transition",
					"hover:before:scale-100 hover:before:opacity-100"
				)}
				style={{ paddingLeft: `${depth * 1}rem` }}>
				{collapsed ? (
					<FolderIcon className="text-icon-primary ml-4 size-5 transform-gpu duration-300" />
				) : (
					<FolderOpenIcon className="text-icon-primary ml-4 size-5 transform-gpu duration-300" />
				)}
				<span className="text-primary transform-gpu text-sm font-medium tracking-tight transition-transform group-hover:translate-x-0.5">
					{contentTree}
				</span>
				<label className="z-10 ml-auto flex cursor-pointer items-center justify-center px-4 py-2">
					<input type="hidden" {...register("tree")} value={name} className="size-full cursor-pointer" />
					<input type="radio" {...register("_id")} value={value} className="size-full cursor-pointer" />
				</label>
			</div>
			{hasChildren && (
				<AnimatePresence initial={false}>
					<motion.div
						animate={{
							height: collapsed ? 0 : "auto",
							opacity: 1,
							translateY: 0,
							translateX: 0
						}}
						className="overflow-hidden"
						exit={{
							height: 0,
							opacity: 0,
							translateY: -10,
							translateX: -10
						}}
						initial={{
							height: 0,
							opacity: 0,
							translateY: -10,
							translateX: -10
						}}
						transition={{ duration: 0.2 }}>
						{React.Children.map(children, child => {
							return React.isValidElement<TreeProps>(child)
								? React.cloneElement<TreeProps>(child, { depth: depth + 1 })
								: child
						})}
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	)
}
