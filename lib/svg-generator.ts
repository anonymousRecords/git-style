// lib/svg-generator.ts

import { chunkIntoWeeks, fetchContributions } from "@/lib/github";
import { getCommitLevel, themes } from "@/lib/themes";

export async function generateThemedSVG(username: string, themeKey: string) {
	const theme = themes[themeKey] ?? themes.hair;
	const commits = await fetchContributions(username);
	const weeks = chunkIntoWeeks(commits);
	const cellSize = 14;

	const background = theme.background || "#ffffff";
	const backgroundPattern = theme.backgroundPattern;
	const patternId = `pattern_${themeKey}`;

	const baseDot = theme.showBaseDot ?? false;

	const elements = weeks.flatMap((week, weekIndex) =>
		week.map((day, dayIndex) => {
			const level = getCommitLevel(day.count);
			const x = 20 + weekIndex * cellSize;
			const y = 60 + dayIndex * cellSize;

            if (theme.getEmoji) {
                const emoji = theme.getEmoji(level);
                if (emoji) {
                    return `<text x="${x - 6}" y="${y + 6}" font-size="14">${emoji}</text>`;
                }
                return "";
            }

            const color = theme.colorMap?.[level];
			const path = theme.getPath?.(level);

			if (!path) {
				return baseDot
					? `<circle cx="${x}" cy="${y}" r="2" fill="#9ca3af" />`
					: "";
			}

			return `
        <g transform="translate(${x},${y})">
          ${baseDot ? `<circle cx="0" cy="0" r="2" fill="#6b7280" />` : ""}
          <path d="${path}" stroke="${color}" fill="none" stroke-width="2.2" stroke-linecap="round" />
        </g>
      `;
		}),
	);

	const defs = backgroundPattern
  		? `<defs>${backgroundPattern.replace(
      		/<pattern([^>]*)>/,
      		`<pattern id="${patternId}"$1>`
    		)}</defs>`
  		: "";

	const fillValue = backgroundPattern ? `url(#${patternId})` : background;
	console.log("defs:", defs);
	console.log("fillValue:", fillValue);

	const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${weeks.length * cellSize + 40}" height="180">
	  ${defs}
      <rect width="100%" height="100%" fill="${fillValue}" />
      <text x="20" y="30" font-size="16" fill="#333">${theme.emoji || ""} ${username}'s ${theme.label}</text>
      ${elements.join("\n")}
    </svg>
  `;

	return svg;
}
