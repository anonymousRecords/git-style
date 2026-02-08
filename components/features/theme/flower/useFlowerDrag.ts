import { useCallback, useEffect, useRef, useState } from "react";
import type { Position } from "./types";

const UPROOT_THRESHOLD = 150;
const MAX_STRETCH = 250;

export function useFlowerDrag() {
	const containerRef = useRef<HTMLDivElement>(null);

	const [isDragging, setIsDragging] = useState(false);
	const [isUprooted, setIsUprooted] = useState(false);
	const [originPos, setOriginPos] = useState<Position>({ x: 0, y: 0 });
	const [currentPos, setCurrentPos] = useState<Position>({ x: 0, y: 0 });
	const [dragDistance, setDragDistance] = useState(0);
	const [showDirtParticles, setShowDirtParticles] = useState(false);

	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			if (isUprooted) {
				setIsUprooted(false);
				setShowDirtParticles(false);
				return;
			}

			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;

			const originX = rect.left + rect.width / 2;
			const originY = rect.top + rect.height / 2 - 20;

			setOriginPos({ x: originX, y: originY });
			setCurrentPos({ x: e.clientX, y: e.clientY });
			setIsDragging(true);
			setDragDistance(0);
		},
		[isUprooted],
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

			if (dist >= UPROOT_THRESHOLD && !isUprooted) {
				setIsUprooted(true);
				setIsDragging(false);
				setShowDirtParticles(true);
				setTimeout(() => setShowDirtParticles(false), 1000);
			}
		};

		const handleUp = () => {
			if (!isUprooted) {
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
	}, [isDragging, originPos, isUprooted]);

	const stretchProgress = Math.min(dragDistance / MAX_STRETCH, 1);
	const tensionProgress = Math.min(dragDistance / UPROOT_THRESHOLD, 1);

	const resetUproot = useCallback(() => {
		setIsUprooted(false);
		setShowDirtParticles(false);
	}, []);

	return {
		containerRef,
		isDragging,
		isUprooted,
		originPos,
		currentPos,
		dragDistance,
		showDirtParticles,
		stretchProgress,
		tensionProgress,
		uprootThreshold: UPROOT_THRESHOLD,
		handlePointerDown,
		resetUproot,
	};
}
