"use client"
import Button from "@/components/ui/button"
import GitHubIcon from "@/icons/github"
import { createClient } from "@/supabase/client"
import { redirect } from "next/navigation"

export default function SignInButton() {
	const supabase = createClient()

	const signInWithGithub = async () => {
		try {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "github",
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
		<Button variant="outline" size="sm" onClick={signInWithGithub}>
			<GitHubIcon className="size-4" />
			Sign in with GitHub
		</Button>
	)
}
