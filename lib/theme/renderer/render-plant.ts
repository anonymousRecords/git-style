import type { Canvas, SKRSContext2D } from "@napi-rs/canvas";
import type { CommitLevel } from "@/lib/themes";
import type { PlantElement, WindEffect } from "../../animation/types";
import { PLANT_COLORS } from "../../animation/types";

const CELL_SIZE = 14;
const OFFSET_X = 20;
const OFFSET_Y = 60;

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

interface renderPlantFrameProps {
	canvas: Canvas;
	ctx: SKRSContext2D;
	elements: PlantElement[];
	frameIndex: number;
	totalFrames: number;
	windEffect: WindEffect;
	username: string;
}

export function renderPlantFrame({
	canvas,
	ctx,
	elements,
	frameIndex,
	totalFrames,
	windEffect,
	username,
}: renderPlantFrameProps): void {
	const width = canvas.width;
	const height = canvas.height;

	drawSoilBackground(ctx, width, height);

	// Title
	ctx.fillStyle = "#ffffff";
	ctx.font = "16px sans-serif";
	ctx.fillText(`🌿 ${username}'s Plant`, OFFSET_X, 30);

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

		drawPlant(ctx, element.x, element.y, element.level, windAngle);
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
			drawFlower(ctx, radians);
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
function drawFlower(ctx: SKRSContext2D, windRadians: number): void {
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

	// Draw flower
	ctx.save();
	ctx.translate(flowerPos.x, flowerPos.y);
	ctx.rotate(windRadians * 0.5);

	// Flower petals
	ctx.fillStyle = PLANT_COLORS.flower;
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

	// Flower center
	ctx.fillStyle = "#f59e0b"; // amber-500
	ctx.beginPath();
	ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
	ctx.fill();

	ctx.restore();
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
