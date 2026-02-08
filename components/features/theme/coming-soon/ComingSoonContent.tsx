"use client";

import type { Theme } from "@/components/features/theme/ThemeTabs";

interface ComingSoonContentProps {
	theme: Theme;
}

export function ComingSoonContent({ theme: _theme }: ComingSoonContentProps) {
	return (
		<div className="rounded-xl border border-neutral-100 bg-neutral-50 p-8 text-center">
			<p className="font-medium text-neutral-900 mb-1">Coming Soon</p>
			<p className="text-sm text-neutral-500">
				This style is currently under development
			</p>
		</div>
	);
}
