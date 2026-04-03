import { getGitHubStats, getAllPublicRepos } from "@/lib/github";
import HomeContent from "@/components/HomeContent";
import { projects as manualProjects, excludeRepos } from "@/data/portfolio";

export const revalidate = 86400;

const colorOptions = ["purple", "blue", "teal", "coral"];

export default async function Home() {
  let githubStats = null;
  let mergedProjects = manualProjects;

  try {
    githubStats = await getGitHubStats();
  } catch (err) {
    console.error("Failed to fetch GitHub stats:", err);
  }

  try {
    const allRepos = await getAllPublicRepos();

    const enriched = manualProjects.map((project) => {
      if (!project.repoName) return project;

      const repo = allRepos.find(
        (r) => r.name.toLowerCase() === project.repoName.toLowerCase()
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

    const manualRepoNames = manualProjects
      .filter((p) => p.repoName)
      .map((p) => p.repoName.toLowerCase());

    const excludeList = excludeRepos.map((r) => r.toLowerCase());

    const newRepos = allRepos
      .filter((repo) => {
        const nameLower = repo.name.toLowerCase();
        return (
          !manualRepoNames.includes(nameLower) &&
          !excludeList.includes(nameLower) &&
          repo.description
        );
      })
      .map((repo, i) => ({
        repoName: repo.name,
        title: repo.name,
        subtitle: repo.topics.length > 0 ? repo.topics[0].toUpperCase() : "PROJECT",
        description: repo.description,
        tech: repo.languages.slice(0, 4).map((l) => l.name),
        github: repo.url,
        live: repo.homepage,
        featured: false,
        color: colorOptions[i % colorOptions.length],
        stats: null,
        languages: repo.languages,
        stars: repo.stars,
        lastUpdated: repo.lastUpdated,
      }));
    mergedProjects = [...enriched, ...newRepos];
  } catch (err) {
    console.error("Failed to fetch repos:", err);
  }

  return (
    <HomeContent githubStats={githubStats} projects={mergedProjects} />
  );
}