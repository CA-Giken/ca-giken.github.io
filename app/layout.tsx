import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CA技研",
	description: "CA技研の公式サイトです。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={inter.className}>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
			<GoogleAnalytics gaId="G-EFCPEVFF6" />
		</html>
	);
}
