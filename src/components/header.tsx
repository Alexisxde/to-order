import { User } from "@supabase/supabase-js"

interface Props {
	user: User
}

export default function Header({ user }: Props) {
	return (
		<header className="bg-background border-muted sticky top-0 z-20 flex h-12 items-center justify-between border-b px-6 py-4">
			<div className="text-xs">
				<span className="">ToOrder</span>
			</div>
			<div className="size-7 rounded-full">
				<img
					className="size-full rounded-full object-cover"
					src={user.user_metadata.avatar_url}
					alt={user.user_metadata.username}
				/>
			</div>
		</header>
	)
}
