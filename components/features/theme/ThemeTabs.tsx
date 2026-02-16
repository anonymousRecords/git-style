"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Theme = "flower" | "cloud" | "hair";

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
		id: "hair" as Theme,
		label: "Hair",
		description: "Growing strands",
		colors: ["#fef3c7", "#fcd34d", "#f59e0b", "#b45309"],
		available: true,
	},
	{
		id: "cloud" as Theme,
		label: "Cloud",
		description: "Floating sky",
		colors: ["#e0f2fe", "#7dd3fc", "#0ea5e9", "#0369a1"],
		available: false,
	},
];

export function ThemeSelect({ theme, setTheme }: ThemeSelectProps) {
	const posthog = usePostHog();
	const navRef = useRef<HTMLDivElement>(null);
	const buttonRefs = useRef<Map<Theme, HTMLButtonElement>>(new Map());
	const [indicator, setIndicator] = useState<{
		top: number;
		left: number;
		width: number;
		height: number;
	} | null>(null);

	const updateIndicator = useCallback(() => {
		const nav = navRef.current;
		const button = buttonRefs.current.get(theme);
		if (!nav || !button) return;

		const navRect = nav.getBoundingClientRect();
		const btnRect = button.getBoundingClientRect();

		setIndicator({
			top: btnRect.top - navRect.top,
			left: btnRect.left - navRect.left,
			width: btnRect.width,
			height: btnRect.height,
		});
	}, [theme]);

	useEffect(() => {
		updateIndicator();
	}, [updateIndicator]);

	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;

		const observer = new ResizeObserver(() => {
			updateIndicator();
		});
		observer.observe(nav);

		return () => observer.disconnect();
	}, [updateIndicator]);

	return (
		// biome-ignore lint/a11y/useSemanticElements: listitem
		<nav
			ref={navRef}
			role="listitem"
			className="relative flex flex-row gap-1 mb-4 lg:absolute lg:right-full lg:top-0 lg:flex-col lg:mr-6 lg:mb-0"
		>
			{indicator && (
				<div
					className="absolute bg-neutral-900 rounded-lg z-0"
					style={{
						top: indicator.top,
						left: indicator.left,
						width: indicator.width,
						height: indicator.height,
						transition:
							"top 0.4s var(--ease-spring), left 0.4s var(--ease-spring), width 0.3s var(--ease-spring), height 0.3s var(--ease-spring)",
					}}
				/>
			)}

			{THEMES.map((t) => (
				<button
					key={t.id}
					ref={(el) => {
						if (el) buttonRefs.current.set(t.id, el);
					}}
					type="button"
					role="tab"
					aria-selected={theme === t.id}
					disabled={!t.available}
					onClick={() => {
						if (!t.available) return;
						posthog?.capture("theme_selected", { theme: t.id });
						setTheme(t.id);
					}}
					className={`
						relative z-10 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
						transition-colors duration-200
						flex items-center gap-2
						${theme === t.id ? "text-white" : "text-neutral-400 hover:text-neutral-600"}
						${!t.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
					`}
				>
					{t.label}
					{!t.available && (
						<span className="text-[10px] font-medium bg-neutral-100 text-neutral-400 px-1.5 py-0.5 rounded">
							Soon
						</span>
					)}
				</button>
			))}
		</nav>
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
