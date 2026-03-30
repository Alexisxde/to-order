"use client"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Clock, ExternalLink, MapPin } from "lucide-react"
import type { Time } from "../time.type"

interface TimeCardProps {
	time: Time
	onEdit: (time: Time) => void
}

const typeConfig = {
	Teoría: "bg-blue-500/10 text-blue-500 border-blue-500/20",
	Laboratorio: "bg-purple-500/10 text-purple-500 border-purple-500/20",
	Práctica: "bg-green-500/10 text-green-500 border-green-500/20",
	Tutoria: "bg-orange-500/10 text-orange-500 border-orange-500/20"
}

export function TimeCard({ time, onEdit }: TimeCardProps) {
	return (
		<TooltipProvider delayDuration={400}>
			<div
				onClick={() => onEdit(time)}
				className="relative flex flex-col gap-2 p-3 rounded-xl border border-border/50 bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-sm cursor-pointer"
				style={{ borderLeft: `4px solid ${time.color}` }}>
				<div className="flex items-start justify-between gap-2">
					<Badge
						variant="outline"
						className={cn("text-[10px] h-4.5 px-1.5 py-0 font-medium tracking-wider", typeConfig[time.type])}>
						{time.type}
					</Badge>

					<div className="flex items-center gap-1">
						{time.url && (
							<Tooltip>
								<TooltipTrigger asChild>
									<a
										href={time.url}
										target="_blank"
										rel="noopener noreferrer"
										onClick={(e) => e.stopPropagation()}
										className="p-1 rounded-md hover:bg-primary/10 text-primary transition-colors">
										<ExternalLink className="h-3 w-3" />
									</a>
								</TooltipTrigger>
								<TooltipContent>
									<p className="text-xs">Unirse a clase</p>
								</TooltipContent>
							</Tooltip>
						)}
					</div>
				</div>

				<div className="space-y-1.5">
					<h4 className="text-sm font-semibold text-foreground leading-tight line-clamp-2 min-h-[1.25rem]">
						{time.subject}
					</h4>

					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1.5 text-muted-foreground/70">
							<Clock className="size-3 shrink-0" />
							<span className="text-[11px] tracking-tight line-clamp-2">
								{time.time_start} - {time.time_end}
							</span>
						</div>

						{time.description && (
							<div className="flex items-center gap-1.5 text-muted-foreground/70">
								<MapPin className="size-3 shrink-0" />
								<p className="text-[11px] leading-tight line-clamp-2">{time.description}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</TooltipProvider>
	)
}
