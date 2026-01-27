"use client";

import { FilterBar } from "@/components/FilterBar";
import PreviewCard from "@/components/preview-card";
import { UserInputGroup } from "@/components/UserInputGroup";
import { useState } from "react";

export default function Home() {
	const [theme, setTheme] = useState("plant");
	const [username, setUsername] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = () => {
		if (!username) return;
		setSubmitted(true);
	};

	return (
		<div className="px-3 mt-[48px] mb-[66px]">
			<FilterBar theme={theme} setTheme={setTheme} />

			<div className="pt-8">
				<UserInputGroup
					username={username}
					setUsername={setUsername}
					onSubmit={handleSubmit}
				/>
			</div>

			{submitted && (
				<PreviewCard username={username} />
			)}
		</div>
	);
}
