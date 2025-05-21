import Image from "next/image";
import Link from "next/link";
import styles from "./ToolCard.module.css";

export const ToolCard = ({
	title,
	description,
	href,
	image,
}: {
	title: string;
	description: string;
	href: string;
	image: string;
}) => {
	return (
		<Link href={href} className={styles.card}>
			<div className={styles.imageContainer}>
				<Image
					src={image}
					alt={title}
					width={400}
					height={300}
					className={styles.image}
				/>
			</div>
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.description}>{description}</p>
			</div>
		</Link>
	);
};
