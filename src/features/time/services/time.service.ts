import { createClient } from "@/supabase/client"
import type { CreateTimeDto, Time, UpdateTimeDto } from "../time.type"

const supabase = createClient()

export async function select(userId?: string): Promise<Time[]> {
	if (!userId) return []
	const { data, error } = await supabase
		.from("times")
		.select("*")
		.eq("user_id", userId)
		.order("time_start", { ascending: true })
	if (error) throw error
	return data
}

export async function insert(time: CreateTimeDto, userId?: string): Promise<Time> {
	if (!userId) throw new Error("User ID is required")
	const { data, error } = await supabase
		.from("times")
		.insert([{ ...time, user_id: userId }])
		.select()
		.single()
	if (error) throw error
	return data
}

export async function update(timeId: string, time: UpdateTimeDto): Promise<Time> {
	const { data, error } = await supabase.from("times").update(time).eq("_id", timeId).select().single()
	if (error) throw error
	return data
}

export async function remove(timeId: string): Promise<void> {
	const { error } = await supabase.from("times").delete().eq("_id", timeId)
	if (error) throw error
}

export default { select, insert, update, remove }
