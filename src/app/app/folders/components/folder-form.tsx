"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createFolderSchema } from "@/lib/schema"
import type { Folder } from "@/module/folders/folder.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import type { z } from "zod"

type FolderFormData = z.infer<typeof createFolderSchema>

interface Props {
	folder?: Folder
	onSubmit: SubmitHandler<FolderFormData>
	onCancel: () => void
	submitText: string
}

export function FolderForm({ folder, onSubmit, onCancel, submitText }: Props) {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<FolderFormData>({
		resolver: zodResolver(createFolderSchema),
		defaultValues: {
			name: folder?.name || ""
		}
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<Field>
				<FieldLabel htmlFor="name">Nombre de la carpeta</FieldLabel>
				<FieldContent>
					<Controller
						name="name"
						control={control}
						render={({ field }) => <Input {...field} id="name" placeholder="Añadir nombre" className="pl-10" />}
					/>
				</FieldContent>
				<FieldError errors={[errors.name]} />
			</Field>
			<div className="flex gap-2">
				<Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="flex-1">
					Cancelar
				</Button>
				<Button type="submit" disabled={isSubmitting} className="flex-1">
					{isSubmitting ? "Guardando..." : submitText}
				</Button>
			</div>
		</form>
	)
}
