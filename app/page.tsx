"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/common/SectionLabel";
import { type Theme, ThemeSelect } from "@/components/ThemeTabs";
import { ThemeContent } from "@/components/theme-content";

export default function Home() {
	const [theme, setTheme] = useState<Theme>("flower");

	return (
		<div className="px-6 flex flex-col gap-8">
			<section
				className="animate-fade-in opacity-0"
				style={{ animationDelay: "0.1s" }}
			>
				<SectionLabel>Choose Style</SectionLabel>
				<ThemeSelect theme={theme} setTheme={setTheme} />
			</section>

			<section
				className="animate-fade-in opacity-0"
				style={{ animationDelay: "0.2s" }}
			>
				<ThemeContent theme={theme} />
			</section>
		</div>
	);
}
