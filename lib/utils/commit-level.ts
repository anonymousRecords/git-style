export type CommitLevel = "none" | "low" | "medium" | "high" | "max";

export function getCommitLevel(commitCount: number): CommitLevel {
	if (commitCount === 0) return "none";
	if (commitCount <= 2) return "low";
	if (commitCount <= 4) return "medium";
	if (commitCount <= 7) return "high";
	return "max";
}
