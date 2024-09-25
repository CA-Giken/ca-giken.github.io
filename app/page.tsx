import Image from "next/image";
import styles from "./page.module.css";

import { blogsDirectory, productsDirectory } from "@/constants/info";
import Head from "next/head";
import Link from "next/link";
// For Github Pages
import nextConfig from "../next.config.mjs";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { getAllContent } from "./markdown-fetch";
const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : "";

export default async () => {
	const products = await getAllContent(productsDirectory);
	const blogs = await getAllContent(blogsDirectory);

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
			</section>
			<h2>
				<Link href="/products">製品紹介</Link>
			</h2>
			<div className={styles.projectGrid}>
				{products.map((product) => (
					<Link key={product.slug} href={`/products/${product.slug}`}>
						<div className={styles.projectCard}>
							<h3>{product.title}</h3>
							<p>{product.description}</p>
						</div>
					</Link>
				))}
			</div>
			<h2>
				<Link href="/blogs">最新ニュース</Link>
			</h2>
			<div className={styles.blogGrid}>
				{blogs.map((blog) => (
					<Link key={blog.slug} href={`/blogs/${blog.slug}`}>
						<div className={styles.blogCard}>
							<h3>{blog.title}</h3>
							<p>{blog.description}</p>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};
