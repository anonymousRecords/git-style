"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export default function Header() {
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setTilt({ x: y * -15, y: x * 15 });
	};

	const handleMouseLeave = () => {
		setTilt({ x: 0, y: 0 });
	};

	const HEADER_HEIGHT = "h-48";

	return (
		<>
			<header
				className={`fixed gap-2 top-0 w-full max-w-[600px] z-20 flex flex-col items-center justify-center ${HEADER_HEIGHT}`}
			>
				<Link href="/">
					{/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
					<div
						ref={containerRef}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						className="relative cursor-pointer select-none"
						style={{
							transform: `perspective(500px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
							transition: "transform 0.15s ease-out",
							transformStyle: "preserve-3d",
						}}
					>
						<h1
							className="text-7xl relative"
							style={{
								fontFamily: "var(--font-coiny), 'Coiny', cursive",
								fontWeight: 400,
								lineHeight: 0.9,
								backgroundColor: "#6b7fd7",
								color: "transparent",
								textShadow: `
									3px 3px 6px rgba(107, 127, 215, 0.5),
									6px 8px 12px rgba(75, 95, 183, 0.5),
									-4px -4px 4px rgba(255, 255, 255, 0.6)
								`,
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								transform: "translateZ(3px)",
							}}
						>
							Git Style
						</h1>
					</div>
				</Link>
				<div className="text-sm text-gray-600">Your commits, your style</div>
			</header>
			<div className={HEADER_HEIGHT} aria-hidden="true" />
		</>
	);
}
