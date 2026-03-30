import { Toaster } from "@/components/ui/sonner"
import QueryProvider from "@/providers/query-provider"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Poppins } from "next/font/google"

const poppins = Poppins({
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: {
		default: "Organzi - Tu vida en orden",
		template: "%s | Organzi"
	},
	description:
		"Organzi es tu plataforma integral para gestionar tareas, notas, calendario y tiempos. Todo lo que necesitas para mantener tu vida en orden en un solo lugar.",
	keywords: ["tareas", "notas", "calendario", "productividad", "gestión del tiempo", "organización"],
	authors: [{ name: "Organzi Team" }],
	creator: "Organzi",
	publisher: "Organzi",
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: "https://organzi.vercel.app",
		siteName: "Organzi",
		title: "Organzi - Gestiona tu vida con facilidad",
		description:
			"La herramienta definitiva para organizar tus tareas, notas y calendario. Maximiza tu productividad hoy.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Organzi - Tu vida en orden"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "Organzi - Tu vida en orden",
		description: "Gestiona tareas, notas y calendario en un solo lugar.",
		images: ["/og-image.png"]
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1
		}
	}
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" className="dark" style={{ colorScheme: "dark" }}>
			<link rel="icon" href="/organzi.svg" type="image/svg+xml" />
			<body className={`${poppins.className}`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<QueryProvider>
						{children}
						<Toaster />
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
