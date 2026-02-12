"use client"
import { USER } from "@/lib/query-keys"
import { createClient } from "@/supabase/client"
import { useQuery } from "@tanstack/react-query"

const { auth } = createClient()

export function useUser() {
	return useQuery({
		queryKey: USER,
		queryFn: async () => {
			const {
				data: { user }
			} = await auth.getUser()
			return user
		}
	})
}
