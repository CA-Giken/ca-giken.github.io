import Image from "next/image";
import styles from "./page.module.css";

import {
	baseUrl,
	blogsDirectory,
	productsDirectory,
	siteInfo,
} from "@/constants/info";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import nextConfig from "../next.config.mjs";
import BlogCard from "./components/BlogCard.";
import { ButtonLink } from "./components/ButtonLink";
import { FeaturedTopics } from "./components/FeaturedTopics";
import GridView from "./components/Grid";
import { HomeJsonLd } from "./components/HomeJsonLd";
import ProductCard from "./components/ProductCard";
import { SmallCard, SmallCardGrid } from "./components/SmallCard";
import { getAllContent } from "./markdown-fetch";

// For Github Pages
const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : "";

const description = "Going to the Edge";

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
				<div className={styles.imageMask} />
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>Going to the Edge.</h1>
					<p className={styles.description}>CA技研は「エッジコンピューティング」の「先」を目指します</p>
					<ButtonLink label={"お問い合わせ"} href={"/contactus"} />
				</div>
			</section>
			<section className={styles.hero}>
				<h2 className={styles.subheader}>トピックス</h2>
				<FeaturedTopics
					articles={[
						{
							title: "制御盤キャビネット型PC「CAPC」v1.0 リリース",
							href: "/products/capc",
							image: "",
							description:
								"弊社製品「CAPC」は、製造現場に最適化された高性能PCの製造・販売を行っております。3D や AI などの先端デジタル技術導入に最適なPCです。",
						},
						{
							title: "AIパッケージ「CAPC AI」v1.0 リリース",
							href: "/products/capc-ai",
							image: "",
							description:
								"音声認識をはじめとするAIパッケージを提供しております。",
						},

					]}
				/>
			</section>
			<section className={styles.hero}>
				<h2 className={styles.subheader}>
					CA技研の「エッジコンピューティング」
				</h2>
				<div className={styles.content}>
					<SmallCardGrid>
						<SmallCard
							title={"エッジAI"}
							href={"/products/capc_ai"}
							description={"音声認識や物体検知など最新AIパッケージを現場に導入"}
						/>
						<SmallCard
							title={"RTOS"}
							href={"/products/ardcuino"}
							description={"いまmmスケール世界の「RTOS」が熱い! FreeRTOS,mbedOS…など各種RTOSを導入"}
						/>
						<SmallCard
							title={"UI/UX"}
							href={"/products/ros-gui"}
							description={"Easy & Cool! エッジのUIを一新"}
						/>
					</SmallCardGrid>
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
					<div className={styles.readmore}>
						<Link
							href="/products"
							style={{ display: "inline-flex", alignItems: "center" }}
						>
							<FontAwesomeIcon
								icon={faArrowRight}
								width={20}
								style={{ marginRight: "4px" }}
							/>
							すべての製品を見る
						</Link>
					</div>
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
					<div className={styles.readmore}>
						<Link
							href="/blogs"
							style={{ display: "inline-flex", alignItems: "center" }}
						>
							<FontAwesomeIcon
								icon={faArrowRight}
								size="lg"
								width={20}
								alignmentBaseline="baseline"
								style={{ marginRight: "4px" }}
							/>{" "}
							すべてのニュースを見る
						</Link>
					</div>
				</div>
			</section>
			<HomeJsonLd />
		</div>
	);
};
