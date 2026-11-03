import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/cv", ...projects.map((p) => `/projects/${p.slug}`)];
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : route === "/projects" ? 0.8 : 0.6,
  }));
}
