import type { Metadata } from "next"
import { createClientForServer } from "@/supabase/server"
import Navbar from "@/components/landing/navbar"
import HeroV2 from "@/components/landing/hero-v2"
import FeaturesGrid from "@/components/landing/features-grid"
import CTASection from "@/components/landing/cta-section"
import Footer from "@/components/landing/footer"
import BackgroundGradient from "@/components/background-gradient"

export const metadata: Metadata = {
	title: "Organzi | Tu éxito académico comienza aquí",
	description:
		"La plataforma todo en uno para estudiantes. Gestiona tus tareas, notas, calendario y programas de estudio con Organzi."
}

export default async function HomePage() {
	const supabase = await createClientForServer()
	const { data } = await supabase.auth.getUser()
	const { user } = data

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "Organzi",
		operatingSystem: "Web",
		applicationCategory: "ProductivityApplication",
		description: "La plataforma todo en uno para tus tareas, notas y calendario.",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD"
		}
	}

	return (
		<main className="relative min-h-screen">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<BackgroundGradient />
			<HeroV2 user={user} />
		</main>
	)
}
