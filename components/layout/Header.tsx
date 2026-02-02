"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function Header() {
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setTilt({ x: y * -12, y: x * 12 });
	};

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 });
		setIsHovered(false);
	};

	return (
		<header className="relative w-full py-10 flex flex-col items-center justify-center gap-2">
			<Link href="/" className="relative z-10">
				{/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
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
					<h1
						className="text-3xl sm:text-4xl font-semibold tracking-tight"
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
