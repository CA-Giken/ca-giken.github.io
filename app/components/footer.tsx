import Link from "next/link";
import styles from "./footer.module.css";

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div className={styles.links}>
					<Link href="/" className={styles.footerLink}>
						ホーム
					</Link>
					<Link href="/aboutus" className={styles.footerLink}>
						会社情報
					</Link>
					<Link href="/privacy-policy" className={styles.footerLink}>
						プライバシーポリシー
					</Link>
					<Link href="/contactus" className={styles.footerLink}>
						お問い合わせ
					</Link>
				</div>
				<div>
					<p className={styles.copyright}>
						© 2024 CA-Giken All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};
