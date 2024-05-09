import type { APIContext, InferGetStaticPropsType } from "astro";

import RobotoMonoBold from "@/assets/roboto-mono-700.ttf";
import RobotoMono from "@/assets/roboto-mono-regular.ttf";
import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site-config";
import { getFormattedDate } from "@/utils";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

const ogOptions: SatoriOptions = {
	// debug: true,
	fonts: [
		{
			data: Buffer.from(RobotoMono),
			name: "Roboto Mono",
			style: "normal",
			weight: 400,
		},
		{
			data: Buffer.from(RobotoMonoBold),
			name: "Roboto Mono",
			style: "normal",
			weight: 700,
		},
	],
	height: 630,
	width: 1200,
};

const markup = (description: string, title: string, pubDate: string) =>
	html`<div tw="flex flex-col w-full h-full bg-[#141E46] text-[#FFF5E0]">
		<div tw="flex flex-col flex-1 w-full p-10 justify-center">
			<p tw="text-3xl mb-6 text-[#FF0080]">${pubDate}</p>
			<h1 tw="text-6xl font-bold leading-snug text-[#8DECB4]">${title}</h1>
			<h2 tw="mt--3 text-3xl font-bold leading-snug text-[#FFF5E0]">${description}</h2>
		</div>
		<div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
			<div tw="flex items-center">
				<svg height="60" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
					<path d="M200,300 L400,50 L600,300 L800,550 L1000,300" fill="none" stroke="#FFF5E0" stroke-width="15" />
				  <path d="M200,300 Q400,50 600,300 T1000,300" fill="none" stroke="#FF0080" stroke-width="35"  />
				  <!-- End points -->
				  <g fill="#8DECB4" >
						<circle cx="200" cy="300" r="30"/>
						<circle cx="600" cy="300" r="30"/>
						<circle cx="1000" cy="300" r="30"/>
					</g>
					<!-- Control points and lines from end points to control points -->
					<g fill="#8DECB4" >
						<circle cx="400" cy="50" r="30"/>
						<circle cx="800" cy="550" r="30"/>
				  </g>
				</svg>
				<p tw="text-3xl ml-2 font-semibold">${siteConfig.title}</p>
			</div>
			<p tw="text-3xl font-semibold">oscargicast.com</p>
		</div>
	</div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export async function GET(context: APIContext) {
	const { description, pubDate, title } = context.props as Props;

	const postDate = getFormattedDate(pubDate, {
		month: "long",
		weekday: "long",
	});
	const svg = await satori(markup(description, title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();
	return new Response(png, {
		headers: {
			"Cache-Control": "public, max-age=31536000, immutable",
			"Content-Type": "image/png",
		},
	});
}

export async function getStaticPaths() {
	const posts = await getAllPosts();
	return posts
		.filter(({ data }) => !data.ogImage)
		.map((post) => ({
			params: { slug: post.slug },
			props: {
				description: post.data.description,
				pubDate: post.data.updatedDate ?? post.data.publishDate,
				title: post.data.title,
			},
		}));
}
