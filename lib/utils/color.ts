export function adjustBrightness(hex: string, percent: number): string {
	const num = Number.parseInt(hex.replace("#", ""), 16);
	const r = Math.min(255, Math.max(0, (num >> 16) + percent));
	const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
	const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
