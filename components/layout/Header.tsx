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
		<header className="relative w-full py-12 flex flex-col items-center justify-center gap-3">
			{/* Decorative gradient orb */}
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full pointer-events-none transition-opacity duration-700"
				style={{
					background:
						"radial-gradient(circle, rgba(252, 231, 243, 0.5) 0%, transparent 70%)",
					opacity: isHovered ? 0.8 : 0.4,
					filter: "blur(40px)",
				}}
			/>

			<Link href="/" className="relative z-10">
				{/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
				<div
					ref={containerRef}
					onMouseMove={handleMouseMove}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className="relative cursor-pointer select-none group"
					style={{
						transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
						transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
						transformStyle: "preserve-3d",
					}}
				>
					<h1
						className="text-6xl sm:text-7xl relative"
						style={{
							fontFamily: "var(--font-coiny), 'Coiny', cursive",
							fontWeight: 400,
							lineHeight: 1,
							background: "linear-gradient(135deg, #3d3a36 0%, #5a5550 100%)",
							WebkitBackgroundClip: "text",
							backgroundClip: "text",
							color: "transparent",
							textShadow: `
								1px 1px 0px rgba(255, 255, 255, 0.8),
								2px 2px 4px rgba(0, 0, 0, 0.08)
							`,
							transform: "translateZ(4px)",
						}}
					>
						Git Style
					</h1>

					{/* Subtle underline accent */}
					<div
						className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-300"
						style={{
							width: isHovered ? "80%" : "40%",
							background:
								"linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.4), transparent)",
							opacity: isHovered ? 1 : 0.6,
						}}
					/>
				</div>
			</Link>

			<p
				className="text-sm tracking-wide transition-all duration-300"
				style={{
					color: "#9a9590",
					opacity: isHovered ? 1 : 0.8,
					transform: isHovered ? "translateY(0)" : "translateY(-2px)",
				}}
			>
				Your commits, your style
			</p>
		</header>
	);
}
