"use client"
import Button from "@/components/ui/button"
import { createClient } from "@/supabase/client"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignOutButton() {
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
		<Button variant="ghost" size="icon" onClick={signOut}>
			<LogOut />
		</Button>
	)
}
