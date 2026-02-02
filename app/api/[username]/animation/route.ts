import { type NextRequest, NextResponse } from "next/server";
import { generatePlantAPNG } from "@/lib/themes/plant/generator";
import type { FlowerType } from "@/lib/themes/types";

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

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ username: string }> },
) {
	const { username } = await params;
	const searchParams = request.nextUrl.searchParams;
	const flower = searchParams.get("flower");
	const color = searchParams.get("color");

	if (!username) {
		return new NextResponse("Invalid username", { status: 400 });
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

		return new NextResponse(Buffer.from(apngData), {
			status: 200,
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, s-maxage=86400, max-age=3600",
				"Content-Length": apngData.length.toString(),
			},
		});
	} catch (error) {
		console.error("[APNG GENERATION ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
