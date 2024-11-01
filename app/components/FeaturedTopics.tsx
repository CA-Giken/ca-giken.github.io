import Image from "next/image";
import Link from "next/link";
// FeaturedTopics.jsx
import styles from "./FeaturedTopics.module.css";

export type TopicProps = {
	title: string;
	href: string;
	image: string;
	description: string;
};

export const FeaturedTopics = async ({
	articles,
}: { articles: TopicProps[] }) => {
	if (!articles || articles.length < 3) {
		return null;
	}

	const [mainArticle, ...subArticles] = articles;

	return (
		<div className={styles.grid}>
			<article className={styles.mainArticle}>
				<Link href={mainArticle.href}>
					<div className={styles.imageWrapper}>
						<Image
							src={mainArticle.image}
							alt={mainArticle.title}
							fill
							sizes={"(max-width: 768px) 100vw, 50vw"}
							className={styles.image}
						/>
					</div>
					<div className={styles.mainContent}>
						<h3 className={styles.title}>{mainArticle.title}</h3>
						<p className={styles.description}>{mainArticle.description}</p>
						<div className={styles.readmore}>詳細を見る</div>
					</div>
				</Link>
			</article>
			<div className={styles.subArticles}>
				{subArticles.map((article) => (
					<article key={article.title} className={styles.subArticle}>
						<Link href={article.href}>
							{/* <div className={styles.imageWrapper}>
								<Image
									src={article.image}
									alt={article.title}
									fill
									sizes="(max-width: 768px) 100vw, 25vw"
									className={styles.image}
								/>
							</div> */}
							<div className={styles.content}>
								<h3 className={styles.subTitle}>{article.title}</h3>
								<p className={styles.description}>{article.description}</p>
								<div className={styles.readmore}>詳細を見る</div>
							</div>
						</Link>
					</article>
				))}
			</div>
		</div>
	);
};
