import { useCallback, useEffect, useRef, useState } from "react";
import type { Position } from "./types";

const PULL_THRESHOLD = 150;
const MAX_STRETCH = 250;

export function useHairDrag() {
	const containerRef = useRef<HTMLDivElement>(null);

	const [isDragging, setIsDragging] = useState(false);
	const [isPulled, setIsPulled] = useState(false);
	const [originPos, setOriginPos] = useState<Position>({ x: 0, y: 0 });
	const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
	const [dragDistance, setDragDistance] = useState(0);
	const [showHairParticles, setShowHairParticles] = useState(false);

	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			if (isPulled) {
				setIsPulled(false);
				setShowHairParticles(false);
				return;
			}

			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;

			const originX = rect.left + rect.width / 2;
			const originY = rect.top + rect.height / 2;

			setOriginPos({ x: originX, y: originY });
			setCurrentPos({ x: e.clientX, y: e.clientY });
			setIsDragging(true);
			setDragDistance(0);
		},
		[isPulled],
	);

	useEffect(() => {
		if (!isDragging) return;

		const handleMove = (e: PointerEvent) => {
			const newPos = { x: e.clientX, y: e.clientY };
			setCurrentPos(newPos);

			const dist = Math.sqrt(
				(newPos.x - originPos.x) ** 2 + (newPos.y - originPos.y) ** 2,
			);
			setDragDistance(dist);

			if (dist >= PULL_THRESHOLD && !isPulled) {
				setIsPulled(true);
				setIsDragging(false);
				setShowHairParticles(true);
				setTimeout(() => setShowHairParticles(false), 1000);
			}
		};

		const handleUp = () => {
			if (!isPulled) {
				setIsDragging(false);
				setDragDistance(0);
			}
		};

		window.addEventListener("pointermove", handleMove);
		window.addEventListener("pointerup", handleUp);

		return () => {
			window.removeEventListener("pointermove", handleMove);
			window.removeEventListener("pointerup", handleUp);
		};
	}, [isDragging, originPos, isPulled]);

	const stretchProgress = Math.min(dragDistance / MAX_STRETCH, 1);
	const tensionProgress = Math.min(dragDistance / PULL_THRESHOLD, 1);

	const resetPull = useCallback(() => {
		setIsPulled(false);
		setShowHairParticles(false);
	}, []);

	return {
		containerRef,
		isDragging,
		isPulled,
		originPos,
		currentPos,
		dragDistance,
		showHairParticles,
		stretchProgress,
		tensionProgress,
		pullThreshold: PULL_THRESHOLD,
		handlePointerDown,
		resetPull,
	};
}
