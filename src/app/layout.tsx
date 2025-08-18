import "@/styles/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Poppins, Roboto_Flex } from "next/font/google"

const roboto_Flex = Roboto_Flex({
	weight: ["500", "1000"],
	style: ["normal"],
	subsets: ["latin"]
})

const poppins = Poppins({
	weight: ["400", "500", "600", "700", "800", "900"],
	style: ["normal", "italic"],
	subsets: ["latin"]
})

export const metadata: Metadata = { title: "Yalo" }

export default function RootLayout({
	children
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" className="dark" style={{ colorScheme: "dark" }}>
			<link rel="icon" href="/yalo-logo.svg" type="image/svg+xml" />
			<body className={`${poppins.className}`}>
				<ThemeProvider attribute="class">{children}</ThemeProvider>
			</body>
		</html>
	)
}
