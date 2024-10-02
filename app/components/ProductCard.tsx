import type { MarkdownData } from "@/app/markdown-fetch";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
	data: MarkdownData;
}

export default function ProductCard({ data }: ProductCardProps) {
	return (
		<Link href={`/products/${data.slug}`} className={styles.card}>
			<div className={styles.imageContainer}>
				<Image
					src={data.image}
					alt={data.title}
					width={400}
					height={300}
					className={styles.image}
				/>
			</div>
			<div className={styles.content}>
				<h2 className={styles.title}>{data.title}</h2>
				<p className={styles.description}>{data.description}</p>
			</div>
		</Link>
	);
}
