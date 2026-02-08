"use client";

import { useEffect, useState } from "react";
import type { Position } from "./types";

interface UprootedMandrakeProps {
	position: Position;
	showDirt: boolean;
	onReset: () => void;
}

function playMandrakeScream(isInitial = false) {
	try {
		const audioCtx = new AudioContext();

		const osc1 = audioCtx.createOscillator();
		const osc2 = audioCtx.createOscillator();
		const gainNode = audioCtx.createGain();

		const volume = isInitial ? 0.12 : 0.06;
		const baseFreq = isInitial ? 800 : 500 + Math.random() * 200;
		const duration = isInitial ? 0.5 : 0.3;

		osc1.type = "sawtooth";
		osc2.type = "square";

		osc1.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);
		osc1.frequency.linearRampToValueAtTime(
			baseFreq * 1.3,
			audioCtx.currentTime + duration * 0.2,
		);
		osc1.frequency.linearRampToValueAtTime(
			baseFreq * 0.6,
			audioCtx.currentTime + duration,
		);

		osc2.frequency.setValueAtTime(baseFreq * 1.05, audioCtx.currentTime);
		osc2.frequency.linearRampToValueAtTime(
			baseFreq * 0.5,
			audioCtx.currentTime + duration * 0.8,
		);

		gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
		gainNode.gain.linearRampToValueAtTime(
			volume * 0.5,
			audioCtx.currentTime + duration * 0.4,
		);
		gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

		osc1.connect(gainNode);
		osc2.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		osc1.start();
		osc2.start();
		osc1.stop(audioCtx.currentTime + duration);
		osc2.stop(audioCtx.currentTime + duration);
	} catch {}
}

export function UprootedMandrake({
	position,
	showDirt,
	onReset,
}: UprootedMandrakeProps) {
	const [shakeIntensity, setShakeIntensity] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const [mandrakePos, setMandrakePos] = useState(position);
	const [frame, setFrame] = useState(0);

	useEffect(() => {
		if (showDirt) {
			playMandrakeScream(true);
		}
	}, [showDirt]);

	useEffect(() => {
		const interval = setInterval(
			() => {
				playMandrakeScream(false);
			},
			2000 + Math.random() * 1500,
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
			setFrame((prev) => (prev + 1) % 2);
		}, 300);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!isDragging) return;

		const handleMove = (e: PointerEvent) => {
			setMandrakePos({ x: e.clientX, y: e.clientY });
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

	const asciiFrames = [
		`  \\|/
 (;_;)
  |||
 /| |\\`,
		`  \\|/
 (T_T)
  |||
 /| |\\`,
	];

	return (
		<div className="fixed inset-0 pointer-events-none z-[9999]">
			{showDirt && (
				<div className="absolute" style={{ left: position.x, top: position.y }}>
					{[...Array(8)].map((_, i) => {
						const angle = (i / 8) * Math.PI * 2;
						const distance = 20 + Math.random() * 30;
						return (
							<div
								key={`explosion-particle-${i}`}
								className="absolute text-xs"
								style={
									{
										animation: "dirt-fly 0.6s ease-out forwards",
										"--tx": `${Math.cos(angle) * distance}px`,
										"--ty": `${Math.sin(angle) * distance - 20}px`,
									} as React.CSSProperties
								}
							>
								{[".", "*", "~", ","][i % 4]}
							</div>
						);
					})}
				</div>
			)}

			<button
				type="button"
				className="absolute pointer-events-auto cursor-grab active:cursor-grabbing bg-transparent border-none p-0"
				style={{
					left: mandrakePos.x - 40,
					top: mandrakePos.y - 60,
					animation: "mandrake-float 2s ease-in-out infinite",
				}}
				onPointerDown={handlePointerDown}
				onClick={(e) => {
					e.stopPropagation();
					onReset();
				}}
			>
				<div
					className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-lg px-2 py-0.5 text-[10px] font-mono shadow-md whitespace-nowrap border border-neutral-200"
					style={{
						animation: "bounce 0.5s ease-in-out infinite",
					}}
				>
					AAAH!
				</div>

				<pre
					className="font-mono text-sm leading-tight text-amber-800 select-none drop-shadow-sm"
					style={{
						animation: `mandrake-shake ${0.1 + (1 - shakeIntensity) * 0.2}s ease-in-out infinite`,
					}}
				>
					{asciiFrames[frame]}
				</pre>

				<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-neutral-400 whitespace-nowrap font-mono">
					[click to replant]
				</div>
			</button>
		</div>
	);
}
