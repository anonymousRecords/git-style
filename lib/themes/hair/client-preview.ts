import type { HairCurliness } from "../types";

export function drawHairPreview(
	ctx: CanvasRenderingContext2D,
	hairColor: string,
	curliness: HairCurliness,
	size: number,
): void {
	const scale = size / 80;
	ctx.clearRect(0, 0, size, size);

	ctx.save();
	ctx.translate(size / 2, size / 2);
	ctx.scale(scale, scale);

	const strandCount = 5;
	const spacing = 8;
	const startX = -(strandCount - 1) * spacing * 0.5;

	for (let i = 0; i < strandCount; i++) {
		const x = startX + i * spacing;
		drawHairStrand(ctx, x, 0, 25, hairColor, curliness);
	}

	ctx.restore();
}

function drawHairStrand(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	length: number,
	color: string,
	curliness: HairCurliness,
): void {
	ctx.save();
	ctx.translate(x, y);

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

function drawStraightHair(ctx: CanvasRenderingContext2D, length: number): void {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, length);
	ctx.stroke();
}

function drawWavyHair(ctx: CanvasRenderingContext2D, length: number): void {
	const segments = 2;
	const segmentLength = length / segments;

	ctx.beginPath();
	ctx.moveTo(0, 0);

	for (let i = 0; i < segments; i++) {
		const direction = i % 2 === 0 ? 1 : -1;
		const startY = i * segmentLength;
		const endY = (i + 1) * segmentLength;
		const controlX = 3 * direction;
		const controlY = startY + segmentLength / 2;

		ctx.quadraticCurveTo(controlX, controlY, 0, endY);
	}

	ctx.stroke();
}

function drawCurlyHair(ctx: CanvasRenderingContext2D, length: number): void {
	const curls = Math.floor(length / 6);
	const curlHeight = 6;
	const curlWidth = 4;

	ctx.beginPath();
	ctx.moveTo(0, 0);

	for (let i = 0; i < curls; i++) {
		const y = i * curlHeight;
		const direction = i % 2 === 0 ? 1 : -1;

		ctx.bezierCurveTo(
			curlWidth * direction,
			y + curlHeight * 0.25,
			curlWidth * direction,
			y + curlHeight * 0.75,
			0,
			y + curlHeight,
		);
	}

	ctx.stroke();
}
