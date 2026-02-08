"use client";

import { useMemo } from "react";

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

function MiniGrid({
	colors,
	isSelected,
}: {
	colors: string[];
	isSelected: boolean;
}) {
	const cells = useMemo(() => {
		return Array.from({ length: 21 }).map((_, i) => {
			const intensity = Math.random();
			const colorIndex = Math.floor(intensity * colors.length);
			return { intensity, colorIndex, id: i };
		});
	}, [colors.length]);

	return (
		<div className="grid grid-cols-7 gap-[3px]">
			{cells.map((cell) => (
				<div
					key={cell.id}
					className="w-[6px] h-[6px] rounded-[2px] transition-colors duration-200"
					style={{
						backgroundColor:
							cell.intensity > 0.3
								? colors[cell.colorIndex]
								: "rgba(0,0,0,0.04)",
						opacity: isSelected ? 1 : 0.7,
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
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={!isAvailable}
			aria-pressed={isSelected}
			aria-label={`${label} theme${!isAvailable ? " (coming soon)" : ""}`}
			className={`
				relative flex-1 p-3.5 rounded-xl text-left w-full
				transition-all duration-200
				border
				${
					isSelected
						? "bg-white border-neutral-200 shadow-sm"
						: "bg-neutral-50 border-transparent hover:bg-white hover:border-neutral-100"
				}
				${!isAvailable ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
			`}
		>
			<div className="mb-3">
				<MiniGrid colors={colors} isSelected={isSelected} />
			</div>

			<div className="flex items-center justify-between gap-2">
				<div className="min-w-0">
					<p
						className={`text-sm font-medium ${
							isSelected ? "text-neutral-900" : "text-neutral-600"
						}`}
					>
						{label}
					</p>
					<p className="text-[11px] text-neutral-400 mt-0.5">{description}</p>
				</div>

				{isSelected && (
					<div
						className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
						style={{ backgroundColor: colors[2] }}
					>
						<svg
							className="w-2.5 h-2.5 text-white"
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
					<span className="text-[10px] font-medium text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded shrink-0">
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
		<div className="grid grid-cols-3 gap-2">
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
