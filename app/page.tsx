import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";
// For Github Pages
import nextConfig from "../next.config.mjs";
const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : "";

export default () => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>CA技研ホーム</h1>
      </header>
      <div className={styles.description}>
        <div>
          <Image
            src={`${BASE_PATH}/ca5.png`}
            alt="CA-Giken Logo"
            className={styles.vercelLogo}
            width={100}
            height={100}
            priority
          />
        </div>
      </div>

      <div className={styles.grid}>
        <Link
          href="/aboutus"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            会社情報
          </h2>
        </Link>
      </div>
    </main>
  );
}
