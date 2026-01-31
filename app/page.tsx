"use client";

import { useState } from "react";
import { FlowerSelector } from "@/components/FlowerSelector";
import PreviewCard from "@/components/PreviewCard";
import { UserInputGroup } from "@/components/UserInputGroup";
import type { FlowerType } from "@/lib/animation/types";

export default function Home() {
	const [username, setUsername] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [flowerType, setFlowerType] = useState<FlowerType>("default");
	const [flowerColor, setFlowerColor] = useState("#fbbf24");

	const handleSubmit = () => {
		if (!username) return;
		setSubmitted(true);
	};

	return (
		<div className="px-6 flex flex-col gap-6">
			<UserInputGroup username={username} setUsername={setUsername} />

			<FlowerSelector
				flowerType={flowerType}
				setFlowerType={setFlowerType}
				flowerColor={flowerColor}
				setFlowerColor={setFlowerColor}
			/>

			<button
				type="button"
				onClick={handleSubmit}
				disabled={!username}
				className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold text-lg transition-all hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
			>
				Generate
			</button>

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
