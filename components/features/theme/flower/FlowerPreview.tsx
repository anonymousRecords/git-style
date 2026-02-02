"use client";

import { useEffect, useRef } from "react";
import { drawFlowerPreview } from "@/lib/themes/plant/client-preview";
import type { FlowerType } from "@/lib/themes/types";

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
			className="rounded-2xl flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300"
			style={{
				width: size,
				height: size,
				background:
					"linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
				boxShadow:
					"inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.04)",
			}}
		>
			<canvas
				ref={canvasRef}
				width={size}
				height={size}
				className="rounded-2xl"
				style={{
					transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
				}}
			/>
		</div>
	);
}
