import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  name: string;
  href: string;
}

export const BreadcrumbList = async ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <>
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => (
          <li className={styles.breadcrumbItem} key={`breadcrumb-${item.href}`}>
            {"> "}
            {index < items.length - 1 ? (<Link href={item.href} className={styles.breadcrumbItemLink}>{item.name}</Link>) : (item.name)}
          </li>
        ))}
      </ol>
    </>
  )
}