import { createClient } from "@/supabase/client"
import type {
	CreateSubtopicDto,
	CreateTopicDto,
	Subject,
	Subtopic,
	Topic,
	TopicWithSubtopics,
	UpdateSubtopicDto,
	UpdateTopicDto
} from "../syllabus.type"

const supabase = createClient()

export async function selectSubjects(): Promise<Subject[]> {
	const { data, error } = await supabase.from("subjects").select("*").order("name", { ascending: true })

	if (error) throw error
	return data || []
}

export async function insertSubject(name: string): Promise<Subject> {
	const { data, error } = await supabase.from("subjects").insert([{ name }]).select().single()

	if (error) throw error
	return data
}

export async function updateSubject(subjectId: string, name: string): Promise<Subject> {
	const { data, error } = await supabase.from("subjects").update({ name }).eq("id", subjectId).select().single()

	if (error) throw error
	return data
}

export async function removeSubject(subjectId: string): Promise<void> {
	const { error } = await supabase.from("subjects").delete().eq("id", subjectId)
	if (error) throw error
}

export async function selectTopics(subjectId: string): Promise<TopicWithSubtopics[]> {
	const { data, error } = await supabase
		.from("topics")
		.select("*, subtopics(*)")
		.eq("subjectId", subjectId)
		.order("createdAt", { ascending: true })

	if (error) throw error
	return data || []
}

export async function insertTopic(topic: CreateTopicDto): Promise<Topic> {
	const { data, error } = await supabase.from("topics").insert([topic]).select().single()

	if (error) throw error
	return data
}

export async function updateTopic(topicId: string, topic: UpdateTopicDto): Promise<Topic> {
	const { data, error } = await supabase.from("topics").update(topic).eq("id", topicId).select().single()

	if (error) throw error
	return data
}

export async function removeTopic(topicId: string): Promise<void> {
	const { error } = await supabase.from("topics").delete().eq("id", topicId)
	if (error) throw error
}

export async function insertSubtopic(subtopic: CreateSubtopicDto): Promise<Subtopic> {
	const { data, error } = await supabase
		.from("subtopics")
		.insert([{ ...subtopic, completed: false }])
		.select()
		.single()

	if (error) throw error
	return data
}

export async function updateSubtopic(subtopicId: string, subtopic: UpdateSubtopicDto): Promise<Subtopic> {
	const { data, error } = await supabase.from("subtopics").update(subtopic).eq("id", subtopicId).select().single()

	if (error) throw error
	return data
}

export async function removeSubtopic(subtopicId: string): Promise<void> {
	const { error } = await supabase.from("subtopics").delete().eq("id", subtopicId)
	if (error) throw error
}

export default {
	selectSubjects,
	insertSubject,
	updateSubject,
	removeSubject,
	selectTopics,
	insertTopic,
	updateTopic,
	removeTopic,
	insertSubtopic,
	updateSubtopic,
	removeSubtopic
}
