import Image from "next/image";
import styles from "./page.module.css";

import {
	baseUrl,
	blogsDirectory,
	productsDirectory,
	siteInfo,
} from "@/constants/info";
import Link from "next/link";
import nextConfig from "../next.config.mjs";
import BlogCard from "./components/BlogCard.";
import { ButtonLink } from "./components/ButtonLink";
import GridView from "./components/Grid";
import { HomeJsonLd } from "./components/HomeJsonLd";
import ProductCard from "./components/ProductCard";
import { getAllContent } from "./markdown-fetch";

// For Github Pages
const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : "";

const description = "問題設備・遊休装置を再生 「自動化リノベーション」";

export const metadata = {
	title: siteInfo.title,
	description: description,
	alternates: {
		canonical: `${baseUrl}`,
	},
	openGraph: {
		type: "website",
		siteName: siteInfo.title,
		title: `${siteInfo.title}`,
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
	let products = await getAllContent(productsDirectory);
	let blogs = await getAllContent(blogsDirectory);

	// Show only non-archived content
	products = products.filter((product) => !product.archived);
	blogs = blogs.filter((blogs) => !blogs.archived);

	return (
		<div className={styles.container}>
			<section className={styles.topView}>
				<Image
					alt={"CA技研ヘッダー"}
					src={`${BASE_PATH}/images/bgHeader.png`}
					quality={100}
					fill
					className={styles.bgImage}
				/>
				<div
					className={styles.imageMask}
				/>
				<div
					className={styles.titleContainer}
				>
					<h1 className={styles.title}>無人化・協働ロボットのお困りごとなら</h1>
					<p className={styles.description}>
						問題設備・遊休装置を再生 「自動化リノベーション」
					</p>
					<ButtonLink label={"お問い合わせ"} href={"/contactus"}/>
				</div>
			</section>
			<section className={styles.hero}>
				<h2 className={styles.subheader}>
					<Link href="/products">製品紹介・開発事例</Link>
				</h2>
				<div className={styles.content}>
					<GridView>
						{products.map((product) => (
							<ProductCard key={product.slug} data={product} />
						))}
					</GridView>
				</div>
			</section>
			<section className={styles.hero}>
				<h2 className={styles.subheader}>
					<Link href="/blogs">最新ニュース</Link>
				</h2>
				<div className={styles.content}>
					<GridView>
						{blogs.map((blog) => (
							<BlogCard key={blog.slug} data={blog} />
						))}
					</GridView>
				</div>
			</section>
			<HomeJsonLd />
		</div>
	);
};
