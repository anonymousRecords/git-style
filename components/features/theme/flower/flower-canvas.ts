import type { FlowerType } from "@/lib/themes/types";

export function drawFlowerWithRootsPeeking(
	ctx: CanvasRenderingContext2D,
	_flowerType: FlowerType,
	_flowerColor: string,
	size: number,
	dragDistance: number,
	threshold: number,
) {
	ctx.clearRect(0, 0, size, size);

	const progress = Math.min(dragDistance / threshold, 1);

	const centerX = size / 2;
	const groundY = size * 0.75;

	ctx.fillStyle = "#5c4a32";
	ctx.beginPath();
	ctx.ellipse(
		centerX,
		groundY,
		10 + progress * 8,
		4 + progress * 4,
		0,
		0,
		Math.PI * 2,
	);
	ctx.fill();

	if (progress > 0.2) {
		const rootAlpha = (progress - 0.2) / 0.8;
		ctx.globalAlpha = rootAlpha;
		ctx.fillStyle = "#c9a86c";
		ctx.beginPath();
		ctx.ellipse(
			centerX,
			groundY - progress * 10,
			8,
			12 * progress,
			0,
			0,
			Math.PI * 2,
		);
		ctx.fill();

		ctx.strokeStyle = "#a67c52";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";

		ctx.beginPath();
		ctx.moveTo(centerX - 5, groundY);
		ctx.quadraticCurveTo(
			centerX - 10,
			groundY + 10,
			centerX - 6,
			groundY + 15 * progress,
		);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(centerX + 5, groundY);
		ctx.quadraticCurveTo(
			centerX + 10,
			groundY + 10,
			centerX + 6,
			groundY + 15 * progress,
		);
		ctx.stroke();

		ctx.globalAlpha = 1;
	}

	const stemHeight = 18 * (1 - progress * 0.5);
	ctx.save();
	ctx.translate(size / 2, size / 2 + 10);

	ctx.strokeStyle = "#15803d";
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.quadraticCurveTo(0, -stemHeight / 2, 0, -stemHeight);
	ctx.stroke();

	ctx.restore();
}

export function drawEmptyPot(ctx: CanvasRenderingContext2D, size: number) {
	ctx.clearRect(0, 0, size, size);

	const centerX = size / 2;
	const groundY = size * 0.75;

	ctx.fillStyle = "#3d2f1f";
	ctx.beginPath();
	ctx.ellipse(centerX, groundY, 15, 8, 0, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "#2a1f15";
	ctx.beginPath();
	ctx.ellipse(centerX, groundY + 2, 10, 5, 0, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "#8b7355";
	for (let i = 0; i < 8; i++) {
		const x = centerX + (Math.random() - 0.5) * 40;
		const y = groundY - 10 + Math.random() * 30;
		ctx.beginPath();
		ctx.arc(x, y, 2 + Math.random() * 2, 0, Math.PI * 2);
		ctx.fill();
	}
}
