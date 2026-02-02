"use client";

import {
	getThemeColors,
	type Theme,
} from "@/components/features/theme/ThemeTabs";

interface ComingSoonContentProps {
	theme: Theme;
}

export function ComingSoonContent({ theme }: ComingSoonContentProps) {
	const colors = getThemeColors(theme);

	return (
		<div
			className="rounded-2xl p-10 text-center transition-all duration-300 animate-fade-in-scale"
			style={{
				backgroundColor: colors.bg,
				boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
			}}
		>
			<p className="font-semibold text-lg mb-1" style={{ color: colors.text }}>
				Coming Soon
			</p>
			<p className="text-sm" style={{ color: "#9a9590" }}>
				This style is currently under development
			</p>
		</div>
	);
}
