import styles from "./Button.module.css";

type Props = {
  label: string;
  onClick: () => void;
}

export const Button = (props: Props) => {
  const { onClick, label } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button}
    >
      {label}
    </button>
  )
}