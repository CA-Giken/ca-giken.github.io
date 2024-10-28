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
import GridView from "./components/Grid";
import { HomeJsonLd } from "./components/HomeJsonLd";
import ProductCard from "./components/ProductCard";
import { SmallCard, SmallCardGrid } from "./components/SmallCard";
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
				<div className={styles.imageMask} />
				<div className={styles.titleContainer}>
					<h1 className={styles.title}>製造設備・プロセスをDX</h1>
					<p className={styles.description}>
						CA技研は「
						<Link
							href="/products/reinnovation"
							className={styles.descriptionLink}
						>
							自動化リノベーション
						</Link>
						」で実現します
					</p>
					<ButtonLink label={"お問い合わせ"} href={"/contactus"} />
				</div>
			</section>
			<section className={styles.hero}>
				<h2 className={styles.subheader}>自動化リノベーション とは</h2>
				<div className={styles.content}>
					<p>
						リフォームが「保守」にあたるもの対して、リノベーションは「改造」や
						「DX」(トランスフォーム)にあたるものと、私たちは捉えています。
					</p>
					<p>
						CA技研は、設備・プロセスの リノベーション
						を推進することで、日本の製造業の競争力アップに貢献します。
					</p>
					<Link href="/products/reinnovation" className={styles.link}>
						<p>私たちの「自動化リノベーション」への取り組みを詳しく見る</p>
					</Link>
				</div>
			</section>
			<section className={styles.hero}>
				<h2 className={styles.subheader}>
					CA技研は製造現場の技術革新を後押しします
				</h2>
				<div className={styles.content}>
					<SmallCardGrid>
						<SmallCard
							title={"エッジAIの導入"}
							href={"/products/capc_ai"}
							description={"音声認識や物体検知など最新AIパッケージを現場に導入"}
						/>
						<SmallCard
							title={"ロボットの高度\nインテグレーション"}
							href={"/products/renovation"}
							description={
								"3Dカメラやロボットのインテグレーションをハード・ソフトで支援"
							}
						/>
						<SmallCard
							title={"PoC・\nプロトタイプ開発"}
							href={"/products/renovation"}
							description={"新技術の導入検証やプロトタイプ開発を迅速対応"}
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
