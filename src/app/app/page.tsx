"use client"
import Button from "@/components/ui/button"
import { filterItems } from "@/lib/utils"
import { useProject } from "@/providers/project-provider"
import { Project } from "@/types"
import { useEffect, useState } from "react"

export default function ProjectsPage() {
	const { projects } = useProject()
	const [searchQuery, setSearchQuery] = useState("")

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		if (searchQuery) params.set("q", searchQuery)
		else params.delete("q")
		const nuevaURL = `${window.location.pathname}?${params.toString()}`
		window.history.replaceState(null, "", nuevaURL)
	}, [searchQuery])

	if (!projects) return null

	const filteredProjects = filterItems<Project>(searchQuery, projects)
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	return (
		<section className="flex flex-col p-4 md:p-6">
			<div className="mb-2 flex items-center gap-2">
				<Button>Click me</Button>
				<Button variant={"secondary"}>Click me</Button>
				<Button variant={"ghost"}>Click me</Button>
				<Button variant={"outline"}>Click me</Button>
				<Button variant={"destructive"}>Click me</Button>
			</div>
		</section>
	)
}
