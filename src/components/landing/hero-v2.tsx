"use client"

import { Button } from "@/components/ui/button"
import type { User } from "@supabase/supabase-js"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import SocialAuthButtons from "./social-auth-buttons"

interface HeroV2Props {
	user: User | null
}

export default function HeroV2({ user }: HeroV2Props) {
	return (
		<section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
			<div
				className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
				style={{
					backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
					backgroundSize: "40px 40px"
				}}
			/>

			<div className="mx-auto flex max-w-5xl flex-col items-center text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
					<Sparkles className="size-4" />
					<span>Organiza tu éxito académico</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
					Tu vida estudiantil, <br />
					<span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
						en perfecto orden.
					</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="max-w-2xl text-sm text-muted-foreground sm:text-base mb-4">
					La plataforma definitiva para gestionar tus tareas, notas, calendario y programas de estudio en un solo lugar.
					Diseñada para que te enfoques en lo que importa: aprender.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="flex flex-col items-center">
					<div className="flex flex-col items-center gap-4 sm:flex-row">
						{user ? (
							<Button
								size="lg"
								className="h-12 rounded-full px-8 text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
								asChild>
								<Link href="/app">
									Ir a mi Dashboard
									<ArrowRight className="ml-2 size-5" />
								</Link>
							</Button>
						) : (
							<SocialAuthButtons />
						)}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
