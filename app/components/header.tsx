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
						className={`${styles.menuClose} ${isMenuOpen ? styles.active : ""}`}
					>
						閉じる
					</button>
					<li>
						<Link href="/" onClick={() => setIsMenuOpen(false)}>
							ホーム
						</Link>
					</li>
					<li>
						<Link href="/products" onClick={() => setIsMenuOpen(false)}>
							製品情報
						</Link>
					</li>
					<li>
						<Link href="/tools" onClick={() => setIsMenuOpen(false)}>
							ツール・ソフトウェア
						</Link>
					</li>
					<li>
						<Link href="/blogs" onClick={() => setIsMenuOpen(false)}>
							ニュース
						</Link>
					</li>
					<li>
						<Link href="/aboutus" onClick={() => setIsMenuOpen(false)}>
							当社について
						</Link>
					</li>
					<li>
						<Link href="/contactus" onClick={() => setIsMenuOpen(false)}>
							お問い合わせ
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};
