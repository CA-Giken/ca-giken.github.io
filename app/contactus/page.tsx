import styles from "@/app/github_markdown.module.css";
import Head from "next/head";

export default async function ContactUs() {
	return (
		<>
			<Head>
				<title>お問い合わせ - CA技研</title>
				<meta name="description" content="お問い合わせ" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div className={styles.markdownContainer}>
				<h1>お問い合わせ</h1>
				<p>
					お問い合わせは以下のボタンよりお願いいたします。(メーラーが起動します。)
				</p>
				<p>TODO:</p>
			</div>
		</>
	);
}
