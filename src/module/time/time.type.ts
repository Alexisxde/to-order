export type Time = {
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
