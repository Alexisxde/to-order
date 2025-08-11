"use client"
import Button, { ButtonProps } from "@/components/ui/button"
import { createClient } from "@/supabase/client"
import { useRouter } from "next/navigation"

interface Props extends ButtonProps {
	children: React.ReactNode
	className?: string
}

export default function SignOutButton({
	children,
	className,
	...props
}: Props) {
	const supabase = createClient()
	const router = useRouter()

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw new Error("Failed to sign out.")
			router.push("/")
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<Button
			variant={"ghost"}
			onClick={signOut}
			className={className}
			{...props}>
			{children}
		</Button>
	)
}
