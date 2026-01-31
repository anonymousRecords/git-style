"use client";

import { useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { FlowerSelector } from "@/components/FlowerSelector";
import PreviewCard from "@/components/PreviewCard";
import { UserInputGroup } from "@/components/UserInputGroup";
import type { FlowerType } from "@/lib/animation/types";

export default function Home() {
	const [theme, setTheme] = useState("plant");
	const [username, setUsername] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [flowerType, setFlowerType] = useState<FlowerType>("default");
	const [flowerColor, setFlowerColor] = useState("#fbbf24");

	const handleSubmit = () => {
		if (!username) return;
		setSubmitted(true);
	};

	return (
		<div className="px-6 flex flex-col gap-4">
			<FilterBar theme={theme} setTheme={setTheme} />

			<FlowerSelector
				flowerType={flowerType}
				setFlowerType={setFlowerType}
				flowerColor={flowerColor}
				setFlowerColor={setFlowerColor}
			/>

			<UserInputGroup
				username={username}
				setUsername={setUsername}
				onSubmit={handleSubmit}
			/>

			{submitted && (
				<PreviewCard
					username={username}
					flowerType={flowerType}
					flowerColor={flowerColor}
				/>
			)}
		</div>
	);
}
