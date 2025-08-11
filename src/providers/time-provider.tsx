"use client"
import { createClient } from "@/supabase/client"
import { createContext, useContext, useEffect, useState } from "react"

type Time = {
	_id: string
	subject: string
	description?: string
	day: "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado"
	color: "#FF5733" | "#33FF57" | "#3357FF" | "#FF33A8" | "#FFD133"
	url?: string
	type: "Teoría" | "Laboratorio" | "Práctica"
	time_start: string
	time_end: string
	created_at: string
	user_id: string
}

export type TimeContextType = {
	times: Time[]
	createTime: (
		time: Omit<Time, "_id" | "created_at" | "user_id">
	) => Promise<void>
}

const TimeContext = createContext<TimeContextType | null>(null)

export function TimeProvider({ children }: { children: React.ReactNode }) {
	const supabase = createClient()
	const [times, setTimes] = useState<Time[] | []>([])

	const getTimes = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()
		const { data } = await supabase
			.from("times")
			.select()
			.eq("user_id", user?.id)
		setTimes(data as Time[])
	}

	const createTime = async (
		time: Omit<Time, "_id" | "created_at" | "user_id">
	) => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()

			const { data } = await supabase
				.from("times")
				.insert({ ...time, user_id: user?.id })
				.select()

			console.log(data)
			if (!data) throw new Error("Error creating Time")
			setTimes(prev => [data[0], ...prev!])
		} catch (error) {
			setTimes(prev => prev)
			console.error("Error updating Time:", error)
		}
	}

	useEffect(() => {
		getTimes()
	}, [])

	return (
		<TimeContext.Provider value={{ times, createTime }}>
			{children}
		</TimeContext.Provider>
	)
}

export const useTime = () => {
	const context = useContext(TimeContext)
	if (!context) throw new Error("useTime must be used within a TimeProvider")
	return context
}
