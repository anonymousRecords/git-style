export interface ContributionDay {
	date: string;
	count: number;
}

interface RawContributionDay {
	date: string;
	contributionCount: number;
}

interface RawWeek {
	contributionDays: RawContributionDay[];
}

interface ContributionsQueryResponse {
	data?: {
		user: {
			contributionsCollection: {
				contributionCalendar: {
					weeks: RawWeek[];
				};
			};
		} | null;
	};
	errors?: { message: string }[];
}

const CONTRIBUTIONS_QUERY = `
	query ($login: String!) {
		user(login: $login) {
			contributionsCollection {
				contributionCalendar {
					weeks {
						contributionDays {
							date
							contributionCount
						}
					}
				}
			}
		}
	}
`;

export async function fetchContributions(
	username: string,
): Promise<ContributionDay[]> {
	const token = process.env.GITHUB_TOKEN;

	if (!token) {
		throw new Error("GITHUB_TOKEN is not configured");
	}

	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: CONTRIBUTIONS_QUERY,
			variables: { login: username },
		}),
	});

	if (!res.ok) {
		throw new Error(
			`Failed to fetch contributions for ${username} (HTTP ${res.status})`,
		);
	}

	const json: ContributionsQueryResponse = await res.json();

	if (json.errors?.length) {
		throw new Error(
			`Failed to fetch contributions for ${username}: ${json.errors[0].message}`,
		);
	}

	const rawWeeks =
		json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

	if (!rawWeeks) {
		throw new Error(`GitHub user not found: ${username}`);
	}

	const days: ContributionDay[] = rawWeeks
		.flatMap((week) => week.contributionDays)
		.filter((day) => !!day?.date && typeof day.contributionCount === "number")
		.map((day) => ({
			date: day.date,
			count: day.contributionCount,
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
