import { baseUrl, siteInfo } from "@/constants/info";
import { BreadcrumbList } from "../components/Breadcrumb";
import GridView from "../components/Grid";
import { ToolCard } from "./ToolCard";
import styles from "./page.module.css";

const title = `オンラインツール一覧 - ${siteInfo.title}`;
const description = "オンライン上で使用可能なCA技研のツール一覧です。";

export const metadata = {
	title: title,
	description: description,
	alternates: {
		canonical: `${baseUrl}/tools`,
	},
	openGraph: {
		type: "website",
		siteName: siteInfo.title,
		title: title,
		description: description,
		images: [
			{
				url: `${baseUrl}/images/ogp.png`,
				width: 1200,
				height: 630,
				alt: "CA技研",
			},
		],
	},
};

export default async () => {
	const tools = [
		{
			slug: "dc12",
			frontMatter: {
				title: "DC12 Tool",
				description: "DC12 Tool",
				category: "DC12",
				image: "/images/dc12tool.png",
				archived: false,
			},
		},
	];

	return (
		<div className={styles.container}>
			<BreadcrumbList items={[{ name: "オンラインツール", href: "/tools" }]} />
			<h1>オンラインツール一覧</h1>
			<GridView>
				{tools
					.filter((tool) => !tool.frontMatter.archived)
					.map((tool) => (
						<ToolCard
							key={tool.slug}
							title={tool.frontMatter.title}
							description={tool.frontMatter.description}
							href={`/tools/${tool.slug}`}
							image={tool.frontMatter.image}
						/>
					))}
			</GridView>
		</div>
	);
};
