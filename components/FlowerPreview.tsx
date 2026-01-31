"use client";

import { useEffect, useRef } from "react";
import type { FlowerType } from "@/lib/animation/types";
import { drawFlowerPreview } from "@/lib/client/draw-flower";

interface FlowerPreviewProps {
	flowerType: FlowerType;
	flowerColor: string;
	size?: number;
}

export function FlowerPreview({
	flowerType,
	flowerColor,
	size = 160,
}: FlowerPreviewProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		drawFlowerPreview(ctx, flowerType, flowerColor, size);
	}, [flowerType, flowerColor, size]);

	return (
		<div
			className="rounded-2xl bg-white/80 flex items-center justify-center shrink-0"
			style={{ width: size, height: size }}
		>
			<canvas
				ref={canvasRef}
				width={size}
				height={size}
				className="rounded-2xl"
			/>
		</div>
	);
}
