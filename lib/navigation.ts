export type NavLink = {
  title: string
  href: string
  description?: string
}

/** A titled column of links inside a dropdown (e.g. by experience level). */
export type NavGroup = {
  label: string
  description: string
  links: NavLink[]
}

export type NavItem = {
  title: string
  href: string
  /** Flat list of dropdown links. */
  children?: NavLink[]
  /** Grouped dropdown columns. When present, used instead of children. */
  groups?: NavGroup[]
}

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

const levelHref = (slug: string, level: "beginner" | "advanced") =>
  `/programs/${slug}?level=${level}`

/** Programs split by experience level. Copy is a placeholder until syllabi are final. */
export const programGroups: NavGroup[] = [
  {
    label: "For beginners",
    description: "Start from the fundamentals. No prior experience needed.",
    links: [
      {
        title: "Data Science",
        href: levelHref("data-science", "beginner"),
        description: "Python, statistics, and working with data from scratch.",
      },
      {
        title: "Machine Learning",
        href: levelHref("machine-learning", "beginner"),
        description: "Core ideas and first models, built up step by step.",
      },
      {
        title: "Artificial Intelligence",
        href: levelHref("artificial-intelligence", "beginner"),
        description: "An introduction to applied AI and language models.",
      },
    ],
  },
  {
    label: "For advanced & professionals",
    description: "Go deeper, with the tools and standards used on the job.",
    links: [
      {
        title: "Data Science",
        href: levelHref("data-science", "advanced"),
        description: "Advanced analytics, experimentation, and communication.",
      },
      {
        title: "Machine Learning",
        href: levelHref("machine-learning", "advanced"),
        description: "Modeling, evaluation, and deployment in depth.",
      },
      {
        title: "Artificial Intelligence",
        href: levelHref("artificial-intelligence", "advanced"),
        description: "Retrieval, agents, and evaluating LLM systems.",
      },
    ],
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
  {
    title: "Programs",
    href: "/programs",
    children: programLinks,
    groups: programGroups,
  },
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
