export interface ContributionDay {
	date: string;
	count: number;
}

interface RawContributionDay {
	date: string;
	contributionCount: number;
	color: string;
	contributionLevel:
		| "NONE"
		| "FIRST_QUARTILE"
		| "SECOND_QUARTILE"
		| "THIRD_QUARTILE"
		| "FOURTH_QUARTILE";
}

type RawWeek = RawContributionDay[];

interface GitHubContributionsResponse {
	contributions: RawWeek[];
}

export async function fetchContributions(
	username: string,
): Promise<ContributionDay[]> {
	const res = await fetch(
		`https://github-contributions-api.deno.dev/${username}.json`,
	);

	if (!res.ok) {
		throw new Error(`Failed to fetch contributions for ${username}`);
	}

	const json: GitHubContributionsResponse = await res.json();

	const rawWeeks = json?.contributions || [];

	const days: ContributionDay[] = rawWeeks
		.flat()
		.filter((day) => !!day?.date && typeof day.contributionCount === "number")
		.map((day) => ({
			date: day.date,
			count: day.contributionCount ?? 0,
		}));

	return days;
}

export function chunkIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
	const weeks: ContributionDay[][] = [];

	for (let i = 0; i < days.length; i += 7) {
		weeks.push(days.slice(i, i + 7));
	}

	return weeks;
}
