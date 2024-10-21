import ProductCard from "@/app/components/ProductCard";
import { baseUrl, productsDirectory, siteInfo } from "@/constants/info";
import { BreadcrumbList } from "../components/Breadcrumb";
import GridView from "../components/Grid";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

const title = `製品紹介・開発事例 - ${siteInfo.title}`;
const description = "CA技研が製作している製品・開発事例の一覧です。";

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
		images: [
			{
				url: `${baseUrl}/images/ogp.png`,
				width: 1200,
				height: 630,
				alt: "CA技研",
			},
		],
	},
};

export default async () => {
	const products: MarkdownData[] = await getAllContent(productsDirectory);
	const breadcrumbs = [
		{
			name: "ホーム",
			href: "/",
		},
		{
			name: "製品紹介・開発事例",
			href: "/products",
		},
	];
	return (
		<div className={styles.container}>
			<BreadcrumbList items={breadcrumbs} />
			<h1>製品紹介・開発事例</h1>
			<section>
				<GridView>
					{products.map((product) => (
						<ProductCard key={product.slug} data={product} />
					))}
				</GridView>
			</section>
		</div>
	);
};
