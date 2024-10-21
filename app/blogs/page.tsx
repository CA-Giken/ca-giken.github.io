import { baseUrl, blogsDirectory, siteInfo } from "@/constants/info";
import BlogCard from "../components/BlogCard.";
import GridView from "../components/Grid";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

const title = `ニュース - ${siteInfo.title}`;
const description = "CA技研からのお知らせです。";

export const breadcrumbs = [
	{
		name: "ホーム",
		href: "/",
	},
	{
		name: "製品紹介・開発事例",
		href: "/products",
	}
]

export const metadata = {
	title: title,
	description: description,
	alternates: {
		canonical: `${baseUrl}/blogs`,
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
	const blogs: MarkdownData[] = await getAllContent(blogsDirectory);

	return (
		<div className={styles.container}>
			<h1>CA技研ニュース</h1>
			<section>
				<GridView>
					{blogs.map((blog) => (
						<BlogCard key={blog.slug} data={blog} />
					))}
				</GridView>
			</section>
		</div>
	);
};
