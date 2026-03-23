import Hero from "@/components/hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Bienvenido a Organzi",
	description: "Comienza a organizar tu vida hoy mismo con Organzi. La plataforma todo en uno para tus tareas, notas y calendario."
}

export default function HomePage() {
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
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Hero />
		</>
	)
}
