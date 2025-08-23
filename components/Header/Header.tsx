import Link from "next/link"
import css from "./Header.module.css"
import { Routes } from "@/config/routes"
import TagsMenu from "../TagsMenu/TagsMenu"

const Header = async () => {
	return (
		<header className={css.header}>
			<Link href={Routes.Home} aria-label="Home">
				NoteHub
			</Link>
			<nav aria-label="Main Navigation">
				<ul className={css.navigation}>
					<li>
						<Link href={Routes.Home}>Home</Link>
					</li>
					<li>
						<TagsMenu />
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
