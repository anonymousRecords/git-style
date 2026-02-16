"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { drawHairPreview } from "@/lib/themes/hair/client-preview";
import type { HairCurliness } from "@/lib/themes/types";
import { BaldPerson } from "./BaldPerson";
import { DraggedHair } from "./DraggedHair";
import { drawEmptyScalp, drawHairWithScalpPulling } from "./hair-canvas";
import { useHairDrag } from "./useHairDrag";

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
	const [mounted, setMounted] = useState(false);

	const {
		containerRef,
		isDragging,
		isPulled,
		originPos,
		currentPos,
		dragDistance,
		showHairParticles,
		stretchProgress,
		tensionProgress,
		pullThreshold,
		handlePointerDown,
		resetPull,
	} = useHairDrag();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		if (isPulled) {
			drawEmptyScalp(ctx, size);
		} else if (!isDragging) {
			drawHairPreview(ctx, hairColor, curliness, size);
		} else {
			drawHairWithScalpPulling(
				ctx,
				hairColor,
				curliness,
				size,
				dragDistance,
				pullThreshold,
			);
		}
	}, [
		hairColor,
		curliness,
		size,
		isDragging,
		isPulled,
		dragDistance,
		pullThreshold,
	]);

	return (
		<>
			<div
				ref={containerRef}
				className="relative rounded-xl flex items-center justify-center shrink-0 overflow-visible transition-all duration-200 select-none touch-none"
				style={{
					width: size,
					height: size,
					background: getBackgroundColor(isPulled),
					cursor: isDragging ? "grabbing" : "grab",
				}}
				onPointerDown={handlePointerDown}
			>
				<canvas
					ref={canvasRef}
					width={size}
					height={size}
					className="rounded-xl"
				/>

				{isDragging && !isPulled && (
					<div
						className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap transition-colors"
						style={{
							color: tensionProgress > 0.7 ? "#ef4444" : "#a3a3a3",
						}}
					>
						{tensionProgress > 0.9
							? "OUCH!"
							: tensionProgress > 0.7
								? "Almost out..."
								: tensionProgress > 0.3
									? "Don't pull!"
									: "Gentle!"}
					</div>
				)}

				{isPulled && !isDragging && (
					<div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-neutral-400">
						Click to regrow
					</div>
				)}
			</div>

			{mounted &&
				isDragging &&
				createPortal(
					<DraggedHair
						originPos={originPos}
						currentPos={currentPos}
						stretchProgress={stretchProgress}
						tensionProgress={tensionProgress}
						hairColor={hairColor}
					/>,
					document.body,
				)}

			{mounted &&
				isPulled &&
				createPortal(
					<BaldPerson
						position={currentPos}
						showHairParticles={showHairParticles}
						onReset={resetPull}
					/>,
					document.body,
				)}
		</>
	);
}

function getBackgroundColor(isPulled: boolean) {
	if (isPulled) {
		return "linear-gradient(180deg, #fef2f2 0%, #fee2e2 100%)";
	}
	return "linear-gradient(180deg, rgba(252, 228, 214, 0.5) 0%, rgba(252, 228, 214, 0.8) 100%)";
}
