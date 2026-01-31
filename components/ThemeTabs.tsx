"use client";

import { useState } from "react";

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
	return (
		<div className="grid grid-cols-7 gap-[2px]">
			{Array.from({ length: 21 }).map((_, i) => {
				const intensity = Math.random();
				const colorIndex = Math.floor(intensity * colors.length);
				const delay = (i % 7) * 0.05 + Math.floor(i / 7) * 0.08;

				return (
					<div
						key={`${i}-${Math.random()}`}
						className="w-2 h-2 rounded-sm transition-all duration-300"
						style={{
							backgroundColor:
								intensity > 0.3 ? colors[colorIndex] : "rgba(0,0,0,0.06)",
							transform: animate ? "scale(1)" : "scale(0.8)",
							opacity: animate ? 1 : 0.5,
							transitionDelay: animate ? `${delay}s` : "0s",
						}}
					/>
				);
			})}
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
			className={`
				relative flex-1 p-4 rounded-2xl transition-all duration-300 text-left
				${
					isSelected
						? "bg-white shadow-lg scale-[1.02]"
						: "bg-gray-50 hover:bg-white hover:shadow-md"
				}
				${!isAvailable ? "opacity-60" : ""}
			`}
			style={{
				outline: isSelected ? `2px solid ${colors[1]}` : "none",
				outlineOffset: "2px",
			}}
		>
			{/* Mini Preview Grid */}
			<div className="mb-3">
				<MiniGrid colors={colors} animate={isHovered || isSelected} />
			</div>

			{/* Label */}
			<div className="flex items-center justify-between">
				<div>
					<p className="font-semibold text-gray-900 text-sm">{label}</p>
					<p className="text-xs text-gray-500">{description}</p>
				</div>

				{/* Selection Indicator */}
				{isSelected && (
					<div
						className="w-5 h-5 rounded-full flex items-center justify-center"
						style={{ backgroundColor: colors[1] }}
					>
						<svg
							role="img"
							aria-label="Check"
							className="w-3 h-3 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				)}

				{!isAvailable && (
					<span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
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
		<div className="flex gap-3">
			{THEMES.map((t) => (
				<ThemeCard
					key={t.id}
					{...t}
					isSelected={theme === t.id}
					isAvailable={t.available}
					onClick={() => t.available && setTheme(t.id)}
				/>
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
