import type { NextApiRequest, NextApiResponse } from "next";
import { generatePlantAPNG } from "@/lib/theme/generator/generate-plant-apng";

export const config = {
	api: {
		responseLimit: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { username } = req.query;

	if (typeof username !== "string") {
		res.status(400).send("Invalid username");
		return;
	}

	// TODO : theme
	// TODO : qualityQuery

	try {
		const apngData = await generatePlantAPNG(username, "low");

		res.setHeader("Content-Type", "image/png");
		res.setHeader("Cache-Control", "public, s-maxage=86400, max-age=3600");
		res.setHeader("Content-Length", apngData.length);
		res.status(200).send(Buffer.from(apngData));
	} catch (error) {
		console.error("[APNG GENERATION ERROR]", error);
		res.status(500).send("Internal Server Error");
	}
}
