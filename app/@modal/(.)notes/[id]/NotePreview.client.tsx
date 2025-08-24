"use client"

interface NotePreviewClientProps {
	id: string
}

import Modal from "@/components/Modal/Modal"
import { fetchNoteById } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
	const {
		data: note,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["notes", { id }],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	})

	if (isLoading) return <p>Loading, please wait...</p>
	if (error || !note) return <p>Could not fetch note. {error?.message}</p>

	return (
		<Modal>
			<h2>{note.title}</h2>
			<p>{note.content}</p>
		</Modal>
	)
}

export default NotePreviewClient
