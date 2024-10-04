import ProductCard from "@/app/components/ProductCard";
import { baseUrl, productsDirectory, siteInfo } from "@/constants/info";
import GridView from "../components/Grid";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

const title = `製品情報 - ${siteInfo.title}`;
const description = "CA技研が製作している製品の一覧です。";

export const metadata = {
	title: title,
	description: description,
	alternates: {
		canonical: `${baseUrl}/products`,
	},
	openGraph: {
		type: "website",
		siteName: siteInfo.title,
		title: title,
		description: description,
		images: ["/images/ogp.png"],
	},
};

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
