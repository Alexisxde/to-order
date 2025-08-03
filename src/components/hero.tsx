import SignInButton from "@/components/button-sign-in"
import { createClientForServer } from "@/supabase/server"
import { ArrowRight } from "lucide-react"
import Button from "./ui/button"

export default async function Hero() {
	const supabase = await createClientForServer()
	const { data } = await supabase.auth.getUser()
	const { user } = data

	return (
		<section className="relative mx-auto flex w-full max-w-3xl flex-col items-center p-10 pt-24">
			<h1 className="text-center text-4xl font-medium text-neutral-900 sm:text-6xl dark:text-neutral-100">
				Manage your tasks simply and efficiently
			</h1>
			<p className="mt-6 text-center text-xs leading-6 text-neutral-500 md:text-sm dark:text-neutral-300">
				Organize your tasks intuitively with our task management. Drag and drop
				to move tasks between lists, set priorities, and keep everything under
				control.
			</p>
			<div className="mt-4">
				{user ? (
					<Button href="/app">
						Get Started
						<ArrowRight />
					</Button>
				) : (
					<SignInButton />
				)}
			</div>
		</section>
	)
}
