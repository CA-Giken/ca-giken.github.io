import type { MarkdownData } from "@/app/markdown-fetch";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
	product: MarkdownData;
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<Link href={`/products/${product.slug}`} className={styles.card}>
			<div className={styles.imageContainer}>
				<Image
					src={product.image}
					alt={product.title}
					width={400}
					height={300}
					className={styles.image}
				/>
			</div>
			<div className={styles.content}>
				<h2 className={styles.title}>{product.title}</h2>
				<p className={styles.description}>{product.description}</p>
			</div>
		</Link>
	);
}
