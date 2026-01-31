"use client";

import { getThemeColors, type Theme } from "@/components/ThemeTabs";

interface ComingSoonContentProps {
	theme: Theme;
}

export function ComingSoonContent({ theme }: ComingSoonContentProps) {
	const colors = getThemeColors(theme);

	return (
		<div
			className="rounded-2xl p-8 text-center"
			style={{ backgroundColor: colors.bg }}
		>
			<p className="font-medium" style={{ color: colors.text }}>
				Coming Soon
			</p>
			<p className="text-sm text-gray-400 mt-1">
				This style is currently under development
			</p>
		</div>
	);
}
