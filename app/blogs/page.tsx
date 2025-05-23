import { baseUrl, blogsDirectory, siteInfo } from "@/constants/info";
import BlogCard from "../components/BlogCard.";
import { BreadcrumbList } from "../components/Breadcrumb";
import GridView from "../components/Grid";
import { type MarkdownData, getAllContent } from "../markdown-fetch";
import styles from "./page.module.css";

const title = `ニュース - ${siteInfo.title}`;
const description = "CA技研からのお知らせです。";

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
	const breadcrumbs = [
		{
			name: "ホーム",
			href: "/",
		},
		{
			name: "ニュース",
			href: "/blogs",
		},
	];

	return (
		<div className={styles.container}>
			<BreadcrumbList items={breadcrumbs} />
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
