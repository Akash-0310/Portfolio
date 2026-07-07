// Live GitHub data with real fallbacks (measured 2026-06 for Akash-0310).
// Fetched client-side from public APIs — each visitor uses their own IP rate budget.

const USERNAME = 'Akash-0310'

export interface GitHubLang {
  name: string
  percent: number
  color: string
}

export interface GitHubData {
  commits: number
  stars: number
  repos: number
  contributions: number
  // 53 weeks x 7 days, intensity level 0-4
  calendar: number[]
  currentStreak: number
  longestStreak: number
  languages: GitHubLang[]
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  CSS: '#06b6d4',
  HTML: '#e34f26',
  Python: '#3776ab',
  Shell: '#10b981',
  Java: '#b07219',
  Other: '#6b7280',
}

// Real values measured from the GitHub API — shown if a live fetch fails.
export const FALLBACK: GitHubData = {
  commits: 241,
  stars: 18,
  repos: 34,
  contributions: 431,
  calendar: [],
  currentStreak: 0,
  longestStreak: 24,
  languages: [
    { name: 'JavaScript', percent: 42, color: LANG_COLORS.JavaScript },
    { name: 'TypeScript', percent: 36, color: LANG_COLORS.TypeScript },
    { name: 'CSS/Tailwind', percent: 20, color: LANG_COLORS.CSS },
    { name: 'Other', percent: 2, color: LANG_COLORS.Other },
  ],
}

function computeStreaks(days: { count: number }[]): { current: number; longest: number } {
  let longest = 0
  let run = 0
  for (const d of days) {
    if (d.count > 0) {
      run++
      if (run > longest) longest = run
    } else {
      run = 0
    }
  }
  // Current streak: consecutive active days ending today. If today has no
  // contributions *yet*, it doesn't break the streak — count through yesterday.
  // This mirrors how GitHub streak trackers behave.
  let current = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++
    else if (i === days.length - 1) continue
    else break
  }
  return { current, longest }
}

async function fetchJSON(url: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(url, init)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

// Returns only the fields it could fetch live. Callers should merge the result
// over their current state (starting from FALLBACK) — that way a partial or
// rate-limited fetch never clobbers previously-good values with fallbacks.
export async function fetchGitHubData(): Promise<Partial<GitHubData>> {
  const data: Partial<GitHubData> = {}

  const tasks: Promise<void>[] = []

  // Profile → public repos count.
  tasks.push(
    fetchJSON(`https://api.github.com/users/${USERNAME}`)
      .then((u) => {
        const repos = (u as { public_repos?: number }).public_repos
        if (typeof repos === 'number') data.repos = repos
      })
      .catch(() => {})
  )

  // Repos → total stars + language bytes from the most recently pushed repos.
  tasks.push(
    (async () => {
      const repos = (await fetchJSON(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`
      )) as { stargazers_count?: number; languages_url?: string; fork?: boolean }[]

      data.stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)

      const langUrls = repos
        .filter((r) => !r.fork && r.languages_url)
        .slice(0, 8)
        .map((r) => r.languages_url as string)

      const byteMaps = await Promise.all(
        langUrls.map((u) => fetchJSON(u).catch(() => ({})) as Promise<Record<string, number>>)
      )

      const agg: Record<string, number> = {}
      for (const m of byteMaps) {
        for (const [k, v] of Object.entries(m)) agg[k] = (agg[k] || 0) + v
      }
      const total = Object.values(agg).reduce((a, b) => a + b, 0)
      if (total > 0) {
        const sorted = Object.entries(agg).sort((a, b) => b[1] - a[1])
        const top = sorted.slice(0, 5)
        const otherPct = Math.round(
          (sorted.slice(5).reduce((a, [, v]) => a + v, 0) / total) * 100
        )
        const langs: GitHubLang[] = top.map(([name, bytes]) => ({
          name: name === 'CSS' ? 'CSS/Tailwind' : name,
          percent: Math.round((bytes / total) * 100),
          color: LANG_COLORS[name] || LANG_COLORS.Other,
        }))
        if (otherPct > 0) langs.push({ name: 'Other', percent: otherPct, color: LANG_COLORS.Other })
        data.languages = langs.filter((l) => l.percent > 0)
      }
    })().catch(() => {})
  )

  // Contribution data → calendar, past-year total, and both streaks.
  // Two views of the same source:
  //   • ?y=last   → the trailing 12 months, already bounded to today. Drives the
  //                 heatmap, the authoritative "past year" total, and the *current*
  //                 streak (which never spans more than a year).
  //   • full hist → every year, so the *longest* streak reflects all-time activity.
  const CONTRIB = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`
  tasks.push(
    (async () => {
      const [last, all] = await Promise.all([
        fetchJSON(`${CONTRIB}?y=last`) as Promise<{
          total?: Record<string, number>
          contributions?: { date: string; count: number; level: number }[]
        }>,
        fetchJSON(CONTRIB).catch(() => null) as Promise<{
          contributions?: { date: string; count: number; level: number }[]
        } | null>,
      ])

      const days = last.contributions || []
      if (days.length) {
        data.calendar = days.map((d) => d.level)
        // Use the API's own last-year total — the exact number GitHub displays.
        data.contributions =
          (last.total && (last.total.lastYear ?? Object.values(last.total)[0])) ||
          days.reduce((a, d) => a + d.count, 0)
        data.currentStreak = computeStreaks(days).current
      }

      // All-time longest streak. Years come grouped, so sort into one timeline;
      // trailing future/zero days don't affect a longest-run scan. Falls back to
      // the last-year window if the full-history request failed.
      const history =
        all && all.contributions
          ? all.contributions.slice().sort((a, b) => a.date.localeCompare(b.date))
          : days
      if (history.length) data.longestStreak = computeStreaks(history).longest
    })().catch(() => {})
  )

  // Public authored commits (best-effort, may be rate limited).
  tasks.push(
    fetchJSON(`https://api.github.com/search/commits?q=author:${USERNAME}&per_page=1`, {
      headers: { Accept: 'application/vnd.github.cloak-preview+json' },
    })
      .then((r) => {
        const n = (r as { total_count?: number }).total_count
        if (typeof n === 'number' && n > 0) data.commits = n
      })
      .catch(() => {})
  )

  await Promise.all(tasks)
  return data
}
