import type { NextApiRequest, NextApiResponse } from "next";
import type { FlowerType } from "@/lib/animation/types";
import { generatePlantAPNG } from "@/lib/theme/generator/generate-plant-apng";

export const config = {
	api: {
		responseLimit: false,
	},
};

const VALID_FLOWER_TYPES: FlowerType[] = [
	"default",
	"tulip",
	"sunflower",
	"cherry",
];

function isValidFlowerType(value: unknown): value is FlowerType {
	return (
		typeof value === "string" &&
		VALID_FLOWER_TYPES.includes(value as FlowerType)
	);
}

function isValidHexColor(value: unknown): value is string {
	return typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { username, flower, color } = req.query;

	if (typeof username !== "string") {
		res.status(400).send("Invalid username");
		return;
	}

	const flowerType: FlowerType = isValidFlowerType(flower) ? flower : "default";
	const flowerColor: string | undefined = isValidHexColor(color)
		? color
		: undefined;

	try {
		const apngData = await generatePlantAPNG({
			username,
			quality: "low",
			flowerType,
			flowerColor,
		});

		res.setHeader("Content-Type", "image/png");
		res.setHeader("Cache-Control", "public, s-maxage=86400, max-age=3600");
		res.setHeader("Content-Length", apngData.length);
		res.status(200).send(Buffer.from(apngData));
	} catch (error) {
		console.error("[APNG GENERATION ERROR]", error);
		res.status(500).send("Internal Server Error");
	}
}
