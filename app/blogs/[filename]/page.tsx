import { BlogJsonLd } from "@/app/components/BlogJsonLd";
import mdStyles from "@/app/github_markdown.module.css";
import { baseUrl, blogsDirectory, siteInfo } from "@/constants/info";
import type { ResolvingMetadata } from "next";
import Head from "next/head";
import {
	type MarkdownData,
	getAllSlugs,
	getMarkdownContent,
	markdownToHtml,
} from "../../markdown-fetch";
import styles from "./page.module.css";

const dir = blogsDirectory;
interface Props {
	params: {
		filename: string;
	};
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
) {
	const page = await getMarkdownContent(dir, params.filename);

	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: `${page.title} - ${siteInfo.title}`,
		description: page.description,
		alternates: {
			canonical: `${baseUrl}/blogs/${params.filename}`,
		},
		openGraph: {
			type: "website",
			siteName: siteInfo.title,
			title: `${page.title} - ${siteInfo.title}`,
			description: page.description,
			images: [
				{
					url: `${baseUrl}${page.image}`,
					alt: page.title,
					width: 1200,
					height: 630,
				},
				...previousImages,
			], // FIXME: should generate 1200x630 image for ogp
		},
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
		<div className={styles.container}>
			<article
				className={mdStyles.markdownContainer}
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: content }}
			/>
			<BlogJsonLd post={data} />
		</div>
	);
};
