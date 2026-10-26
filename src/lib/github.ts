export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Contributions = { total: number; days: ContributionDay[] };

export async function getContributions(
  username: string
): Promise<Contributions | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { next: { revalidate: 3600 } } // refresh at most once an hour
    );
    if (!res.ok) return null;

    const data = await res.json();
    const days: ContributionDay[] = data.contributions ?? [];
    if (days.length === 0) return null;

    const total =
      data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);
    return { total, days };
  } catch {
    return null;
  }
}