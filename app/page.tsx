"use client";

import { useState } from "react";
import { type Theme, ThemeSelect } from "@/components/ThemeTabs";
import { ThemeContent } from "@/components/theme-content";

export default function Home() {
	const [theme, setTheme] = useState<Theme>("flower");

	return (
		<div className="px-5 flex flex-col gap-6">
			<section>
				<p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
					Choose Style
				</p>
				<ThemeSelect theme={theme} setTheme={setTheme} />
			</section>

			<section>
				<ThemeContent theme={theme} />
			</section>
		</div>
	);
}
