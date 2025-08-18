import { Badge } from "@/components/ui/badge"
import GitHubIcon from "@/icons/github"
import SparklesIcon from "@/icons/sparkles"

export default function Footer() {
	return (
		<footer className="fixed right-7 bottom-5 hidden space-x-2 px-4 md:flex">
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
