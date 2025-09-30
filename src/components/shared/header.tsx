"use client"
import useClickOutside from "@/hooks/useClickOutside"
import { useIsMobile } from "@/hooks/useIsMobile"
import type { User } from "@supabase/supabase-js"
import { LogOutIcon, Moon, Sun } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useTheme } from "next-themes"
import { useRef, useState } from "react"
import Button from "../ui/button"
import { DragDrawer, DragDrawerContent, DragDrawerTrigger } from "../ui/drag-draw"
import SignOutButton from "./button-sign-out"

interface Props {
	user: User
}

export default function Header({ user }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const isMobile = useIsMobile()
	const ref = useRef<HTMLDivElement | null>(null)
	const { theme, setTheme } = useTheme()

	useClickOutside(ref as React.RefObject<HTMLDivElement>, () => {
		if (isOpen) setIsOpen(false)
	})

	return (
		<header className="bg-background sticky top-0 z-20 flex items-center gap-4 px-4 pt-2">
			<div className="text-xs">
				<span></span>
			</div>
			<div id="header-center" className="flex flex-1" />
			{!isMobile ? (
				<div ref={ref} className="relative">
					<motion.button
						layoutId="popover-content"
						className="bg-card border-border flex cursor-pointer items-center gap-2 rounded-full border"
						onClick={() => setIsOpen(true)}>
						<motion.img
							layoutId={`popover-image`}
							src={user.user_metadata.avatar_url}
							alt={`Profile image ${user.user_metadata.full_name}`}
							className="size-8 rounded-full"
						/>
					</motion.button>
					<AnimatePresence>
						{isOpen && (
							<motion.div
								layoutId="popover-content"
								className="bg-card border-border absolute top-0 right-0 z-20 flex w-52 flex-col items-center gap-2 rounded-xl border p-2">
								<div className="border-border flex w-full items-center justify-between rounded-xl border p-2">
									<div className="flex flex-col">
										<span className="text-sm font-medium">{user.user_metadata.full_name}</span>
										<span className="text-muted-foreground text-[9px]">{user.email}</span>
									</div>
									<motion.img
										layoutId={`popover-image`}
										src={user.user_metadata.avatar_url}
										alt={`Profile image ${user.user_metadata.full_name}`}
										className="size-8 rounded-full"
									/>
								</div>
								<div className="border-border flex w-full items-center justify-center gap-4 rounded-xl border px-3 py-2">
									<Button
										variant={"ghost"}
										className={theme === "dark" ? "bg-secondary" : ""}
										onClick={() => setTheme("dark")}>
										<Moon className="stroke-icon-primary size-3" />
										<span className="text-xs">Dark</span>
									</Button>
									<Button
										variant={"ghost"}
										className={theme === "light" ? "bg-secondary" : ""}
										onClick={() => setTheme("light")}>
										<Sun className="stroke-icon-primary size-3" />
										<span className="text-xs">Light</span>
									</Button>
								</div>
								<div className="w-full">
									<SignOutButton className="bg-card w-full" variant={"outline"}>
										<LogOutIcon className="size-4" />
										<span>Salir</span>
									</SignOutButton>
								</div>
								<div className="bg-border h-0.25 w-full rounded-full" />
								<a href="/" className="mt-1 flex items-center justify-center gap-1">
									<img src="/toorder-logo.svg" alt="ToOrder Logo SVG" className="size-4" />
									<span className="text-[9px]">ToOrder Notes</span>
								</a>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			) : (
				<DragDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
					<DragDrawerTrigger asChild>
						<Button variant={"ghost"} size={"icon"} className="size-8 rounded-full">
							<img
								src={user.user_metadata.avatar_url}
								alt={`Profile image ${user.user_metadata.full_name}`}
								className="rounded-full"
							/>
						</Button>
					</DragDrawerTrigger>
					<DragDrawerContent className="flex h-fit w-full flex-col gap-2">
						<div className="mb-2 flex w-full flex-col gap-2">
							<span className="text-primary/50 text-[10px]">
								Tu perfil de <span className="capitalize">{user.app_metadata.provider}</span>
							</span>
							<div className="border-border flex flex-col gap-2 rounded-lg border px-3 py-2">
								<div className="inline-flex items-center gap-2">
									<img
										src={user.user_metadata.avatar_url}
										alt={`Profile image ${user.user_metadata.preferred_username}`}
										className="size-10 rounded-full"
									/>
									<div className="flex flex-col">
										<span className="text-sm font-medium">{user.user_metadata.full_name}</span>
										<span className="text-muted-foreground text-xs">{user.email}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="mb-2 flex w-full flex-col gap-2">
							<span className="text-primary/50 text-[10px]">Temas</span>
							<div className="border-border flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2">
								<Button
									variant={"ghost"}
									className={theme === "dark" ? "bg-border" : ""}
									onClick={() => setTheme("dark")}>
									<Moon className="size-4" />
									<span>Dark</span>
								</Button>
								<Button
									variant={"ghost"}
									className={theme === "light" ? "bg-border" : ""}
									onClick={() => setTheme("light")}>
									<Sun className="size-4" />
									<span>Light</span>
								</Button>
							</div>
						</div>
						<SignOutButton className="bg-card w-full" variant={"outline"} size={"lg"}>
							<LogOutIcon className="stroke-icon-primary size-4" />
							<span>Salir</span>
						</SignOutButton>
						<a href="/" className="mt-2 flex items-center justify-center gap-1">
							<img src="/toorder-logo.svg" alt="ToOrder Logo SVG" className="size-6" />
							<span className="text-xs">ToOrder Notes</span>
						</a>
					</DragDrawerContent>
				</DragDrawer>
			)}
		</header>
	)
}
