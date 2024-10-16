import { baseUrl, blogsDirectory, productsDirectory } from "@/constants/info";
import type { MetadataRoute } from "next";
import { getAllContent, getAllSlugs, getMarkdownContent } from "./markdown-fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = baseUrl || "";

	const blogSlugs = await getAllSlugs(blogsDirectory);
	const blogPages = await Promise.all(blogSlugs.map(async (slug) => {
		const data = await getMarkdownContent(blogsDirectory, slug);
		const lastModified = data.last_updated;
		return {
			url: `${baseURL}/blogs/${slug}`,
			lastModified
		}
	}));

	const productSlugs = await getAllSlugs(productsDirectory);
	const productPages = await Promise.all(productSlugs.map(async (slug) => {
		const data = await getMarkdownContent(productsDirectory, slug);
		const lastModified = data.last_updated;
		return {
			url: `${baseURL}/products/${slug}`,
			lastModified
		}
	}));

	const lastModified = new Date("2024-10-16T19:26:47+09:00");

	const basePages = [
		{ url: `${baseURL}/`, lastModified },
		{ url: `${baseURL}/products`, lastModified },
		{ url: `${baseURL}/blogs`, lastModified},
		{ url: `${baseURL}/aboutus`, lastModified },
		{ url: `${baseURL}/contactus`, lastModified },
	];
	return [...basePages, ...blogPages, ...productPages];
}