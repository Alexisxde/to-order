import "@/styles/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Poppins } from "next/font/google"

const poppins = Poppins({
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"]
})

export const metadata: Metadata = { title: "Reparapp" }

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" className="dark" style={{ colorScheme: "dark" }}>
			<link rel="icon" href="/toorder-logo.svg" type="image/svg+xml" />
			<body className={`${poppins.className}`}>
				<ThemeProvider attribute="class">{children}</ThemeProvider>
			</body>
		</html>
	)
}
