"use client";

import { useState } from "react";
import { ThemeContent } from "@/components/features/theme/ThemeContent";
import { type Theme, ThemeSelect } from "@/components/features/theme/ThemeTabs";
import Header from "@/components/layout/Header";

export default function Home() {
	const [theme, setTheme] = useState<Theme>("flower");

	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-col gap-10">
				<section className="relative animate-fade-in opacity-0">
					<ThemeSelect theme={theme} setTheme={setTheme} />
					<ThemeContent theme={theme} />
				</section>
			</div>
		</div>
	);
}
