import styles from "./Grid.module.css";

export default function GridView({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <div className={styles.grid}>{children}</div>;
}
