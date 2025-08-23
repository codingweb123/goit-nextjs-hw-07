"use client"

import { Routes } from "@/config/routes"
import css from "./TagsMenu.module.css"
import { getCategories } from "@/lib/api"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

const TagsMenu = () => {
	const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)
	const categories = getCategories()
	const currentPath = usePathname().replace(Routes.NotesFilter, "")

	const handleClick = () => {
		setIsNotesOpen(!isNotesOpen)
	}

	return (
		<div className={css.menuContainer}>
			<button className={css.menuButton} onClick={handleClick}>
				Notes {isNotesOpen ? "▾" : "▴"}
			</button>
			{isNotesOpen && (
				<ul className={css.menuList}>
					{categories.map(category => (
						<li key={category} className={css.menuItem}>
							<Link
								href={Routes.NotesFilter + category}
								className={clsx(
									css.menuLink,
									currentPath === category && ` ${css.activeMenuLink}`
								)}
								onClick={() => setIsNotesOpen(false)}>
								{category}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default TagsMenu
