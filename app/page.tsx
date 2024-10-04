import Image from "next/image";
import styles from "./page.module.css";

import { blogsDirectory, productsDirectory } from "@/constants/info";
import Head from "next/head";
import Link from "next/link";
// For Github Pages
import nextConfig from "../next.config.mjs";
import BlogCard from "./components/BlogCard.";
import GridView from "./components/Grid";
import ProductCard from "./components/ProductCard";
import { getAllContent } from "./markdown-fetch";
const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : "";

export default async () => {
	let products = await getAllContent(productsDirectory);
	let blogs = await getAllContent(blogsDirectory);

	// Show only non-archived content
	products = products.filter((product) => !product.archived);
	blogs = blogs.filter((blogs) => !blogs.archived);

	return (
		<>
			<Head>
				<title>CA技研</title>
				<meta name="description" content="CA技研ホームページ" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className={styles.hero}>
				<h1 className={styles.title}>CA技研</h1>
				<p className={styles.description}>
					問題設備・遊休装置を再生 「自動化リノベーション」
				</p>
				<div className={styles.imageContainer}>
					<Image
						src={`${BASE_PATH}/images/header.png`}
						alt={"CA-Giken header"}
						layout="fill"
						objectFit="cover"
					/>
				</div>
			</section>
			<section className={styles.hero}>
				<h2 className={styles.subheader}>
					<Link href="/products">製品紹介</Link>
				</h2>
				<div className={styles.content}>
					<GridView>
						{products.map((product) => (
							<ProductCard key={product.slug} data={product} />
						))}
					</GridView>
				</div>
			</section>
			<section>
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
		</>
	);
};
