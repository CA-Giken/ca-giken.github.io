import ProductCard from "@/app/components/ProductCard";
import { productsDirectory } from "@/constants/info";
import GridView from "../components/Grid";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

export default async () => {
	const products: MarkdownData[] = await getAllContent(productsDirectory);

	return (
		<div className="container">
			<h1>製品情報</h1>
			<GridView>
				{products.map((product) => (
					<ProductCard key={product.slug} data={product} />
				))}
			</GridView>
		</div>
	);
};
