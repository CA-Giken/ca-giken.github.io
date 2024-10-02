import styles from "@/app/github_markdown.module.css";
import { blogsDirectory } from "@/constants/info";
import {
	type MarkdownData,
	getAllSlugs,
	getMarkdownContent,
	markdownToHtml,
} from "../../markdown-fetch";

const dir = blogsDirectory;
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
		<div
			className={styles.markdownContainer}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};
