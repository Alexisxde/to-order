import { Badge } from "@/components/ui/badge"
import GitHubIcon from "@/icons/github"
import SparklesIcon from "@/icons/sparkles"

export default function Footer() {
	return (
		<footer className="sticky bottom-4 flex items-center justify-end space-x-2 px-4">
			<a href="https://github.com/Alexisxde/toorder" target="_blank">
				<Badge variant="neutral">
					<div className="flex items-center space-x-2">
						<GitHubIcon width={16} height={16} />
						<span>GitHub</span>
					</div>
				</Badge>
			</a>
			<a href="https://alexisxde.github.io" target="_blank">
				<Badge variant="neutral">
					<div className="flex items-center space-x-2">
						<SparklesIcon width={16} height={16} />
						<span>Built by Alexis</span>
					</div>
				</Badge>
			</a>
		</footer>
	)
}
