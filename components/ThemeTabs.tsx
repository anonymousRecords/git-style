"use client";

import { useMemo, useState } from "react";

type Theme = "flower" | "cloud" | "hair";

interface ThemeCardProps {
	id: Theme;
	label: string;
	description: string;
	colors: string[];
	isSelected: boolean;
	isAvailable: boolean;
	onClick: () => void;
}

function MiniGrid({ colors, animate }: { colors: string[]; animate: boolean }) {
	const cells = useMemo(() => {
		return Array.from({ length: 21 }).map((_, i) => {
			const intensity = Math.random();
			const colorIndex = Math.floor(intensity * colors.length);
			const delay = (i % 7) * 0.03 + Math.floor(i / 7) * 0.05;
			return { intensity, colorIndex, delay, id: i };
		});
	}, [colors.length]);

	return (
		<div className="grid grid-cols-7 gap-[3px]">
			{cells.map((cell) => (
				<div
					key={cell.id}
					className="w-[7px] h-[7px] rounded-[2px] transition-all"
					style={{
						backgroundColor:
							cell.intensity > 0.3
								? colors[cell.colorIndex]
								: "rgba(0,0,0,0.04)",
						transform: animate ? "scale(1)" : "scale(0.7)",
						opacity: animate ? 1 : 0.4,
						transitionDuration: "400ms",
						transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
						transitionDelay: animate ? `${cell.delay}s` : "0s",
					}}
				/>
			))}
		</div>
	);
}

function ThemeCard({
	label,
	description,
	colors,
	isSelected,
	isAvailable,
	onClick,
}: ThemeCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			type="button"
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			disabled={!isAvailable}
			aria-pressed={isSelected}
			aria-label={`${label} theme${!isAvailable ? " (coming soon)" : ""}`}
			className={`
				relative flex-1 p-4 rounded-2xl text-left w-full
				transition-all duration-300
				focus-visible:ring-2 focus-visible:ring-offset-2
				${
					isSelected
						? "bg-white shadow-lifted focus-visible:ring-pink-400"
						: "bg-white/60 hover:bg-white hover:shadow-soft focus-visible:ring-gray-400"
				}
				${!isAvailable ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
			`}
			style={{
				border: isSelected
					? `2px solid ${colors[2]}30`
					: "2px solid transparent",
				transform: isSelected
					? "scale(1.02)"
					: isHovered && isAvailable
						? "scale(1.01)"
						: "scale(1)",
			}}
		>
			{/* Mini Preview Grid */}
			<div className="mb-4">
				<MiniGrid colors={colors} animate={isHovered || isSelected} />
			</div>

			{/* Label */}
			<div className="flex items-center justify-between gap-2">
				<div className="min-w-0">
					<p
						className="font-semibold text-sm truncate"
						style={{ color: isSelected ? colors[3] : "#3d3a36" }}
					>
						{label}
					</p>
					<p className="text-[11px] text-gray-400 truncate">{description}</p>
				</div>

				{/* Selection Indicator */}
				{isSelected && (
					<div
						className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
						style={{
							backgroundColor: colors[2],
							transform: "scale(1)",
						}}
					>
						<svg
							className="w-3 h-3 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
							aria-hidden="true"
						>
							<title>Selected</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				)}

				{!isAvailable && (
					<span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
						Soon
					</span>
				)}
			</div>
		</button>
	);
}

interface ThemeSelectProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const THEMES = [
	{
		id: "flower" as Theme,
		label: "Flower",
		description: "Blooming garden",
		colors: ["#fce7f3", "#f9a8d4", "#ec4899", "#be185d"],
		available: true,
	},
	{
		id: "cloud" as Theme,
		label: "Cloud",
		description: "Floating sky",
		colors: ["#e0f2fe", "#7dd3fc", "#0ea5e9", "#0369a1"],
		available: false,
	},
	{
		id: "hair" as Theme,
		label: "Hair",
		description: "Growing strands",
		colors: ["#fef3c7", "#fcd34d", "#f59e0b", "#b45309"],
		available: false,
	},
];

export function ThemeSelect({ theme, setTheme }: ThemeSelectProps) {
	return (
		<div className="grid grid-cols-3 gap-2 sm:gap-3">
			{THEMES.map((t, index) => (
				<div
					key={t.id}
					className="animate-fade-in-scale opacity-0"
					style={{ animationDelay: `${0.1 + index * 0.05}s` }}
				>
					<ThemeCard
						{...t}
						isSelected={theme === t.id}
						isAvailable={t.available}
						onClick={() => t.available && setTheme(t.id)}
					/>
				</div>
			))}
		</div>
	);
}

export function getThemeColors(theme: Theme) {
	const found = THEMES.find((t) => t.id === theme);
	return {
		bg: found?.colors[0] || "#fce7f3",
		bgActive: found?.colors[1] || "#f9a8d4",
		accent: found?.colors[2] || "#ec4899",
		text: found?.colors[3] || "#be185d",
	};
}

export type { Theme };
