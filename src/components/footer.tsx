import { Badge } from "@/components/ui/badge"
import GitHubIcon from "@/icons/github"
import SparklesIcon from "@/icons/sparkles"

export default function Footer() {
	return (
		<footer className="sticky bottom-4 flex items-center justify-end space-x-2 px-4">
			<Badge
				variant="neutral"
				href="https://github.com/Alexisxde/toorder"
				target="_blank">
				<div className="flex items-center space-x-2">
					<GitHubIcon width={16} height={16} />
					<span>GitHub</span>
				</div>
			</Badge>
			<Badge variant="neutral" href="https://alexisxde.github.io">
				<div className="flex items-center space-x-2">
					<SparklesIcon width={16} height={16} />
					<span>Built by Alexis</span>
				</div>
			</Badge>
		</footer>
	)
}
