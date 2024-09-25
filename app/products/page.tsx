import ProductCard from "@/app/components/ProductCard";
import { productsDirectory } from "@/constants/info";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

export default async () => {
	const products: MarkdownData[] = await getAllContent(productsDirectory);

	return (
		<div>
			<h1 className={styles.title}>製品情報</h1>
			<div className={styles.productGrid}>
				{products.map((product) => (
					<ProductCard key={product.slug} product={product} />
				))}
			</div>
		</div>
	);
};
