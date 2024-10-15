import { baseUrl, siteInfo } from "@/constants/info";
import styles from "./page.module.css";

const title = `お問い合わせ - ${siteInfo.title}`;
const description = "CA技研へのお問い合わせはこちら";

export const metadata = {
	title: title,
	description: description,
	alternates: {
		canonical: `${baseUrl}/contactus`,
	},
	openGraph: {
		type: "website",
		siteName: siteInfo.title,
		title: title,
		description: description,
		images: [
			{
				url: `${baseUrl}/images/ogp.png`,
				width: 1200,
				height: 630,
				alt: "CA技研",
			},
		],
	},
};

export default async function ContactUs() {
	return (
		<div className={styles.container}>
			<section className={styles.section}>
				<h2>お問い合わせ内容</h2>
				<form>
					<label>
						お名前
						<input type="text" name="name" className={styles.inputName}/>
					</label>
					<label>
						メールアドレス
						<input type="email" name="email" className={styles.inputEmail}/>
					</label>
					<label>
						お問い合わせ内容
						<textarea name="message" className={styles.inputTextarea}/>
					</label>
					<button type="submit" name="button" className={styles.inputButton}>送信</button>
				</form>
			</section>
		</div>
	);
}
