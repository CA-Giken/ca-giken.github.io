import Link from "next/link";
import styles from "./Button.module.css";

type Props = {
  label: string;
  href: string;
}

export const ButtonLink = (props: Props) => {
  const { href, label } = props;
  return (
    <Link
      href={href}
      className={styles.button}
    >
      {label}
    </Link>
  )
}