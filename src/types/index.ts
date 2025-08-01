import type { Database, Tables } from "@/supabase/database"

export type Project = Tables<"projects">
export type InsertProject = Database["public"]["Tables"]["projects"]["Insert"]
