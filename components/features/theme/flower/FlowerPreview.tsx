"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { drawFlowerPreview } from "@/lib/themes/flower/client-preview";
import type { FlowerType } from "@/lib/themes/types";

import { DraggedFlower } from "./DraggedFlower";
import { drawEmptyPot, drawFlowerWithRootsPeeking } from "./flower-canvas";
import { UprootedMandrake } from "./UprootedMandrake";
import { useFlowerDrag } from "./useFlowerDrag";

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
	const [mounted, setMounted] = useState(false);

	const {
		containerRef,
		isDragging,
		isUprooted,
		originPos,
		currentPos,
		dragDistance,
		showDirtParticles,
		stretchProgress,
		tensionProgress,
		uprootThreshold,
		handlePointerDown,
		resetUproot,
	} = useFlowerDrag();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		if (isUprooted) {
			drawEmptyPot(ctx, size);
		} else if (!isDragging) {
			drawFlowerPreview(ctx, flowerType, flowerColor, size);
		} else {
			drawFlowerWithRootsPeeking(
				ctx,
				flowerType,
				flowerColor,
				size,
				dragDistance,
				uprootThreshold,
			);
		}
	}, [
		flowerType,
		flowerColor,
		size,
		isDragging,
		isUprooted,
		dragDistance,
		uprootThreshold,
	]);

	return (
		<>
			<div
				ref={containerRef}
				className="relative rounded-xl flex items-center justify-center shrink-0 overflow-visible transition-all duration-200 select-none touch-none"
				style={{
					width: size,
					height: size,
					background: getBackgroundColor(isUprooted, flowerColor),
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

				{isDragging && !isUprooted && (
					<div
						className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap transition-colors"
						style={{
							color: tensionProgress > 0.7 ? "#ef4444" : "#a3a3a3",
						}}
					>
						{tensionProgress > 0.9
							? "!!!"
							: tensionProgress > 0.7
								? "Almost..."
								: tensionProgress > 0.3
									? "Keep pulling!"
									: "Pull me out!"}
					</div>
				)}

				{isUprooted && !isDragging && (
					<div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-neutral-400">
						Click to replant
					</div>
				)}
			</div>

			{mounted &&
				isDragging &&
				createPortal(
					<DraggedFlower
						originPos={originPos}
						currentPos={currentPos}
						stretchProgress={stretchProgress}
						tensionProgress={tensionProgress}
					/>,
					document.body,
				)}

			{mounted &&
				isUprooted &&
				createPortal(
					<UprootedMandrake
						position={currentPos}
						showDirt={showDirtParticles}
						onReset={resetUproot}
					/>,
					document.body,
				)}
		</>
	);
}

function getBackgroundColor(isUprooted: boolean, flowerColor: string) {
	if (isUprooted) {
		return "linear-gradient(180deg, #fef2f2 0%, #fee2e2 100%)";
	} else {
		if (flowerColor === "#ffffff") {
			return "#f2f2f2";
		}
		return "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)";
	}
}
