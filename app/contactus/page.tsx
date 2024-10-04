import styles from "@/app/github_markdown.module.css";
import { baseUrl, siteInfo } from "@/constants/info";
import Head from "next/head";

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
				url: "/images/ogp.png",
				width: 1200,
				height: 630,
				alt: "CA技研",
			},
		],
	},
};

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
