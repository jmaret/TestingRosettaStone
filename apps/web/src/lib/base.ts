/** Prefix a site-root path with Astro's base (needed for GitHub project Pages). */
export function withBase(path = "") {
  const base = import.meta.env.BASE_URL || "/";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const clean = path.replace(/^\//, "");
  if (!clean) {
    return normalizedBase === "/" ? "/" : normalizedBase.replace(/\/$/, "") || "/";
  }
  return `${normalizedBase}${clean}`;
}
