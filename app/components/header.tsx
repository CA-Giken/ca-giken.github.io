import Link from "next/link";
import styles from "./header.module.css";

export const Header = () => {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<div className={styles.logo}>
					<Link href="/">CA技研</Link>
				</div>
				<button className={styles.menuButton} type="button">
					Menu
				</button>
				<div className={styles.navLinks}>
					<Link href="/">ホーム</Link>
					<Link href="/products">製品情報</Link>
					<Link href="/blogs">ニュース</Link>
					<Link href="/aboutus">当社について</Link>
					<Link href="/contactus">お問い合わせ</Link>
				</div>
			</nav>
		</header>
	);
};
