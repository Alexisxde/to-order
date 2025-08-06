"use client"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode
} from "react"

export type SidebarMode = "mobile" | "sidebar" | "dock"

interface SidebarContextProps {
	mode: SidebarMode
	setMode: (mode: SidebarMode) => void
}

const STORAGE_KEY = "SIDEBAR_MODE"
const SidebarContext = createContext<SidebarContextProps | null>(null)

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [mode, setMode] = useState<SidebarMode>("dock")

	const evaluateMode = useCallback(() => {
		const width = window.innerWidth
		if (width < 768) setMode("mobile")
		else setMode(mode)
	}, [])

	useEffect(() => {
		const savedMode = localStorage.getItem(STORAGE_KEY) as SidebarMode | null
		if (savedMode) setMode(savedMode)
		else evaluateMode()
	}, [evaluateMode])

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, mode)
	}, [mode])

	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === STORAGE_KEY && event.newValue) {
				setMode(event.newValue as SidebarMode)
			}
		}
		window.addEventListener("storage", handleStorageChange)
		return () => window.removeEventListener("storage", handleStorageChange)
	}, [])

	useEffect(() => {
		evaluateMode()
		window.addEventListener("resize", evaluateMode)
		return () => window.removeEventListener("resize", evaluateMode)
	}, [evaluateMode])

	return (
		<SidebarContext.Provider value={{ mode, setMode }}>
			{children}
		</SidebarContext.Provider>
	)
}

export const useSidebar = (): SidebarContextProps => {
	const context = useContext(SidebarContext)
	if (!context)
		throw new Error("useSidebar must be used within SidebarProvider")
	return context
}
