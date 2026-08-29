/** 요청한 GitHub 사용자가 존재하지 않음. */
export class UserNotFoundError extends Error {}

/** GitHub API 호출 자체가 실패함 (업스트림 장애). */
export class GitHubApiError extends Error {}

/** GITHUB_TOKEN 환경변수가 설정되지 않음 (배포 설정 오류). */
export class MissingTokenError extends Error {}

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
	errors?: { message: string; type?: string }[];
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
		throw new MissingTokenError("GITHUB_TOKEN is not configured");
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
		throw new GitHubApiError(
			`Failed to fetch contributions for ${username} (HTTP ${res.status})`,
		);
	}

	const json: ContributionsQueryResponse = await res.json();

	if (json.errors?.length) {
		const message = `Failed to fetch contributions for ${username}: ${json.errors[0].message}`;

		if (json.errors.some((error) => error.type === "NOT_FOUND")) {
			throw new UserNotFoundError(message);
		}

		throw new GitHubApiError(message);
	}

	const rawWeeks =
		json.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

	if (!rawWeeks) {
		throw new UserNotFoundError(`GitHub user not found: ${username}`);
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
