import { baseUrl } from "@/constants/info";
import { Metadata, type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const url = baseUrl || "";
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: ["/_next", "/api"],
		},
		sitemap: `${url}/sitemap.xml`,
	};
}