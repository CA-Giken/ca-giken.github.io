import type { MarkdownData } from "@/app/markdown-fetch";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

interface CardProps {
	blog: MarkdownData;
}

export default function ProductCard({ blog }: CardProps) {
	return (
		<Link href={`/blogs/${blog.slug}`} className={styles.card}>
			<div className={styles.imageContainer}>
				<Image
					src={blog.image}
					alt={blog.title}
					width={400}
					height={300}
					className={styles.image}
				/>
			</div>
			<div className={styles.content}>
				<h2 className={styles.title}>{blog.title}</h2>
				<p className={styles.description}>{blog.description}</p>
			</div>
		</Link>
	);
}
