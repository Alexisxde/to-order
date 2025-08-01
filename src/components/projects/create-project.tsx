"use client"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Input, Textarea } from "@/components/ui/input"
import { useProject } from "@/providers/project-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import Error from "../ui/error"
import { formSchemaProject } from "./schema"

interface Props {}

type FormData = z.infer<typeof formSchemaProject>

export default function CreateProject({}: Props) {
	const [isLoading, isSetLoading] = useState(false)
	const { createProject } = useProject()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(formSchemaProject) })

	const onSubmit: SubmitHandler<FormData> = async ({ name, description }) => {
		isSetLoading(true)
		try {
			createProject({
				name: name.trim(),
				description: description
					? `${description.trim()[0].toUpperCase()}${description.trim().slice(1)}`
					: ""
			})
			reset()
			isSetLoading(false)
		} catch (e) {
			console.error("⚠ Create Project - Error creating project: ", e)
			isSetLoading(false)
		}
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger variant={"outline"} size={"icon"}>
				<Plus />
			</AlertDialogTrigger>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Nuevo Proyecto</AlertDialogTitle>
						<AlertDialogDescription>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
							incidunt illo sit asperiores. Ex error repudiandae dolorem ipsam
							omnis deleniti!
						</AlertDialogDescription>
					</AlertDialogHeader>
					<form
						id="create-project"
						onSubmit={handleSubmit(onSubmit)}
						className="grid gap-3">
						<div className="grid w-full items-center gap-1.5">
							<Input
								className={errors?.name && "border-red-500"}
								{...register("name")}>
								Nombre
							</Input>
							{errors?.name && <Error message={errors?.name.message} />}
						</div>
						<div className="grid w-full items-center gap-1.5">
							<Textarea {...register("description")}>Descripción</Textarea>
						</div>
					</form>
					<AlertDialogFooter className="mt-3">
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction type="submit" form="create-project">
							{isLoading ? "Creando..." : "Crear"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
}
