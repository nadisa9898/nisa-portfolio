"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/data/projects";

type Filter = "proj" | "case";

interface ProjectsExplorerProps {
  projects: readonly Project[];
}

/** Filter chips plus the polaroid grid. `projects` is already in display order. */
export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState<Filter>("proj");
  const caseStudies = projects.filter((p) => p.isCaseStudy);
  const visible = filter === "proj" ? projects : caseStudies;

  const chips: { key: Filter; label: string; count: number }[] = [
    { key: "proj", label: "Projects", count: projects.length },
    { key: "case", label: "Case Study", count: caseStudies.length },
  ];

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-3">
        {chips.map((chip) => {
          const active = filter === chip.key;
          return (
            <button
              key={chip.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(chip.key)}
              className={`inline-flex items-center gap-2 rounded-full border-[1.5px] px-[18px] py-[11px] text-[15px] font-semibold transition-colors ${
                active
                  ? "border-yellow bg-yellow text-navy"
                  : "border-sky/50 bg-transparent text-cream hover:border-sky"
              }`}
            >
              {chip.label}
              <span className="font-mono text-[11px] opacity-75">{chip.count}</span>
            </button>
          );
        })}
      </div>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-[clamp(22px,2.6vw,40px)] gap-y-[clamp(44px,5vw,64px)] px-1.5 pt-3.5">
        {visible.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>
    </>
  );
}
