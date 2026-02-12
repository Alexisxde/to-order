import SignInButton from "@/components/shared/button-sign-in"
import Text from "@/components/shared/text"
import { Button } from "@/components/ui/button"
import { createClientForServer } from "@/supabase/server"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function Hero() {
	const supabase = await createClientForServer()
	const { data } = await supabase.auth.getUser()
	const { user } = data

	return (
		<section className="flex h-dvh flex-col gap-4 p-4">
			<div
				className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl"
				style={{
					backgroundImage: `
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(to right, var(--border) 1px, var(--background) 1px)
    `,
					backgroundSize: "20px 20px"
				}}>
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background: "radial-gradient(50% 50% at 50% 50%, transparent 20%, var(--card) 100%)"
					}}
				/>
				<Text label="OrganZi" />
				{user ? (
					<Button asChild className="hover:scale-105">
						<Link href="/app" className="flex items-center gap-2">
							Comenzar
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				) : (
					<SignInButton />
				)}
			</div>
		</section>
	)
}
