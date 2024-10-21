"use client";

import Link from "next/link";
import { useState } from "react";
import { DiagonalBackground } from "./DiagonalBackground";
import styles from "./header.module.css";

export const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	return (
		<header className={styles.header}>
			<DiagonalBackground />
			<div className={styles.logo}>
				<Link href="/">CA技研</Link>
			</div>
			<nav className={styles.nav}>
				<button
					className={styles.menuButton}
					type="button"
					aria-expanded={false}
					aria-controls="navMenu"
					onClick={toggleMenu}
				>
					{!isMenuOpen && "メニュー"}
				</button>
				<ul
					id="navMenu"
					className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}
				>
					<button
						onClick={toggleMenu}
						type="button"
						className={`${styles.menuButton} ${isMenuOpen ? styles.active : ""}`}
					>
						閉じる
					</button>
					<li>
						<Link href="/">ホーム</Link>
					</li>
					<li>
						<Link href="/products">製品情報</Link>
					</li>
					<li>
						<Link href="/blogs">ニュース</Link>
					</li>
					<li>
						<Link href="/aboutus">当社について</Link>
					</li>
					<li>
						<Link href="/contactus">お問い合わせ</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
