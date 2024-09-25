import ProductCard from "@/app/components/ProductCard";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

export const blogsDirectory = "content/blogs";

export default async () => {
	const blogs: MarkdownData[] = await getAllContent(blogsDirectory);

	return (
		<div>
			<h1 className={styles.title}>CA技研ニュース</h1>
			<div className={styles.productGrid}>
				{blogs.map((blog) => (
					<ProductCard key={blog.slug} product={blog} />
				))}
			</div>
		</div>
	);
};
