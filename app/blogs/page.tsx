import { baseUrl, blogsDirectory, siteInfo } from "@/constants/info";
import BlogCard from "../components/BlogCard.";
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
		images: ["/images/ogp.png"],
	},
};

export default async () => {
	const blogs: MarkdownData[] = await getAllContent(blogsDirectory);

	return (
		<div className="container">
			<h1>CA技研ニュース</h1>
			<GridView>
				{blogs.map((blog) => (
					<BlogCard key={blog.slug} data={blog} />
				))}
			</GridView>
		</div>
	);
};
