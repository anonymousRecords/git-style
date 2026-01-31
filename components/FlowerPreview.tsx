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
		<div className="flex flex-col items-center gap-2">
			<div
				className="rounded-xl bg-white border border-gray-200 flex items-center justify-center"
				style={{ width: size, height: size }}
			>
				<canvas
					ref={canvasRef}
					width={size}
					height={size}
					className="rounded-xl"
				/>
			</div>
			<span className="text-xs text-gray-500">Preview</span>
		</div>
	);
}
