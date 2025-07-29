import { createContext, useContext, useState } from "react"

export type SidebarContextType = { isOpen: boolean; toggleSidebar: () => void }

const sidebarContext = createContext<SidebarContextType | null>(null)

export const SidebarProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleSidebar = () => setIsOpen(prev => !prev)

	return (
		<sidebarContext.Provider value={{ isOpen, toggleSidebar }}>
			{children}
		</sidebarContext.Provider>
	)
}

export const useSidebar = () => {
	const context = useContext(sidebarContext)
	if (!context)
		throw new Error("useSidebar must be used within a SidebarProvider")
	return context
}
