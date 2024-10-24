import mdStyles from "@/app/github_markdown.module.css";
import { baseUrl, mdRoot, siteInfo } from "@/constants/info";
import Head from "next/head";
import { getMarkdownContent, markdownToHtml } from "../markdown-fetch";
import styles from "./page.module.css";

const title = `会社情報 - ${siteInfo.title}`;
const description = "CA技研の会社情報、企業理念";

export const metadata = {
	title: title,
	description: description,
	alternates: {
		canonical: `${baseUrl}/privacy-policy`,
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

export default async function PrivacyPolicy() {
	const data = await getMarkdownContent(mdRoot, "privacy-policy");
	const html = await markdownToHtml(data.content);

	return (
		<article className={styles.container}>
			<section
				className={mdStyles.markdownContainer}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</article>
	);
}
