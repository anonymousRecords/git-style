import { generateThemedSVG } from "@/lib/svg-generator";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { username, theme: themeQuery } = req.query;
	const theme = typeof themeQuery === "string" ? themeQuery : "hair";

	if (typeof username !== "string") {
		res.status(400).send("Invalid username");
		return;
	}

	try {
		const svg = await generateThemedSVG(username, theme);
		res.setHeader("Content-Type", "image/svg+xml");
		res.setHeader("Cache-Control", "s-maxage=86400");
		res.status(200).send(svg);
	  } catch (error) {
		console.error("[SVG GENERATION ERROR]", error);
		res.status(500).send("Internal Server Error");
	  }
}
