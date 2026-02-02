export function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<p
			className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-4"
			style={{ color: "#9a9590" }}
		>
			{children}
		</p>
	);
}
