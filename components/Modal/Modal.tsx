"use client"

import { createPortal } from "react-dom"
import css from "./Modal.module.css"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface ModalProps {
	children: React.ReactNode
	onClose?: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
	const router = useRouter()

	if (!onClose) {
		onClose = () => router.back()
	}

	const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}
		document.addEventListener("keydown", handleKeyDown)
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = ""
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [onClose])

	return createPortal(
		<div
			className={css.backdrop}
			role="dialog"
			aria-modal="true"
			onClick={handleBackdrop}>
			<div className={css.modal}>{children}</div>
		</div>,
		document.body
	)
}
