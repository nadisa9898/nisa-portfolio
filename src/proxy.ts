import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { projects } from "@/data/projects";

const knownSlugs = new Set(projects.map((p) => p.slug));

/**
 * Returns a real 404 for unknown project slugs. With Partial Prefetching the page shell
 * streams before `notFound()` runs, which would otherwise leave a 200 "soft 404".
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/_not-found-slug", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/projects/:slug",
};
