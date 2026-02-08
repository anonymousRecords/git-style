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
			<Header />
			<div className="flex flex-col gap-10">
				<section className="animate-fade-in opacity-0">
					<SectionLabel>Style</SectionLabel>
					<ThemeSelect theme={theme} setTheme={setTheme} />
				</section>

				<section
					className="animate-fade-in opacity-0"
					style={{ animationDelay: "0.05s" }}
				>
					<ThemeContent theme={theme} />
				</section>
			</div>
		</div>
	);
}
