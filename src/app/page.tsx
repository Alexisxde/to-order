import BackgroundGradient from "@/components/background-gradient"
import Footer from "@/components/footer"
import Hero from "@/components/hero"

export default function HomePage() {
	return (
		<section className="flex h-dvh flex-col justify-between">
			<BackgroundGradient />
			<Hero />
			<Footer />
		</section>
	)
}
