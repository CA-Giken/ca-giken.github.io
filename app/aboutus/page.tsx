import styles from "@/app/github_markdown.module.css";
import Head from "next/head";
import { getMarkdownContent, markdownToHtml } from "../markdown-fetch";

export default async function AboutUs() {
	const aboutus = await getMarkdownContent("content", "aboutus");
	const aboutusHtml = await markdownToHtml(aboutus.content);

	const policy = await getMarkdownContent("content", "privacy-policy");
	const policyHtml = await markdownToHtml(policy.content);

	return (
		<>
			<Head>
				<title>{aboutus.title} - CA技研</title>
				<meta name="description" content={aboutus.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div
				className={styles.markdownContainer}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: aboutusHtml }}
			/>
			<div style={{ height: 16 }}>
				<span />
			</div>
			<div
				className={styles.markdownContainer}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: policyHtml }}
			/>
		</>
	);
}
