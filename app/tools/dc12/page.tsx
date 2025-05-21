"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";

// クライアントサイドでのみ読み込むコンポーネント
const DynamicDC12Tool = dynamic(
	() => import("./components/ClientDC12Tool").then((mod) => mod.ClientDC12Tool),
	{ ssr: false }, // サーバーサイドレンダリングを無効にする
);

export default () => {
	return <DynamicDC12Tool />;
};
