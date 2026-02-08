import type { Position } from "./types";

interface DraggedFlowerProps {
	originPos: Position;
	currentPos: Position;
	stretchProgress: number;
	tensionProgress: number;
}

export function DraggedFlower({
	originPos,
	currentPos,
	stretchProgress,
	tensionProgress,
}: DraggedFlowerProps) {
	const dx = currentPos.x - originPos.x;
	const dy = currentPos.y - originPos.y;
	const distance = Math.sqrt(dx * dx + dy * dy);

	const midX = originPos.x + dx * 0.5;
	const midY = originPos.y + dy * 0.3 + Math.min(distance * 0.2, 50);

	const stemPath = `M ${originPos.x} ${originPos.y} Q ${midX} ${midY} ${currentPos.x} ${currentPos.y - 15}`;

	const rootProgress = Math.min(stretchProgress * 2, 1);

	const flowerAscii =
		tensionProgress > 0.7
			? " @\n/|\\"
			: tensionProgress > 0.4
				? " @\n |"
				: " @";

	return (
		<div className="fixed inset-0 pointer-events-none z-[9999]">
			<svg
				className="absolute inset-0 w-full h-full overflow-visible"
				role="img"
				aria-label="Flower stem connecting to origin"
			>
				<path
					d={stemPath}
					fill="none"
					stroke={tensionProgress > 0.7 ? "#ef4444" : "#15803d"}
					strokeWidth={2}
					strokeLinecap="round"
					strokeDasharray={tensionProgress > 0.5 ? "4 2" : "none"}
				/>

				{rootProgress > 0 && (
					<g style={{ opacity: rootProgress }}>
						<text
							x={originPos.x}
							y={originPos.y + 20}
							textAnchor="middle"
							fontSize="12"
							fontFamily="monospace"
							fill="#a67c52"
						>
							/|\\
						</text>
					</g>
				)}
			</svg>

			<pre
				className="absolute font-mono text-sm text-green-700 select-none whitespace-pre text-center"
				style={{
					left: currentPos.x - 12,
					top: currentPos.y - 30,
					transform: `rotate(${Math.atan2(dy, dx) * 0.05}rad)`,
					color: tensionProgress > 0.7 ? "#ef4444" : "#15803d",
				}}
			>
				{flowerAscii}
			</pre>

			{tensionProgress > 0.6 && (
				<div
					className="absolute font-mono text-amber-700 text-xs"
					style={{ left: originPos.x - 15, top: originPos.y }}
				>
					{[".", "*", "~"].map((char, i) => (
						<span
							key={`dirt-${i}`}
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
