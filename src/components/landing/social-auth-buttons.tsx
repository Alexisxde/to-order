"use client"
import { Button } from "@/components/ui/button"
import GitHubIcon from "@/icons/github"
import GoogleIcon from "@/icons/google"
import { createClient } from "@/supabase/client"
import type { Provider } from "@supabase/supabase-js"

export default function SocialAuthButtons() {
	const supabase = createClient()

	const signInWith = async (provider: Provider) => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					redirectTo: `${window.location.origin}/auth/callback`
				}
			})
			if (error) throw error
		} catch (error) {
			console.error("Auth error:", error)
		}
	}

	return (
		<div className="flex flex-col sm:flex-row gap-3 mt-8">
			<Button 
				variant="outline" 
				className="h-12 rounded-full px-6 transition-all hover:scale-105 active:scale-95 bg-background/50 backdrop-blur-sm border-border/50" 
				onClick={() => signInWith("google")}
			>
				<GoogleIcon className="mr-2 size-5" />
				Continuar con Google
			</Button>
			<Button 
				variant="outline" 
				className="h-12 rounded-full px-6 transition-all hover:scale-105 active:scale-95 bg-background/50 backdrop-blur-sm border-border/50" 
				onClick={() => signInWith("github")}
			>
				<GitHubIcon className="mr-2 size-5" />
				Continuar con GitHub
			</Button>
		</div>
	)
}
