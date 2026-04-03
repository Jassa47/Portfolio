const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Jassa47";

const GRAPHQL_URL = "https://api.github.com/graphql";
const REST_URL = "https://api.github.com";

function getHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

// ─── Fetch contribution data via GraphQL ───
async function fetchContributionData() {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      query,
      variables: { username: GITHUB_USERNAME },
    }),
  });

  if (!res.ok) {
    console.error("GitHub GraphQL error:", res.status);
    return null;
  }

  const data = await res.json();
  return data?.data?.user?.contributionsCollection || null;
}

// ─── Calculate streaks from contribution calendar ───
function calculateStreaks(contributionCollection) {
  if (!contributionCollection?.contributionCalendar?.weeks) {
    return { currentStreak: 0, maxStreak: 0 };
  }

  const days = [];
  for (const week of contributionCollection.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      days.push({
        date: day.date,
        count: day.contributionCount,
      });
    }
  }

  // Sort by date ascending
  days.sort((a, b) => a.date.localeCompare(b.date));

  let maxStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  for (let i = 0; i < days.length; i++) {
    if (days[i].count > 0) {
      tempStreak++;
      if (tempStreak > maxStreak) {
        maxStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  // Calculate current streak (from today going backwards)
  const today = new Date().toISOString().split("T")[0];
  const todayIndex = days.findIndex((d) => d.date === today);
  const startIndex = todayIndex >= 0 ? todayIndex : days.length - 1;

  for (let i = startIndex; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { currentStreak, maxStreak };
}

// ─── Fetch public repos count ───
async function fetchRepoCount() {
  const res = await fetch(`${REST_URL}/users/${GITHUB_USERNAME}`, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    console.error("GitHub REST error:", res.status);
    return 0;
  }

  const data = await res.json();
  return data.public_repos || 0;
}

// ─── Fetch repo details for project cards ───
async function fetchRepoDetails(repoNames) {
  const repos = [];

  for (const name of repoNames) {
    try {
      // Fetch repo info
      const repoRes = await fetch(
        `${REST_URL}/repos/${GITHUB_USERNAME}/${name}`,
        { headers: getHeaders() }
      );

      if (!repoRes.ok) continue;
      const repoData = await repoRes.json();

      // Fetch languages
      const langRes = await fetch(
        `${REST_URL}/repos/${GITHUB_USERNAME}/${name}/languages`,
        { headers: getHeaders() }
      );
      const langData = langRes.ok ? await langRes.json() : {};

      // Calculate language percentages
      const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
      const languages = Object.entries(langData).map(([lang, bytes]) => ({
        name: lang,
        percentage: Math.round((bytes / totalBytes) * 100),
      }));

      repos.push({
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description || "",
        url: repoData.html_url,
        homepage: repoData.homepage || null,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        lastUpdated: repoData.updated_at,
        languages: languages,
        topics: repoData.topics || [],
      });
    } catch (err) {
      console.error(`Error fetching repo ${name}:`, err);
    }
  }

  return repos;
}

// ─── Main: get all stats ───
export async function getGitHubStats() {
  try {
    const [contributionData, repoCount] = await Promise.all([
      fetchContributionData(),
      fetchRepoCount(),
    ]);

    const totalContributions =
      contributionData?.contributionCalendar?.totalContributions || 0;
    const { currentStreak, maxStreak } = calculateStreaks(contributionData);

    return {
      repos: repoCount,
      contributions: totalContributions,
      currentStreak,
      maxStreak,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
    // Fallback values
    return {
      repos: 4,
      contributions: 0,
      currentStreak: 0,
      maxStreak: 0,
      fetchedAt: null,
    };
  }
}

// ─── Main: get repo data for project cards ───
export async function getGitHubRepos(repoNames) {
  try {
    return await fetchRepoDetails(repoNames);
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return [];
  }
}
// ─── Fetch ALL public repos ───
export async function getAllPublicRepos() {
  try {
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const res = await fetch(
        `${REST_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`,
        { headers: getHeaders() }
      );

      if (!res.ok) break;

      const repos = await res.json();
      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = allRepos.concat(repos);
        page++;
      }
    }

    const results = [];

    for (const repo of allRepos) {
      if (repo.fork) continue;

      let languages = [];
      try {
        const langRes = await fetch(
          `${REST_URL}/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
          { headers: getHeaders() }
        );
        if (langRes.ok) {
          const langData = await langRes.json();
          const totalBytes = Object.values(langData).reduce((a, b) => a + b, 0);
          if (totalBytes > 0) {
            languages = Object.entries(langData).map(([lang, bytes]) => ({
              name: lang,
              percentage: Math.round((bytes / totalBytes) * 100),
            }));
          }
        }
      } catch (err) {
        // skip language fetch errors
      }

      results.push({
        name: repo.name,
        description: repo.description || "",
        url: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        lastUpdated: repo.updated_at,
        languages: languages,
        topics: repo.topics || [],
      });
    }

    return results;
  } catch (err) {
    console.error("Failed to fetch all repos:", err);
    return [];
  }
}