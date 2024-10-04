import { baseUrl, blogsDirectory, productsDirectory } from "@/constants/info";
import type { MetadataRoute } from "next";
import { getAllContent, getAllSlugs } from "./markdown-fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseURL = baseUrl || "";
	const lastModified = new Date();

	const blogSlugs = await getAllSlugs(blogsDirectory);
	const blogPages = blogSlugs.map((slug) => ({
		url: `${baseURL}/blogs/${slug}`,
		lastModified,
	}));

	const productSlugs = await getAllSlugs(productsDirectory);
	const productPages = productSlugs.map((slug) => ({
		url: `${baseURL}/products/${slug}`,
		lastModified,
	}));

	const basePages = [
		{ url: `${baseURL}/`, lastModified },
		{ url: `${baseURL}/products`, lastModified },
		{ url: `${baseURL}/blogs`, lastModified },
		{ url: `${baseURL}/aboutus`, lastModified },
		{ url: `${baseURL}/contactus`, lastModified },
	];
	return [...basePages, ...blogPages, ...productPages];
}
