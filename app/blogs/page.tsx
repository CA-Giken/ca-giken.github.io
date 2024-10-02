import ProductCard from "@/app/components/ProductCard";
import { blogsDirectory } from "@/constants/info";
import GridView from "../components/Grid";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

export default async () => {
	const blogs: MarkdownData[] = await getAllContent(blogsDirectory);

	return (
		<div className="container">
			<h1>CA技研ニュース</h1>
			<GridView>
				{blogs.map((blog) => (
					<ProductCard key={blog.slug} data={blog} />
				))}
			</GridView>
		</div>
	);
};
