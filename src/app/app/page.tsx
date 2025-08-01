"use client"
import CreateProject from "@/components/projects/create-project"
import { Input } from "@/components/ui/input"
import { filterItems } from "@/lib/utils"
import { useProject } from "@/providers/project-provider"
import { Project } from "@/types"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ProjectsPage() {
	const { projects, createProject } = useProject()
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
		<>
			<section className="flex flex-col p-4 md:p-6">
				<div className="mb-2 flex items-center justify-between gap-2">
					<h2 className="mb-2 text-xl">Inicio</h2>
					<div className="flex items-center gap-2">
						<Input
							type="text"
							autoComplete="off"
							value={searchQuery}
							onChange={handleSearchChange}>
							Buscar
						</Input>
						<CreateProject />
					</div>
				</div>
			</section>
			{filteredProjects.length === 0 ? (
				<section className="flex h-50 items-center justify-center">
					<p className="text-neutral-500 dark:text-neutral-400">
						No projects found.
					</p>
				</section>
			) : (
				<section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 px-4 md:px-6">
					{filteredProjects.map(
						({ _id, name, description }: Project, i: number) => (
							<Link
								prefetch
								key={_id}
								className="animate-fade-in group border-muted hover:bg-foreground relative flex aspect-video flex-col gap-2 rounded-lg border p-4 transition-colors duration-150 ease-in-out"
								href={`/app/${_id}`}
								style={{ animationDelay: `calc(0.1s * ${i + 1}` }}>
								<div className="flex w-full flex-col">
									<h3 className="mb-1 flex-shrink pr-4 text-sm">{name}</h3>
									<p className="text-xs opacity-75">{description}</p>
								</div>
								<div className="absolute top-4 right-4 opacity-50 transition-all duration-200 ease-in-out group-hover:right-3 group-hover:opacity-100">
									<ChevronRight />
								</div>
							</Link>
						)
					)}
				</section>
			)}
		</>
	)
}
