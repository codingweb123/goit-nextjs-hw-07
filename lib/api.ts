import axios from "axios"
import type { Note } from "../types/note"

axios.defaults.baseURL = "https://notehub-public.goit.study/api/"
axios.defaults.headers["Authorization"] =
	`Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`

export type Tags = ReturnType<typeof getCategories>[number]
type SortBy = "created" | "updated" | undefined

interface FetchNotes {
	notes: Note[]
	totalPages: number
}

interface Error {
	message: string
	error?: string
}

export const fetchNotes = async (
	search: string,
	page: number = 1,
	perPage: number = 10,
	tag?: Tags,
	sortBy?: SortBy
) => {
	tag = tag === "All" ? undefined : tag
	const { data } = await axios<FetchNotes>("notes", {
		params: {
			search,
			page,
			perPage,
			tag,
			sortBy,
		},
	})
	return data
}

export const createNote = async (
	title: string,
	content: string,
	tag: string
) => {
	const { data } = await axios.post<Note | Error>("notes", {
		title,
		content,
		tag,
	})
	return data
}

export const fetchNoteById = async (id: string) => {
	const { data } = await axios<Note>(`notes/${id}`)
	return data
}

export const deleteNote = async (id: string) => {
	const { data } = await axios.delete<Note>(`notes/${id}`)
	return data
}

export const getCategories = () => {
	return ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"] as const
}
