import { getGitHubStats, getGitHubRepos } from "@/lib/github";
import HomeContent from "@/components/HomeContent";
import { projects } from "@/data/portfolio";

export const revalidate = 86400;

export default async function Home() {
  let githubStats = null;
  let enrichedProjects = projects;

  try {
    githubStats = await getGitHubStats();
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
  }

  try {
    const repoNames = projects
      .filter((p) => p.github)
      .map((p) => {
        const parts = p.github.replace("https://github.com/", "").split("/");
        return parts[1];
      })
      .filter(Boolean);

    const repoData = await getGitHubRepos(repoNames);

    enrichedProjects = projects.map((project) => {
      if (!project.github) return project;

      const repoName = project.github
        .replace("https://github.com/", "")
        .split("/")[1];

      const repo = repoData.find(
        (r) => r.name.toLowerCase() === repoName.toLowerCase()
      );

      if (!repo) return project;

      return {
        ...project,
        languages: repo.languages,
        stars: repo.stars,
        lastUpdated: repo.lastUpdated,
        live: project.live || repo.homepage,
      };
    });
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
  }

  return (
    <HomeContent githubStats={githubStats} projects={enrichedProjects} />
  );
}