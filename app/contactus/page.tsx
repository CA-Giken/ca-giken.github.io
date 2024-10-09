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
			<div className={styles.markdownContainer}>
				<h1>お問い合わせ</h1>
				<p>
					お問い合わせは以下のボタンよりお願いいたします。(メーラーが起動します。)
				</p>
				<p>TODO:</p>
			</div>
		</div>
	);
}
