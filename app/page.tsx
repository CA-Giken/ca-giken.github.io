import Image from "next/image";
import styles from "./page.module.css";

import Link from "next/link";
// For Github Pages
import nextConfig from "../next.config.mjs";
const BASE_PATH = nextConfig.basePath ? nextConfig.basePath : "";

export default () => {
  return (
    <main className={styles.main}>
      <section className={styles.intro}>
        <Image
          src={`${BASE_PATH}/ca5.png`}
          alt="CA-Giken Logo"
          className={styles.vercelLogo}
          width={100}
          height={100}
          priority
        />
        <h1 className={styles.title}>CA技研</h1>
        <h4>
          自動化リノベーションのための研究開発を行っています。
        </h4>
      </section>

      <section className={styles.content}>
        <h2>
          事業内容
        </h2>
        <div className={styles.grid}>
          <Link
            href="/products"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              製品一覧
            </h2>
            <p>
              OSS
              ハードウェア
              研究開発
              ユーザーサポート
            </p>
          </Link>
          <Link
            href="/products"
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2>
              導入実績
            </h2>
            <p>
              これまでの実績を紹介
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
