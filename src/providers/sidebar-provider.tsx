"use client"
import { createContext, useContext, useMemo, useState } from "react"

export type SidebarContextType = { isOpen: boolean; toggleSidebar: () => void }

const SidebarContext = createContext<SidebarContextType | null>(null)

export const SidebarProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [isOpen, isSetOpen] = useState(false)

	const toggleSidebar = () => isSetOpen(prev => !prev)

	const contextValue = useMemo(() => ({ isOpen, toggleSidebar }), [isOpen])

	return (
		<SidebarContext.Provider value={contextValue}>
			{children}
		</SidebarContext.Provider>
	)
}

export const useSidebar = () => {
	const context = useContext(SidebarContext)
	if (!context)
		throw new Error("useSidebar must be used within a SidebarProvider")
	return context
}
