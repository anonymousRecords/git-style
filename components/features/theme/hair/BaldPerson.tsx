"use client";

import { useEffect, useState } from "react";
import type { Position } from "./types";

interface BaldPersonProps {
	position: Position;
	showHairParticles: boolean;
	onReset: () => void;
}

const MESSAGES = [
	"AAAH!",
	"JARANARA",
	"MEORIMEORI!",
	"sob sob...",
	"come back...",
	"T_T",
];

function playCryingSound(isInitial = false) {
	try {
		const audioCtx = new AudioContext();

		const osc = audioCtx.createOscillator();
		const gainNode = audioCtx.createGain();

		const volume = isInitial ? 0.08 : 0.04;
		const baseFreq = isInitial ? 300 : 250 + Math.random() * 100;
		const duration = isInitial ? 0.6 : 0.4;

		osc.type = "sine";

		// Crying-like frequency modulation
		osc.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
		osc.frequency.linearRampToValueAtTime(
			baseFreq * 1.5,
			audioCtx.currentTime + duration * 0.3,
		);
		osc.frequency.linearRampToValueAtTime(
			baseFreq * 0.8,
			audioCtx.currentTime + duration,
		);

		gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
		gainNode.gain.linearRampToValueAtTime(
			volume * 0.6,
			audioCtx.currentTime + duration * 0.5,
		);
		gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

		osc.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		osc.start();
		osc.stop(audioCtx.currentTime + duration);
	} catch {}
}

export function BaldPerson({
	position,
	showHairParticles,
	onReset,
}: BaldPersonProps) {
	const [shakeIntensity, setShakeIntensity] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const [baldPos, setBaldPos] = useState(position);
	const [frame, setFrame] = useState(0);
	const [messageIndex, setMessageIndex] = useState(0);

	useEffect(() => {
		if (showHairParticles) {
			playCryingSound(true);
		}
	}, [showHairParticles]);

	useEffect(() => {
		const interval = setInterval(
			() => {
				playCryingSound(false);
			},
			2500 + Math.random() * 1500,
		);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setShakeIntensity((prev) => Math.max(prev * 0.95, 0.3));
		}, 100);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setFrame((prev) => (prev + 1) % 3);
		}, 400);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
		}, 1500);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!isDragging) return;

		const handleMove = (e: PointerEvent) => {
			setBaldPos({ x: e.clientX, y: e.clientY });
			setShakeIntensity(0.8);
		};

		const handleUp = () => {
			setIsDragging(false);
		};

		window.addEventListener("pointermove", handleMove);
		window.addEventListener("pointerup", handleUp);

		return () => {
			window.removeEventListener("pointermove", handleMove);
			window.removeEventListener("pointerup", handleUp);
		};
	}, [isDragging]);

	const handlePointerDown = (e: React.PointerEvent) => {
		e.stopPropagation();
		setIsDragging(true);
		setShakeIntensity(1);
	};

	const baldFrames = [
		`   (ಥ﹏ಥ)
     ||
    ∧∧`,
		`   (T_T)
     ||
    ∧∧`,
		`   (;_;)
     ||
    ∧∧`,
	];

	return (
		<div className="fixed inset-0 pointer-events-none z-[9999]">
			{showHairParticles && (
				<div className="absolute" style={{ left: position.x, top: position.y }}>
					{[...Array(8)].map((_, i) => {
						const angle = (i / 8) * Math.PI * 2;
						const distance = 20 + Math.random() * 30;
						return (
							<div
								key={`hair-particle-${i}`}
								className="absolute text-xs"
								style={
									{
										animation: "hair-fly 0.6s ease-out forwards",
										"--tx": `${Math.cos(angle) * distance}px`,
										"--ty": `${Math.sin(angle) * distance - 20}px`,
									} as React.CSSProperties
								}
							>
								{["~", "∿", "≈", "∼"][i % 4]}
							</div>
						);
					})}
				</div>
			)}

			<button
				type="button"
				className="absolute pointer-events-auto cursor-grab active:cursor-grabbing bg-transparent border-none p-0"
				style={{
					left: baldPos.x - 40,
					top: baldPos.y - 60,
					animation: "bald-float 2s ease-in-out infinite",
				}}
				onPointerDown={handlePointerDown}
				onClick={(e) => {
					e.stopPropagation();
					onReset();
				}}
			>
				<div
					className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-lg px-3 py-1 text-xs font-bold shadow-md whitespace-nowrap border border-neutral-200"
					style={{
						animation: "bounce 0.5s ease-in-out infinite",
					}}
				>
					{MESSAGES[messageIndex]}
				</div>

				<pre
					className="font-mono text-base leading-tight select-none drop-shadow-sm"
					style={{
						animation: `bald-shake ${0.1 + (1 - shakeIntensity) * 0.2}s ease-in-out infinite`,
					}}
				>
					{baldFrames[frame]}
				</pre>

				<div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-neutral-400 whitespace-nowrap font-mono">
					[click to regrow hair]
				</div>
			</button>

			<style jsx>{`
				@keyframes hair-fly {
					0% {
						transform: translate(0, 0);
						opacity: 1;
					}
					100% {
						transform: translate(var(--tx), var(--ty));
						opacity: 0;
					}
				}
				@keyframes bald-float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-10px);
					}
				}
				@keyframes bald-shake {
					0%,
					100% {
						transform: translateX(0);
					}
					25% {
						transform: translateX(-2px) rotate(-1deg);
					}
					75% {
						transform: translateX(2px) rotate(1deg);
					}
				}
			`}</style>
		</div>
	);
}
