"use client"
import Button from "@/components/ui/button"
import GitHubIcon from "@/icons/github"
import GoogleIcon from "@/icons/google"
import { createClient } from "@/supabase/client"
import type { Provider } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export default function SignInButton() {
	const supabase = createClient()

	const signInWith = async (provider: Provider) => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
				}
			})
			if (error) throw new Error("Failed to sign in.")
			if (data.url) redirect(data.url)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<Button
				variant="outline"
				className="text-xs"
				onClick={() => signInWith("github")}>
				<GitHubIcon className="size-4" />
				Sign in with GitHub
			</Button>
			<Button
				variant="outline"
				className="text-xs"
				onClick={() => signInWith("google")}>
				<GoogleIcon className="size-4" />
				Sign in with Google
			</Button>
		</>
	)
}
