import { UserAppMetadata } from "@supabase/supabase-js"

interface Props {
	user: UserAppMetadata | null
}

export default function Header({ user }: Props) {
	return (
		<header className="bg-background border-muted sticky top-0 z-20 flex items-center justify-between border-b px-6 py-4">
			<div className="text-xs">
				<span className="">ToOrder</span>
			</div>
			<div className="size-7 rounded-full">
				<img
					className="size-full rounded-full object-cover"
					src={user?.avatar_url}
					alt={user?.username}
				/>
			</div>
		</header>
	)
}
