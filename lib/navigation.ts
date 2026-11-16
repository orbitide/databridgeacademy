export type NavLink = {
  title: string
  href: string
  description?: string
}

export type NavItem =
  | { title: string; href: string; children?: undefined }
  | { title: string; href: string; children: NavLink[] }

export const programLinks: NavLink[] = [
  {
    title: "Data Science",
    href: "/programs/data-science",
    description: "Analyze, model, and communicate insights with data.",
  },
  {
    title: "Machine Learning",
    href: "/programs/machine-learning",
    description: "Train, evaluate, and deploy predictive models.",
  },
  {
    title: "Artificial Intelligence",
    href: "/programs/artificial-intelligence",
    description: "Build applied AI systems and LLM-powered tools.",
  },
]

export const resourceLinks: NavLink[] = [
  {
    title: "Blog",
    href: "/resources/blog",
    description: "Industry insights, student stories, and updates.",
  },
  {
    title: "Guides",
    href: "/resources/guides",
    description: "Step-by-step guides for starting a career in tech.",
  },
  {
    title: "Learning Resources",
    href: "/resources/learning-resources",
    description: "Free materials to practice and sharpen your skills.",
  },
]

export const mainNav: NavItem[] = [
  { title: "Programs", href: "/programs", children: programLinks },
  { title: "Cohorts", href: "/cohorts" },
  { title: "Career Support", href: "/career-support" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Resources", href: "/resources", children: resourceLinks },
]

export const authLinks = {
  login: { title: "Login", href: "/login" },
  apply: { title: "Apply Now", href: "/apply" },
} as const

/** True when `pathname` is `href` or nested under it. */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}
