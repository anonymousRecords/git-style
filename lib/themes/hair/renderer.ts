import type { Canvas, SKRSContext2D } from "@napi-rs/canvas";
import type { CommitLevel } from "@/lib/utils/commit-level";
import type { HairCurliness } from "../types";
import { CELL_SIZE, HAIR_COLORS, OFFSET_X, OFFSET_Y } from "./constants";

export interface HairElement {
	x: number;
	y: number;
	level: CommitLevel;
	weekIndex: number;
	dayIndex: number;
}

export function createHairElements(
	weeks: { count: number }[][],
	getCommitLevel: (count: number) => CommitLevel,
): HairElement[] {
	const elements: HairElement[] = [];

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

interface RenderHairFrameProps {
	canvas: Canvas;
	ctx: SKRSContext2D;
	elements: HairElement[];
	frameIndex: number;
	totalFrames: number;
	username: string;
	hairColor: string;
	curliness: HairCurliness;
}

export function renderHairFrame({
	canvas,
	ctx,
	elements,
	frameIndex,
	totalFrames,
	username,
	hairColor,
	curliness,
}: RenderHairFrameProps): void {
	const width = canvas.width;
	const height = canvas.height;

	drawScalpBackground(ctx, width, height);

	ctx.fillStyle = "#ffffff";
	ctx.font = "16px sans-serif";
	ctx.fillText(`${username}'s Hair`, OFFSET_X, 30);

	const progress = frameIndex / totalFrames;

	const windStrength = 6;
	const windAngle = Math.sin(progress * Math.PI * 2) * windStrength;

	elements.forEach((element) => {
		if (element.level === "none") {
			ctx.fillStyle = "#fdd0bb";
			ctx.beginPath();
			ctx.arc(element.x, element.y, 1.5, 0, Math.PI * 2);
			ctx.fill();
			return;
		}

		const phaseOffset = (element.x / width) * 0.3;
		const strandWindAngle =
			windAngle * (1 + Math.sin(phaseOffset * Math.PI * 2) * 0.2);

		drawHairStrand(
			ctx,
			element.x,
			element.y,
			element.level,
			strandWindAngle,
			hairColor,
			curliness,
		);
	});
}

function drawScalpBackground(
	ctx: SKRSContext2D,
	width: number,
	height: number,
): void {
	ctx.fillStyle = HAIR_COLORS.scalp;
	ctx.fillRect(0, 0, width, height);

	const patternWidth = 50;
	const patternHeight = 50;

	for (let x = 0; x < width; x += patternWidth) {
		for (let y = 0; y < height; y += patternHeight) {
			ctx.fillStyle = "rgba(229, 201, 181, 0.4)";
			drawEllipse(ctx, x + 10, y + 8, 3, 2);
			drawEllipse(ctx, x + 35, y + 20, 2.5, 1.8);
			drawEllipse(ctx, x + 18, y + 38, 2.8, 2.2);
			drawEllipse(ctx, x + 42, y + 45, 2.2, 1.5);

			ctx.fillStyle = "rgba(255, 248, 240, 0.3)";
			ctx.beginPath();
			ctx.arc(x + 6, y + 12, 1.5, 0, Math.PI * 2);
			ctx.fill();

			ctx.beginPath();
			ctx.arc(x + 28, y + 25, 1.2, 0, Math.PI * 2);
			ctx.fill();

			ctx.beginPath();
			ctx.arc(x + 45, y + 35, 1.3, 0, Math.PI * 2);
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

function drawHairStrand(
	ctx: SKRSContext2D,
	x: number,
	y: number,
	level: CommitLevel,
	windAngle: number,
	color: string,
	curliness: HairCurliness,
): void {
	ctx.save();
	ctx.translate(x, y);

	let length: number;
	switch (level) {
		case "low":
			length = 8;
			break;
		case "medium":
			length = 14;
			break;
		case "high":
			length = 20;
			break;
		case "max":
			length = 28;
			break;
		default:
			length = 0;
	}

	if (length === 0) {
		ctx.restore();
		return;
	}

	const windRadians = (windAngle * Math.PI) / 180;
	ctx.rotate(windRadians);

	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	ctx.lineCap = "round";

	switch (curliness) {
		case "straight":
			drawStraightHair(ctx, length);
			break;
		case "wavy":
			drawWavyHair(ctx, length);
			break;
		case "curly":
			drawCurlyHair(ctx, length);
			break;
	}

	ctx.restore();
}

function drawStraightHair(ctx: SKRSContext2D, length: number): void {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -length);
	ctx.stroke();
}

function drawWavyHair(ctx: SKRSContext2D, length: number): void {
	const segments = 2;
	const segmentLength = length / segments;

	ctx.beginPath();
	ctx.moveTo(0, 0);

	for (let i = 0; i < segments; i++) {
		const direction = i % 2 === 0 ? 1 : -1;
		const startY = -i * segmentLength;
		const endY = -(i + 1) * segmentLength;
		const controlX = 3 * direction;
		const controlY = startY - segmentLength / 2;

		ctx.quadraticCurveTo(controlX, controlY, 0, endY);
	}

	ctx.stroke();
}

function drawCurlyHair(ctx: SKRSContext2D, length: number): void {
	const curls = Math.floor(length / 6);
	const curlHeight = 6;
	const curlWidth = 4;

	ctx.beginPath();
	ctx.moveTo(0, 0);

	for (let i = 0; i < curls; i++) {
		const y = -i * curlHeight;
		const direction = i % 2 === 0 ? 1 : -1;

		ctx.bezierCurveTo(
			curlWidth * direction,
			y - curlHeight * 0.25,
			curlWidth * direction,
			y - curlHeight * 0.75,
			0,
			y - curlHeight,
		);
	}

	ctx.stroke();
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
