export type Time = {
	_id: string
	subject: string
	description?: string
	day: "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado"
	color: "#FF5733" | "#33FF57" | "#3357FF" | "#FF33A8" | "#FFD133"
	url?: string
	type: "Teoría" | "Laboratorio" | "Práctica" | "Tutoria"
	time_start: string
	time_end: string
	created_at: string
	user_id: string
}

export type CreateTimeDto = Omit<Time, "_id" | "created_at" | "user_id">
export type UpdateTimeDto = Partial<CreateTimeDto>