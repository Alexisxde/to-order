"use client"
import { createClient } from "@/supabase/client"
import type { Project } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

export type ProjectContextType = {
	projects: Project[]
	createProject: ({
		name,
		description
	}: {
		name: string
		description: string
	}) => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | null>(null)

export const ProjectProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const supabase = createClient()
	const [projects, setProjects] = useState<Project[] | []>([])

	const getProjects = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()
		const { data } = await supabase
			.from("projects")
			.select()
			.eq("user_id", user?.id)
		setProjects(data as Project[])
	}

	const createProject = async ({
		name,
		description
	}: {
		name: string
		description: string
	}) => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()
			const { data } = await supabase
				.from("projects")
				.insert({ name, description, user_id: user?.id })
				.select()
			console.log(data)
			if (!data) throw new Error("Error creating project")
			setProjects(prev => [data[0], ...prev!])
		} catch (error) {
			setProjects(prev => prev)
			console.error("Error updating project:", error)
		}
	}

	useEffect(() => {
		getProjects()
	}, [])

	return (
		<ProjectContext.Provider value={{ projects, createProject }}>
			{children}
		</ProjectContext.Provider>
	)
}

export const useProject = () => {
	const context = useContext(ProjectContext)
	if (!context)
		throw new Error("useProject must be used within a ProjectProvider")
	return context
}
