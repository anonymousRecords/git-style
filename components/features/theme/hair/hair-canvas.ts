import type { HairCurliness } from "@/lib/themes/types";

export function drawHairWithScalpPulling(
	ctx: CanvasRenderingContext2D,
	hairColor: string,
	curliness: HairCurliness,
	size: number,
	dragDistance: number,
	threshold: number,
) {
	ctx.clearRect(0, 0, size, size);

	const progress = Math.min(dragDistance / threshold, 1);

	const centerX = size / 2;
	const scalpY = size * 0.4;

	ctx.fillStyle = "#fce4d6";
	ctx.beginPath();
	ctx.ellipse(
		centerX,
		scalpY,
		12 + progress * 8,
		6 + progress * 4,
		0,
		0,
		Math.PI * 2,
	);
	ctx.fill();

	if (progress > 0.3) {
		const stressAlpha = (progress - 0.3) / 0.7;
		ctx.globalAlpha = stressAlpha * 0.5;
		ctx.fillStyle = "#ffcccb";
		ctx.beginPath();
		ctx.ellipse(centerX, scalpY, 10, 5, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}

	if (progress > 0.2) {
		const rootAlpha = (progress - 0.2) / 0.8;
		ctx.globalAlpha = rootAlpha;
		ctx.fillStyle = "#fdd0bb";
		ctx.beginPath();
		ctx.ellipse(
			centerX,
			scalpY + progress * 8,
			6,
			8 * progress,
			0,
			0,
			Math.PI * 2,
		);
		ctx.fill();
		ctx.globalAlpha = 1;
	}

	const strandCount = 3;
	const spacing = 6;
	const startX = centerX - ((strandCount - 1) * spacing) / 2;
	const pullOffset = -15 - progress * 10;

	ctx.strokeStyle = hairColor;
	ctx.lineWidth = 2;
	ctx.lineCap = "round";

	for (let i = 0; i < strandCount; i++) {
		const x = startX + i * spacing;
		const tension = 1 - progress * 0.5;

		ctx.beginPath();
		ctx.moveTo(x, scalpY);

		if (curliness === "straight") {
			ctx.lineTo(x, scalpY + pullOffset * tension);
		} else if (curliness === "wavy") {
			const controlX = x + (i % 2 === 0 ? 3 : -3);
			ctx.quadraticCurveTo(
				controlX,
				scalpY + pullOffset * 0.5,
				x,
				scalpY + pullOffset * tension,
			);
		} else {
			const curl1 = x + 3;
			const curl2 = x - 3;
			ctx.bezierCurveTo(
				curl1,
				scalpY + pullOffset * 0.25,
				curl2,
				scalpY + pullOffset * 0.5,
				x,
				scalpY + pullOffset * tension,
			);
		}

		ctx.stroke();
	}

	if (progress > 0.5) {
		ctx.globalAlpha = (progress - 0.5) * 2;
		ctx.strokeStyle = "#ef4444";
		ctx.lineWidth = 1;
		ctx.setLineDash([2, 2]);
		ctx.beginPath();
		ctx.arc(centerX, scalpY, 15, 0, Math.PI * 2);
		ctx.stroke();
		ctx.setLineDash([]);
		ctx.globalAlpha = 1;
	}
}

export function drawEmptyScalp(ctx: CanvasRenderingContext2D, size: number) {
	ctx.clearRect(0, 0, size, size);

	const centerX = size / 2;
	const centerY = size / 2;

	ctx.fillStyle = "#fce4d6";
	ctx.beginPath();
	ctx.ellipse(centerX, centerY - 3, 34, 38, 0, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
	ctx.beginPath();
	ctx.ellipse(centerX - 8, centerY - 15, 7, 12, -0.3, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
	ctx.beginPath();
	ctx.ellipse(centerX + 6, centerY - 12, 4, 7, 0.2, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
	ctx.beginPath();
	ctx.ellipse(centerX - 2, centerY - 20, 3, 4, 0, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = "#fbbf24";
	ctx.font = "12px monospace";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText("✨", centerX - 18, centerY - 18);
	ctx.fillText("✨", centerX + 18, centerY - 16);
	ctx.fillText("✨", centerX, centerY - 25);

	ctx.fillStyle = "#8b7355";
	ctx.font = "bold 13px monospace";
	ctx.fillText("T", centerX - 8, centerY + 2);
	ctx.fillText("T", centerX + 8, centerY + 2);

	ctx.strokeStyle = "#8b7355";
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.arc(centerX, centerY + 12, 6, 0.2 * Math.PI, 0.8 * Math.PI);
	ctx.stroke();

	ctx.fillStyle = "#7dd3fc";
	ctx.beginPath();
	ctx.ellipse(centerX - 18, centerY - 5, 1.5, 2.5, 0, 0, Math.PI * 2);
	ctx.fill();

	ctx.beginPath();
	ctx.ellipse(centerX + 18, centerY - 3, 1.5, 2.5, 0, 0, Math.PI * 2);
	ctx.fill();
}
