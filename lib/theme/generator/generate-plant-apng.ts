import { createCanvas } from "@napi-rs/canvas";
import { chunkIntoWeeks, fetchContributions } from "@/lib/github";
import { getCommitLevel } from "@/lib/themes";
import { type APNGFrame, encodeAPNG } from "../../animation/apng-encoder";
import type { AnimationConfig, WindEffect } from "../../animation/types";
import { QUALITY_PRESETS } from "../../animation/types";
import {
	createPlantElements,
	getCanvasDimensions,
	renderPlantFrame,
} from "../renderer/render-plant";

const cache = new Map<string, { data: Uint8Array; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function generatePlantAPNG(
	username: string,
	quality: AnimationConfig["quality"] = "low",
): Promise<Uint8Array> {
	const cacheKey = `${username}-${quality}`;

	const cached = cache.get(cacheKey);

	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		return cached.data;
	}

	const frames: APNGFrame[] = [];
	const { frameCount, frameDelay } = QUALITY_PRESETS[quality];

	const weeks = chunkIntoWeeks(await fetchContributions(username));
	const { width, height } = getCanvasDimensions(weeks.length);

	for (let i = 0; i < frameCount; i++) {
		const canvas = createCanvas(width, height);
		const ctx = canvas.getContext("2d");

		renderPlantFrame({
			canvas,
			ctx,
			elements: createPlantElements(weeks, getCommitLevel),
			frameIndex: i,
			totalFrames: frameCount,
			windEffect: getWindEffect(width),
			username,
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

function getWindEffect(width: number): WindEffect {
	return {
		amplitude: 8,
		frequency: 1,
		getPhaseOffset: (x: number, _y: number) => {
			return (x / width) * 0.5;
		},
	};
}
