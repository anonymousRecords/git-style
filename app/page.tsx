"use client";

import { useState } from "react";
import { ThemeContent } from "@/components/features/theme/ThemeContent";
import { type Theme, ThemeSelect } from "@/components/features/theme/ThemeTabs";
import Header from "@/components/layout/Header";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function Home() {
	const [theme, setTheme] = useState<Theme>("flower");

	return (
		<div className="flex flex-col">
			<Header theme={theme} />
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
		</div>
	);
}
