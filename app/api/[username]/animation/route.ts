import { type NextRequest, NextResponse } from "next/server";
import { generateFlowerAPNG } from "@/lib/themes/flower/generator";
import { generateHairAPNG } from "@/lib/themes/hair/generator";
import type { FlowerType, HairCurliness } from "@/lib/themes/types";

type ThemeGenerator = (options: {
	username: string;
	quality: "low" | "medium" | "high";
	[key: string]: unknown;
}) => Promise<Uint8Array>;

type ThemeConfig = {
	generator: ThemeGenerator;
	parseOptions: (params: URLSearchParams) => Record<string, unknown>;
};

const VALID_FLOWER_TYPES: FlowerType[] = [
	"default",
	"tulip",
	"sunflower",
	"cherry",
];

const VALID_CURLINESS: HairCurliness[] = ["straight", "wavy", "curly"];

function isValidFlowerType(value: unknown): value is FlowerType {
	return (
		typeof value === "string" &&
		VALID_FLOWER_TYPES.includes(value as FlowerType)
	);
}

function isValidCurliness(value: unknown): value is HairCurliness {
	return (
		typeof value === "string" &&
		VALID_CURLINESS.includes(value as HairCurliness)
	);
}

function isValidHexColor(value: unknown): value is string {
	return typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value);
}

const THEME_CONFIGS: Record<string, ThemeConfig> = {
	flower: {
		generator: generateFlowerAPNG,
		parseOptions: (params) => ({
			flowerType: isValidFlowerType(params.get("flower"))
				? params.get("flower")
				: "default",
			flowerColor: isValidHexColor(params.get("color"))
				? params.get("color")
				: undefined,
		}),
	},
	hair: {
		generator: generateHairAPNG,
		parseOptions: (params) => ({
			hairColor: isValidHexColor(params.get("color"))
				? params.get("color")
				: undefined,
			curliness: isValidCurliness(params.get("curliness"))
				? params.get("curliness")
				: "straight",
		}),
	},
};

const DEFAULT_THEME = "flower";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ username: string }> },
) {
	const { username } = await params;

	if (!username) {
		return new NextResponse("Invalid username", { status: 400 });
	}

	const searchParams = request.nextUrl.searchParams;
	const theme = searchParams.get("theme") || DEFAULT_THEME;

	const themeConfig = THEME_CONFIGS[theme] || THEME_CONFIGS[DEFAULT_THEME];

	try {
		const themeOptions = themeConfig.parseOptions(searchParams);

		const apngData = await themeConfig.generator({
			username,
			quality: "low",
			...themeOptions,
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
