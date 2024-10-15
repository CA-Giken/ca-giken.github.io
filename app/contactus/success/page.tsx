import styles from "./page.module.css";

export default async function ContactThanks() {
	return (
		<>
			<div className={styles.container}>
				<p>
					お問い合わせありがとうございました。
					<br />
					送信が完了しました。
				</p>
			</div>
		</>
	);
}
