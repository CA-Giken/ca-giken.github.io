import styles from "@/app/github_markdown.module.css";
import { productsDirectory } from "@/constants/info";
import Head from "next/head";
import {
	type MarkdownData,
	getAllSlugs,
	getMarkdownContent,
	markdownToHtml,
} from "../../markdown-fetch";

const dir = productsDirectory;
interface Props {
	params: {
		filename: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const page = await getMarkdownContent(dir, params.filename);

	return {
		title: page.title,
		description: page.description,
	};
}

export async function generateStaticParams() {
	const slugs = await getAllSlugs(dir);
	return slugs.map((slug) => ({
		filename: slug,
	}));
}

export default async ({ params }: Props) => {
	const data: MarkdownData = await getMarkdownContent(dir, params.filename);
	const content = await markdownToHtml(data.content);

	return (
		<>
			<Head>
				<title>{data.title} - CA技研</title>
				<meta name="description" content={data.description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div
				className={styles.markdownContainer}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</>
	);
};
