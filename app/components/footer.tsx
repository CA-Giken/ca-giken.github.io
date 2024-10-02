import styles from "./footer.module.css";

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContainer}>
				<div>
					<p>© 2024 CA-Giken All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};
