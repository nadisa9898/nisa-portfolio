/**
 * Asset path helpers. Assets live in `public/images` today; set
 * NEXT_PUBLIC_ASSET_BASE_URL (e.g. a CDN/S3 origin) to serve them remotely
 * without touching any component.
 */
const base = (process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "").replace(/\/$/, "");

export const asset = (path: string): string => `${base}/images/${path.replace(/^\//, "")}`;

export const projectImage = (name: string): string => asset(`proj/${name}.webp`);
export const projectThumb = (name: string): string => asset(`proj/thumb/${name}.webp`);
export const caseStudyImage = (name: string): string => asset(`cs/${name}.webp`);
