"use client"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar
} from "@/components/ui/sidebar"
import { useUser } from "@/hooks/use-user"
import {
	AppWindow,
	BadgeCheck,
	Bell,
	BoxIcon,
	Calendar1Icon,
	ChevronsUpDown,
	CreditCard,
	FolderIcon,
	GalleryVerticalEndIcon,
	LayoutDashboardIcon,
	LogOut,
	MonitorDot,
	Moon,
	Palette,
	PanelBottom,
	PanelLeftDashed,
	PanelTop,
	Settings,
	Sparkles,
	Sun
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "./ui/dropdown-menu"

const nav = [
	{ title: "Dashboard", href: "/app", icon: <LayoutDashboardIcon className="size-5 lg:size-full" /> },
	{ title: "Carpetas", href: "/app/folders", icon: <FolderIcon className="size-5 lg:size-full" /> },
	{ title: "Tareas", href: "/app/tasks", icon: <BoxIcon className="size-5 lg:size-full" /> },
	{ title: "Horarios", href: "/app/times", icon: <Calendar1Icon className="size-5 lg:size-full" /> }
]

export function AppSidebar() {
	const { isMobile } = useSidebar()
	const pathname = usePathname()
	const { theme, setTheme } = useTheme()
	const { data: user } = useUser()

	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<GalleryVerticalEndIcon className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="font-medium">Duenio</span>
									<span className="">v1.0.0</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="gap-2">
						{nav.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton tooltip={item.title} isActive={pathname === item.href} asChild>
									<Link href={item.href}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton tooltip={"Settings"} size="lg" asChild>
									<Button variant="ghost" className="size-10 rounded-lg p-0">
										<Settings />
									</Button>
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align="end"
								sideOffset={4}>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<Palette className="size-4" />
										<span>Theme</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuItem onClick={() => setTheme("dark")} className={theme === "dark" ? "bg-muted" : ""}>
											<Moon className="size-4" />
											<span>Dark</span>
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => setTheme("light")} className={theme === "light" ? "bg-muted" : ""}>
											<Sun className="size-4" />
											<span>Light</span>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => setTheme("system")}
											className={theme === "system" ? "bg-muted" : ""}>
											<MonitorDot className="size-4" />
											<span>System</span>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>
										<AppWindow className="size-4" />
										<span>Navegación</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuItem className="bg-muted">
											<PanelLeftDashed className="size-4" />
											<span>SideBar</span>
										</DropdownMenuItem>
										<DropdownMenuItem disabled>
											<PanelBottom className="size-4" />
											<span>Dock Floating</span>
										</DropdownMenuItem>
										<DropdownMenuItem disabled>
											<PanelTop className="size-4" />
											<span>NavBar</span>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size="lg"
									className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
									<Avatar className="size-8 rounded-lg">
										<AvatarImage src={user?.user_metadata.avatar_url} alt={`@${user?.user_metadata.user_name}`} />
										<AvatarFallback>OR</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user?.user_metadata.name}</span>
										<span className="truncate text-xs">{user?.user_metadata.email}</span>
									</div>
									<ChevronsUpDown className="ml-auto size-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align="end"
								sideOffset={4}>
								<DropdownMenuLabel className="p-0 font-normal">
									<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar className="size-8 rounded-lg">
											<AvatarImage src={user?.user_metadata.avatar_url} alt={`@${user?.user_metadata.user_name}`} />
											<AvatarFallback className="rounded-lg">OR</AvatarFallback>
										</Avatar>
										<div className="grid flex-1 text-left text-sm leading-tight">
											<span className="truncate font-medium">{user?.user_metadata.name}</span>
											<span className="truncate text-xs">{user?.user_metadata.email}</span>
										</div>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<Sparkles />
										Upgrade to Pro
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem>
										<BadgeCheck />
										Account
									</DropdownMenuItem>
									<DropdownMenuItem>
										<CreditCard />
										Billing
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Bell />
										Notifications
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOut />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
