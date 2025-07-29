import SignOutButton from "@/components/button-sign-out"
import { House, Wallet } from "lucide-react"
import React, { Fragment } from "react"
import Button from "./ui/button"

export default async function Sidebar() {
	const navItems = [
		[
			{ name: "Inicio", href: "/app", icon: <House /> },
			{ name: "Billeteras", href: "/app/wallets", icon: <Wallet /> }
		]
	]

	return (
		<aside className="bg-background border-muted flex flex-col items-center justify-between border-r p-5">
			<div className="flex flex-col items-center gap-2">
				<div className="bg-primary mb-4 size-[44px] rounded-md" />
				<div className="border-muted w-full rounded-full border-b" />
				<nav className="flex flex-col items-center gap-1">
					{navItems.map((item, index) => (
						<Fragment key={index}>
							{item.map((item, subIndex) => (
								<Option
									href={item.href}
									name={item.name}
									key={`${index}-${subIndex}`}>
									{item.icon}
								</Option>
							))}
							{navItems.length - 1 !== index && (
								<div className="border-muted w-full rounded-full border-b" />
							)}
						</Fragment>
					))}
				</nav>
			</div>
			<div className="flex flex-col items-center gap-2">
				<SignOutButton />
			</div>
		</aside>
	)
}

const Option = ({
	name,
	href,
	children
}: {
	name: string
	href: string
	children: React.ReactNode
}) => {
	return (
		<Button variant={"ghost"} size={"icon"} href={href} className="group">
			{children}
			<div className="bg-muted text-primary pointer-events-none absolute top-2 left-11 z-10 hidden rounded-lg px-2 py-1 text-xs font-medium shadow-xs transition-opacity duration-200 ease-in-out group-hover:block">
				{name}
			</div>
		</Button>
	)
}
