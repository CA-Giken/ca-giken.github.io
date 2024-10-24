import Image from "next/image";
import Link from "next/link";
import styles from "./SmallCard.module.css";

export const SmallCard = ({
	title,
	image,
	href,
	description,
}: {
	title: string;
	image: string;
	href: string;
	description: string;
}) => {
	return (
		// <Link href={href}>
		<div className={styles.card}>
			<Image
				alt={title}
				src={image}
				quality={100}
				width={128}
				height={128}
				className={styles.cardImage}
			/>
			<h3 className={styles.cardTitle}>{title}</h3>
			<p className={styles.description}>{description}</p>
		</div>
		// </Link>
	);
};

export const SmallCardGrid = ({ children }: { children: React.ReactNode }) => {
	return <div className={styles.grid}>{children}</div>;
};
