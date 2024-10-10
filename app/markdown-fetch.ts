import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export interface MarkdownData {
	slug: string;
	title: string;
	description: string;
	image: string;
	content: string;
	created_at: Date;
	last_updated: Date;
	category: string;
	archived: boolean;
	tags?: string[];
}

export async function getMarkdownContent(
	dir: string,
	slug: string,
): Promise<MarkdownData> {
	const fullPath = path.join(dir, `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	const { data, content } = matter(fileContents);
	return {
		slug,
		title: data.title,
		description: data.description,
		image: data.image,
		content: content,
		created_at: ISOStringToDate(data.created_at),
		last_updated: ISOStringToDate(data.last_updated),
		category: data.category,
		archived: data.archived,
	};
}

export async function getAllSlugs(dir: string): Promise<string[]> {
	const fileNames = fs.readdirSync(dir);
	return fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getAllContent(dir: string): Promise<MarkdownData[]> {
	const pwddir = path.join(process.cwd(), dir);
	const slugs = await getAllSlugs(pwddir);
	const data = await Promise.all(
		slugs.map((slug) => getMarkdownContent(pwddir, slug)),
	);
	// last updated でソート
	data.sort((a, b) => {
		if (a.last_updated < b.last_updated) {
			return 1;
		}
		return -1;
	});
	return data;
}

export async function markdownToHtml(markdown: string) {
	const result = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings)
		.use(rehypeStringify)
		.process(markdown);

	return result.toString();
}

const ISOStringToDate = (isostring: string): Date => {
	return new Date(isostring);
};
