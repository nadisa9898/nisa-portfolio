import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/projects/CaseStudyView";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";
import { caseStudies, caseStudyThemes } from "@/data/caseStudies";
import { projectDetails } from "@/data/projectDetails";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const description = project.description ?? `${project.title}: ${project.label} designed by Nadia Nisa.`;
  return { title: project.title, description, openGraph: { title: project.title, description } };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = caseStudies[slug];
  const theme = caseStudyThemes[slug];
  if (study && theme) return <CaseStudyView project={project} study={study} theme={theme} />;

  const detail = projectDetails[slug];
  if (detail) return <ProjectDetailView project={project} detail={detail} />;

  notFound();
}
