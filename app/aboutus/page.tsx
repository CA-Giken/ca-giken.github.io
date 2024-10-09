import mdStyles from "@/app/github_markdown.module.css";
import { baseUrl, siteInfo } from "@/constants/info";
import Head from "next/head";
import { getMarkdownContent, markdownToHtml } from "../markdown-fetch";
import styles from "./page.module.css";

const title = `会社情報 - ${siteInfo.title}`;
const description = "CA技研の会社情報、企業理念";

export const metadata = {
	title: title,
	description: description,
	alternates: {
		canonical: `${baseUrl}/aboutus`,
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

export default async function AboutUs() {
	const aboutus = await getMarkdownContent("content", "aboutus");
	const aboutusHtml = await markdownToHtml(aboutus.content);

	const policy = await getMarkdownContent("content", "privacy-policy");
	const policyHtml = await markdownToHtml(policy.content);

	return (
		<div className={styles.container}>
			<div
				className={mdStyles.markdownContainer}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: aboutusHtml }}
			/>
			<div style={{ height: 16 }}>
				<span />
			</div>
			<div
				className={mdStyles.markdownContainer}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: policyHtml }}
			/>
		</div>
	);
}
