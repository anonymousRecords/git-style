"use client";

interface ChipProps {
	label: string;
	active?: boolean;
	onClick?: () => void;
}

export default function Chip({ label, active = false, onClick }: ChipProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium
				${active ? "bg-black text-white" : "bg-white text-black border-black"}
			`}
		>
			{label}
		</button>
	);
}