import SignInButton from "@/components/button-sign-in"
import { createClientForServer } from "@/supabase/server"
import { ArrowRight } from "lucide-react"
import Text from "./text"
import Button from "./ui/button"

export default async function Hero() {
	const supabase = await createClientForServer()
	const { data } = await supabase.auth.getUser()
	const { user } = data

	return (
		<section
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
					background:
						"radial-gradient(50% 50% at 50% 50%, transparent 20%, var(--card) 100%)"
				}}
			/>
			<Text label="Yalo" />
			<p className="text-primary/80 z-2 mb-4 w-full max-w-xs text-center text-sm lg:max-w-lg lg:text-base">
				Tu espacio para notas, lista de tareas, siempre accesible en todos tus
				dispositivos
			</p>
			{user ? (
				<Button href="/app" className="hover:scale-105">
					Comenzar
					<ArrowRight className="size-4" />
				</Button>
			) : (
				<SignInButton />
			)}
		</section>
	)
}
