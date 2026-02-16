"use client";

import { useEffect, useRef } from "react";
import { drawHairPreview } from "@/lib/themes/hair/client-preview";
import type { HairCurliness } from "@/lib/themes/types";

interface HairPreviewProps {
	hairColor: string;
	curliness: HairCurliness;
	size?: number;
}

export function HairPreview({
	hairColor,
	curliness,
	size = 88,
}: HairPreviewProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		drawHairPreview(ctx, hairColor, curliness, size);
	}, [hairColor, curliness, size]);

	return (
		<div
			className="relative rounded-xl flex items-center justify-center shrink-0"
			style={{
				width: size,
				height: size,
				background:
					"linear-gradient(180deg, rgba(252, 228, 214, 0.5) 0%, rgba(252, 228, 214, 0.8) 100%)",
			}}
		>
			<canvas ref={canvasRef} width={size} height={size} className="rounded-xl" />
		</div>
	);
}
