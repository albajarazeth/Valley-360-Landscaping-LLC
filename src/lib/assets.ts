/** GitHub Pages project-site base path (empty in local dev). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a public-folder path for GitHub Pages subpath hosting. */
export function publicAsset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
