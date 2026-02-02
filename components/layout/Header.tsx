"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Theme } from "@/components/features/theme/ThemeTabs";

interface FlowerProps {
	style: React.CSSProperties;
	delay: number;
	color: string;
	size: number;
	isVisible: boolean;
}

function Flower({ style, delay, color, size, isVisible }: FlowerProps) {
	return (
		<div
			className="absolute pointer-events-none"
			style={{
				...style,
				transform: isVisible
					? "scale(1) rotate(0deg)"
					: "scale(0) rotate(-45deg)",
				opacity: isVisible ? 1 : 0,
				transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
				transitionDelay: `${delay}ms`,
			}}
		>
			<svg
				role="img"
				aria-label="Flower"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
			>
				<circle cx="12" cy="8" r="4" fill={color} opacity="0.9" />
				<circle cx="8" cy="12" r="4" fill={color} opacity="0.9" />
				<circle cx="16" cy="12" r="4" fill={color} opacity="0.9" />
				<circle cx="10" cy="16" r="4" fill={color} opacity="0.9" />
				<circle cx="14" cy="16" r="4" fill={color} opacity="0.9" />
				<circle cx="12" cy="12" r="3" fill="#fef08a" />
			</svg>
		</div>
	);
}

interface HeaderProps {
	theme: Theme;
}

const FLOWER_COLORS = ["#fce7f3", "#f9a8d4", "#fbcfe8", "#f472b6", "#fda4af"];

export default function Header({ theme }: HeaderProps) {
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const [showFlowers, setShowFlowers] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const flowers = useMemo(() => {
		const positions = [
			// Top
			{ top: -22, left: 15 },
			{ top: -26, left: 80 },
			{ top: -20, left: 145 },
			// Left
			{ top: 0, left: -20 },
			{ top: 25, left: -16 },
			// Right
			{ top: -5, left: 150 },
			{ top: 22, left: 160 },
			// Bottom
			{ top: 48, left: 5 },
			{ top: 46, left: 150 },
		];

		return positions.map((pos, i) => ({
			...pos,
			color: FLOWER_COLORS[i % FLOWER_COLORS.length],
			size: 16,
			delay: 80 + i * 70,
			id: i,
		}));
	}, []);

	useEffect(() => {
		if (theme === "flower" && !hasAnimated) {
			const timer = setTimeout(() => {
				setShowFlowers(true);
				setHasAnimated(true);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [theme, hasAnimated]);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setTilt({ x: y * -10, y: x * 10 });
	};

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 });
		setIsHovered(false);
	};

	const isFlowerTheme = theme === "flower";

	return (
		<header className="relative w-full py-10 flex flex-col items-center justify-center gap-2">
			<Link href="/" className="relative z-10">
				{/* biome-ignore lint/a11y/noStaticElementInteractions: tilt interaction */}
				<div
					ref={containerRef}
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className="relative cursor-pointer select-none"
					style={{
						transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
						transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
						transformStyle: "preserve-3d",
					}}
				>
					{isFlowerTheme &&
						flowers.map((flower) => (
							<Flower
								key={flower.id}
								style={{ top: flower.top, left: flower.left }}
								delay={flower.delay}
								color={flower.color}
								size={flower.size}
								isVisible={showFlowers}
							/>
						))}

					<h1
						className="text-3xl sm:text-4xl font-semibold tracking-tight relative z-10"
						style={{
							fontFamily: "var(--font-quicksand), 'Quicksand', sans-serif",
							color: "#3d3a36",
							transform: "translateZ(4px)",
						}}
					>
						Git Style
					</h1>
				</div>
			</Link>

			<p
				className="text-[13px] tracking-wide transition-opacity duration-300"
				style={{
					color: "#b5b0ab",
					opacity: isHovered ? 1 : 0.85,
				}}
			>
				Your commits, your style
			</p>
		</header>
	);
}
