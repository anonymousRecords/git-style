import { createCanvas } from "@napi-rs/canvas";
import { chunkIntoWeeks, fetchContributions } from "@/lib/api/github";
import { type APNGFrame, encodeAPNG } from "@/lib/encoding/apng";
import { getCommitLevel } from "@/lib/utils/commit-level";
import type { AnimationConfig, HairCurliness } from "../types";
import { QUALITY_PRESETS } from "../types";
import {
	createHairElements,
	getCanvasDimensions,
	renderHairFrame,
} from "./renderer";

const cache = new Map<string, { data: Uint8Array; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface GenerateHairAPNGOptions {
	username: string;
	quality?: AnimationConfig["quality"];
	hairColor?: string;
	curliness?: HairCurliness;
}

export async function generateHairAPNG(
	options: GenerateHairAPNGOptions | string,
	quality: AnimationConfig["quality"] = "low",
): Promise<Uint8Array> {
	// Support both old signature (username, quality) and new options object
	const opts: GenerateHairAPNGOptions =
		typeof options === "string" ? { username: options, quality } : options;

	const {
		username,
		quality: q = "low",
		hairColor = "#3d2817",
		curliness = "straight",
	} = opts;

	const cacheKey = `${username}-${q}-${hairColor}-${curliness}`;

	const cached = cache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.data;
	}

	const frames: APNGFrame[] = [];
	const { frameCount, frameDelay } = QUALITY_PRESETS[q];

	const weeks = chunkIntoWeeks(await fetchContributions(username));
	const { width, height } = getCanvasDimensions(weeks.length);

	for (let i = 0; i < frameCount; i++) {
		const canvas = createCanvas(width, height);
		const ctx = canvas.getContext("2d");

		renderHairFrame({
			canvas,
			ctx,
			elements: createHairElements(weeks, getCommitLevel),
			frameIndex: i,
			totalFrames: frameCount,
			username,
			hairColor,
			curliness,
		});

		const pngBuffer = canvas.toBuffer("image/png");

		frames.push({
			data: pngBuffer,
			width,
			height,
		});
	}

	const apngData = encodeAPNG(frames, frameDelay);

	cache.set(cacheKey, { data: apngData, timestamp: Date.now() });

	cleanCache();

	return apngData;
}

function cleanCache(): void {
	const now = Date.now();
	for (const [key, value] of cache.entries()) {
		if (now - value.timestamp > CACHE_TTL) {
			cache.delete(key);
		}
	}
}
