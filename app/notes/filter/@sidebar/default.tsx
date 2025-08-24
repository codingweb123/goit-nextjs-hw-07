"use client"

import Link from "next/link"
import css from "./SidebarNotes.module.css"
import { getCategories } from "@/lib/api"
import { Routes } from "@/config/routes"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator"

const SidebarNotes = () => {
	const categories = getCategories()
	const currentPath = usePathname().replace(Routes.NotesFilter, "")

	return (
		<ul className={css.menuList}>
			{categories.map(category => (
				<li key={category} className={css.menuItem}>
					<Link
						href={Routes.NotesFilter + category}
						scroll={false}
						className={clsx(
							css.menuLink,
							currentPath === category && css.activeMenuLink
						)}>
						{category} <LoadingIndicator />
					</Link>
				</li>
			))}
		</ul>
	)
}

export default SidebarNotes
