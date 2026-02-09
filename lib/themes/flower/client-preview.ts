import { adjustBrightness } from "@/lib/utils/color";
import type { FlowerType } from "../types";

export function drawFlowerPreview(
	ctx: CanvasRenderingContext2D,
	flowerType: FlowerType,
	flowerColor: string,
	size: number,
): void {
	const scale = size / 50;
	ctx.clearRect(0, 0, size, size);

	ctx.save();
	ctx.translate(size / 2, size / 2 + 10 * scale);
	ctx.scale(scale, scale);

	// stem
	ctx.strokeStyle = "#15803d";
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.quadraticCurveTo(0, -9, 0, -18);
	ctx.stroke();

	// flower head
	ctx.translate(0, -18);

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

function drawDefaultFlowerHead(
	ctx: CanvasRenderingContext2D,
	color: string,
): void {
	ctx.fillStyle = color;
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

function drawTulipHead(ctx: CanvasRenderingContext2D, color: string): void {
	ctx.fillStyle = color;

	// Left petal
	ctx.beginPath();
	ctx.moveTo(0, 2);
	ctx.quadraticCurveTo(-6, -2, -4, -8);
	ctx.quadraticCurveTo(-2, -10, 0, -8);
	ctx.fill();

	// Right petal
	ctx.beginPath();
	ctx.moveTo(0, 2);
	ctx.quadraticCurveTo(6, -2, 4, -8);
	ctx.quadraticCurveTo(2, -10, 0, -8);
	ctx.fill();

	// Center petal
	ctx.fillStyle = adjustBrightness(color, -20);
	ctx.beginPath();
	ctx.moveTo(0, 2);
	ctx.quadraticCurveTo(-3, -3, -2, -9);
	ctx.quadraticCurveTo(0, -11, 2, -9);
	ctx.quadraticCurveTo(3, -3, 0, 2);
	ctx.fill();
}

function drawSunflowerHead(ctx: CanvasRenderingContext2D, color: string): void {
	const petalCount = 12;
	const petalLength = 5;
	const petalWidth = 2;

	ctx.fillStyle = color;
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

function drawCherryBlossomHead(
	ctx: CanvasRenderingContext2D,
	color: string,
): void {
	const petalCount = 5;

	ctx.fillStyle = color;

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
