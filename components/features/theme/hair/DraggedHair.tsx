import type { Position } from "./types";

interface DraggedHairProps {
	originPos: Position;
	currentPos: Position;
	stretchProgress: number;
	tensionProgress: number;
	hairColor: string;
}

export function DraggedHair({
	originPos,
	currentPos,
	stretchProgress,
	tensionProgress,
	hairColor,
}: DraggedHairProps) {
	const dx = currentPos.x - originPos.x;
	const dy = currentPos.y - originPos.y;
	const distance = Math.sqrt(dx * dx + dy * dy);

	const midX = originPos.x + dx * 0.5;
	const midY = originPos.y + dy * 0.3 + Math.min(distance * 0.2, 50);

	const strandPath = `M ${originPos.x} ${originPos.y} Q ${midX} ${midY} ${currentPos.x} ${currentPos.y - 10}`;

	const rootProgress = Math.min(stretchProgress * 2, 1);

	// Hair strands being pulled
	const hairAscii =
		tensionProgress > 0.7
			? " |\n |\n /"
			: tensionProgress > 0.4
				? " |\n |"
				: " |";

	return (
		<div className="fixed inset-0 pointer-events-none z-[9999]">
			<svg
				className="absolute inset-0 w-full h-full overflow-visible"
				role="img"
				aria-label="Hair strand being pulled"
			>
				<path
					d={strandPath}
					fill="none"
					stroke={tensionProgress > 0.7 ? "#ef4444" : hairColor}
					strokeWidth={2}
					strokeLinecap="round"
					strokeDasharray={tensionProgress > 0.5 ? "4 2" : "none"}
				/>

				{rootProgress > 0 && (
					<g style={{ opacity: rootProgress }}>
						<circle
							cx={originPos.x}
							cy={originPos.y + 15}
							r={3 + rootProgress * 2}
							fill="#fdd0bb"
							opacity={0.8}
						/>
						<text
							x={originPos.x}
							y={originPos.y + 25}
							textAnchor="middle"
							fontSize="10"
							fontFamily="monospace"
							fill="#c9a86c"
						>
							•
						</text>
					</g>
				)}
			</svg>

			<pre
				className="absolute font-mono text-xs select-none whitespace-pre text-center"
				style={{
					left: currentPos.x - 8,
					top: currentPos.y - 25,
					transform: `rotate(${Math.atan2(dy, dx) * 0.05}rad)`,
					color: tensionProgress > 0.7 ? "#ef4444" : hairColor,
				}}
			>
				{hairAscii}
			</pre>

			{tensionProgress > 0.6 && (
				<div
					className="absolute font-mono text-amber-700 text-xs"
					style={{ left: originPos.x - 15, top: originPos.y }}
				>
					{["~", "·", "·"].map((char, i) => (
						<span
							key={`scalp-${i}`}
							className="absolute animate-bounce"
							style={{
								left: i * 10,
								animationDelay: `${i * 0.1}s`,
								animationDuration: "0.3s",
							}}
						>
							{char}
						</span>
					))}
				</div>
			)}
		</div>
	);
}
