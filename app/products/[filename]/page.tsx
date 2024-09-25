import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { metadata } from "@/app/layout";
import Image from "next/image";
import {
	type MarkdownData,
	getAllSlugs,
	getMarkdownContent,
	markdownToHtml,
} from "../../markdown-fetch";
import { productsDirectory } from "../page";
import styles from "./page.module.css";

export const revalidate = 3600; // revalidate every hour

interface Props {
	params: {
		filename: string;
	};
}

export async function generateMetadata({ params }: Props) {
	const page = await getMarkdownContent(productsDirectory, params.filename);

	return {
		title: page.title,
		description: page.description,
	};
}

export async function generateStaticParams() {
	const slugs = await getAllSlugs(productsDirectory);
	return slugs.map((slug) => ({
		filename: slug,
	}));
}

export default async ({ params }: Props) => {
	const product: MarkdownData = await getMarkdownContent(
		productsDirectory,
		params.filename,
	);
	const content = await markdownToHtml(product.content);

	return (
		<div
			className={styles.markdownContainer}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};
