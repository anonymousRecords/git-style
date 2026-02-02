import type { Canvas, SKRSContext2D } from "@napi-rs/canvas";
import type { CommitLevel } from "@/lib/utils/commit-level";
import { adjustBrightness } from "@/lib/utils/color";
import type { FlowerType, PlantElement, WindEffect } from "../types";
import { CELL_SIZE, OFFSET_X, OFFSET_Y, PLANT_COLORS } from "./constants";

export function createPlantElements(
	weeks: { count: number }[][],
	getCommitLevel: (count: number) => CommitLevel,
): PlantElement[] {
	const elements: PlantElement[] = [];

	weeks.forEach((week, weekIndex) => {
		week.forEach((day, dayIndex) => {
			const level = getCommitLevel(day.count);
			elements.push({
				x: OFFSET_X + weekIndex * CELL_SIZE,
				y: OFFSET_Y + dayIndex * CELL_SIZE,
				level,
				weekIndex,
				dayIndex,
			});
		});
	});

	return elements;
}

interface RenderPlantFrameProps {
	canvas: Canvas;
	ctx: SKRSContext2D;
	elements: PlantElement[];
	frameIndex: number;
	totalFrames: number;
	windEffect: WindEffect;
	username: string;
	flowerType?: FlowerType;
	flowerColor?: string;
}

export function renderPlantFrame({
	canvas,
	ctx,
	elements,
	frameIndex,
	totalFrames,
	windEffect,
	username,
	flowerType = "default",
	flowerColor,
}: RenderPlantFrameProps): void {
	const width = canvas.width;
	const height = canvas.height;

	drawSoilBackground(ctx, width, height);

	// Title
	ctx.fillStyle = "#ffffff";
	ctx.font = "16px sans-serif";
	ctx.fillText(`${username}'s Plant`, OFFSET_X, 30);

	// Animation progress (0 ~ 1)
	const progress = frameIndex / totalFrames;

	// Plant
	elements.forEach((element) => {
		if (element.level === "none") {
			ctx.fillStyle = "#9ca3af";
			ctx.beginPath();
			ctx.arc(element.x, element.y, 2, 0, Math.PI * 2);
			ctx.fill();
			return;
		}

		const phaseOffset = windEffect.getPhaseOffset(element.x, element.y);
		const windAngle =
			Math.sin((progress + phaseOffset) * Math.PI * 2 * windEffect.frequency) *
			windEffect.amplitude;

		drawPlant(
			ctx,
			element.x,
			element.y,
			element.level,
			windAngle,
			flowerType,
			flowerColor,
		);
	});
}

function drawSoilBackground(
	ctx: SKRSContext2D,
	width: number,
	height: number,
): void {
	// Soil color
	ctx.fillStyle = PLANT_COLORS.soil;
	ctx.fillRect(0, 0, width, height);

	// Soil texture
	const patternWidth = 40;
	const patternHeight = 40;

	for (let x = 0; x < width; x += patternWidth) {
		for (let y = 0; y < height; y += patternHeight) {
			// Ellipses (darker spots)
			ctx.fillStyle = "rgba(169, 124, 80, 0.65)";
			drawEllipse(ctx, x + 8.2, y + 7.1, 5.1, 2.2);

			ctx.fillStyle = "rgba(198, 156, 109, 0.55)";
			drawEllipse(ctx, x + 30.5, y + 15.7, 3.8, 2.9);

			ctx.fillStyle = "rgba(141, 103, 72, 0.60)";
			drawEllipse(ctx, x + 20.1, y + 35.2, 4.2, 1.7);

			ctx.fillStyle = "rgba(188, 161, 122, 0.70)";
			drawEllipse(ctx, x + 12.7, y + 28.3, 2.9, 1.2);

			// Small circles (pebbles)
			ctx.fillStyle = "rgba(249, 228, 183, 0.80)";
			ctx.beginPath();
			ctx.arc(x + 5.2, y + 5.8, 1.7, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = "rgba(246, 210, 139, 0.60)";
			ctx.beginPath();
			ctx.arc(x + 13.1, y + 11.2, 1.1, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = "rgba(249, 228, 183, 0.90)";
			ctx.beginPath();
			ctx.arc(x + 32.3, y + 8.4, 1.3, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = "rgba(188, 161, 122, 0.70)";
			ctx.beginPath();
			ctx.arc(x + 18.7, y + 25.6, 1.2, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = "rgba(169, 124, 80, 0.80)";
			ctx.beginPath();
			ctx.arc(x + 36.2, y + 36.1, 1.5, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}

function drawEllipse(
	ctx: SKRSContext2D,
	cx: number,
	cy: number,
	rx: number,
	ry: number,
): void {
	ctx.beginPath();
	ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
	ctx.fill();
}

function drawPlant(
	ctx: SKRSContext2D,
	x: number,
	y: number,
	level: CommitLevel,
	windAngle: number,
	flowerType: FlowerType = "default",
	flowerColor?: string,
): void {
	ctx.save();
	ctx.translate(x, y);

	// Wind rotation
	const radians = (windAngle * Math.PI) / 180;

	switch (level) {
		case "low":
			drawSprout(ctx, radians);
			break;
		case "medium":
			drawSeedling(ctx, radians);
			break;
		case "high":
			drawGrass(ctx, radians);
			break;
		case "max":
			drawFlower(ctx, radians, flowerType, flowerColor);
			break;
	}

	ctx.restore();
}

// Level: low - single short stem
function drawSprout(ctx: SKRSContext2D, windRadians: number): void {
	ctx.save();
	ctx.rotate(windRadians * 0.5);

	ctx.strokeStyle = PLANT_COLORS.stem.light;
	ctx.lineWidth = 2;
	ctx.lineCap = "round";

	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.quadraticCurveTo(1, -4, 0, -8);
	ctx.stroke();

	ctx.restore();
}

// Level: medium - 3 stems
function drawSeedling(ctx: SKRSContext2D, windRadians: number): void {
	const stems = [
		{ angle: -0.3, height: 10, curve: -2 },
		{ angle: 0, height: 12, curve: 1 },
		{ angle: 0.3, height: 10, curve: 2 },
	];

	ctx.strokeStyle = PLANT_COLORS.stem.light;
	ctx.lineWidth = 2;
	ctx.lineCap = "round";

	stems.forEach((stem) => {
		ctx.save();
		ctx.rotate(stem.angle + windRadians * 0.7);

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.quadraticCurveTo(stem.curve, -stem.height / 2, 0, -stem.height);
		ctx.stroke();

		ctx.restore();
	});
}

// Level: high - 5 stems (fuller grass)
function drawGrass(ctx: SKRSContext2D, windRadians: number): void {
	const stems = [
		{ angle: -0.5, height: 12, curve: -3 },
		{ angle: -0.25, height: 14, curve: -1 },
		{ angle: 0, height: 16, curve: 1 },
		{ angle: 0.25, height: 14, curve: 2 },
		{ angle: 0.5, height: 12, curve: 3 },
	];

	ctx.lineWidth = 2;
	ctx.lineCap = "round";

	stems.forEach((stem, i) => {
		ctx.save();
		ctx.rotate(stem.angle + windRadians * 0.9);

		ctx.strokeStyle =
			i === 2 ? PLANT_COLORS.stem.dark : PLANT_COLORS.stem.light;

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.quadraticCurveTo(stem.curve, -stem.height / 2, 0, -stem.height);
		ctx.stroke();

		ctx.restore();
	});
}

// Level: max - grass with flower
function drawFlower(
	ctx: SKRSContext2D,
	windRadians: number,
	flowerType: FlowerType = "default",
	flowerColor?: string,
): void {
	// Draw grass base first
	const stems = [
		{ angle: -0.4, height: 10, curve: -2 },
		{ angle: -0.2, height: 12, curve: -1 },
		{ angle: 0, height: 18, curve: 0, isFlowerStem: true },
		{ angle: 0.2, height: 12, curve: 1 },
		{ angle: 0.4, height: 10, curve: 2 },
	];

	ctx.lineWidth = 2;
	ctx.lineCap = "round";

	let flowerPos = { x: 0, y: -18 };

	stems.forEach((stem) => {
		ctx.save();
		ctx.rotate(stem.angle + windRadians);

		ctx.strokeStyle = stem.isFlowerStem
			? PLANT_COLORS.stem.dark
			: PLANT_COLORS.stem.light;

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.quadraticCurveTo(stem.curve, -stem.height / 2, 0, -stem.height);
		ctx.stroke();

		if (stem.isFlowerStem) {
			const flowerX = Math.sin(stem.angle + windRadians) * stem.height;
			const flowerY = -Math.cos(stem.angle + windRadians) * stem.height;
			flowerPos = { x: flowerX, y: flowerY };
		}

		ctx.restore();
	});

	ctx.save();
	ctx.translate(flowerPos.x, flowerPos.y);
	ctx.rotate(windRadians * 0.5);

	switch (flowerType) {
		case "tulip":
			drawTulipHead(ctx, flowerColor);
			break;
		case "sunflower":
			drawSunflowerHead(ctx, flowerColor);
			break;
		case "cherry":
			drawCherryBlossomHead(ctx, flowerColor);
			break;
		default:
			drawDefaultFlowerHead(ctx, flowerColor);
			break;
	}

	ctx.restore();
}

// Default flower
function drawDefaultFlowerHead(ctx: SKRSContext2D, color?: string): void {
	const petalColor = color || PLANT_COLORS.flower;
	ctx.fillStyle = petalColor;
	const petalCount = 5;
	const petalRadius = 3;

	for (let i = 0; i < petalCount; i++) {
		const petalAngle = (i / petalCount) * Math.PI * 2;
		const px = Math.cos(petalAngle) * 3;
		const py = Math.sin(petalAngle) * 3;

		ctx.beginPath();
		ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
		ctx.fill();
	}

	ctx.fillStyle = "#f59e0b";
	ctx.beginPath();
	ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
	ctx.fill();
}

// Tulip
function drawTulipHead(ctx: SKRSContext2D, color?: string): void {
	const petalColor = color || "#f43f5e";

	ctx.fillStyle = petalColor;

	// Left
	ctx.beginPath();
	ctx.moveTo(0, 2);
	ctx.quadraticCurveTo(-6, -2, -4, -8);
	ctx.quadraticCurveTo(-2, -10, 0, -8);
	ctx.fill();

	// Right
	ctx.beginPath();
	ctx.moveTo(0, 2);
	ctx.quadraticCurveTo(6, -2, 4, -8);
	ctx.quadraticCurveTo(2, -10, 0, -8);
	ctx.fill();

	// Center
	ctx.fillStyle = adjustBrightness(petalColor, -20);
	ctx.beginPath();
	ctx.moveTo(0, 2);
	ctx.quadraticCurveTo(-3, -3, -2, -9);
	ctx.quadraticCurveTo(0, -11, 2, -9);
	ctx.quadraticCurveTo(3, -3, 0, 2);
	ctx.fill();
}

// Sunflower
function drawSunflowerHead(ctx: SKRSContext2D, color?: string): void {
	const petalColor = color || "#facc15";
	const petalCount = 12;
	const petalLength = 5;
	const petalWidth = 2;

	ctx.fillStyle = petalColor;
	for (let i = 0; i < petalCount; i++) {
		const angle = (i / petalCount) * Math.PI * 2;
		ctx.save();
		ctx.rotate(angle);

		ctx.beginPath();
		ctx.ellipse(0, -5, petalWidth, petalLength, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	ctx.fillStyle = "#92400e";
	ctx.beginPath();
	ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "#78350f";
	for (let i = 0; i < 5; i++) {
		const dotAngle = (i / 5) * Math.PI * 2;
		const dotX = Math.cos(dotAngle) * 1.5;
		const dotY = Math.sin(dotAngle) * 1.5;
		ctx.beginPath();
		ctx.arc(dotX, dotY, 0.5, 0, Math.PI * 2);
		ctx.fill();
	}
}

// Cherry blossom
function drawCherryBlossomHead(ctx: SKRSContext2D, color?: string): void {
	const petalColor = color || "#fbcfe8";
	const petalCount = 5;

	ctx.fillStyle = petalColor;

	for (let i = 0; i < petalCount; i++) {
		const angle = (i / petalCount) * Math.PI * 2 - Math.PI / 2;
		ctx.save();
		ctx.rotate(angle);

		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.quadraticCurveTo(-3, -3, -2, -6);
		ctx.quadraticCurveTo(-1, -7, 0, -5.5);
		ctx.quadraticCurveTo(1, -7, 2, -6);
		ctx.quadraticCurveTo(3, -3, 0, 0);
		ctx.fill();

		ctx.restore();
	}

	ctx.fillStyle = "#f9a8d4";
	ctx.beginPath();
	ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
	ctx.fill();

	ctx.strokeStyle = "#fbbf24";
	ctx.lineWidth = 0.5;
	for (let i = 0; i < 5; i++) {
		const sAngle = (i / 5) * Math.PI * 2;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(Math.cos(sAngle) * 2, Math.sin(sAngle) * 2);
		ctx.stroke();

		ctx.fillStyle = "#fbbf24";
		ctx.beginPath();
		ctx.arc(
			Math.cos(sAngle) * 2.2,
			Math.sin(sAngle) * 2.2,
			0.4,
			0,
			Math.PI * 2,
		);
		ctx.fill();
	}
}

export function getCanvasDimensions(weeksCount: number): {
	width: number;
	height: number;
} {
	return {
		width: weeksCount * CELL_SIZE + 40,
		height: 180,
	};
}
