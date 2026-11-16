export type NavLink = {
  title: string
  href: string
  description?: string
  /** Small tag shown next to the title, e.g. "Coming soon". */
  badge?: string
  /** Program length, e.g. "16 weeks". Shown on the home page program cards. */
  duration?: string
  /** Program price, e.g. "$1,200". Shown on the home page program cards. */
  price?: string
}

/** A titled column of links inside a dropdown (e.g. by experience level). */
export type NavGroup = {
  label: string
  links: NavLink[]
  /** Optional call-to-action shown at the bottom of the column. */
  footer?: NavLink
}

export type NavItem = {
  title: string
  href: string
  /** Flat list of dropdown links. */
  children?: NavLink[]
  /** Grouped dropdown columns. When present, used instead of children. */
  groups?: NavGroup[]
  /** Label for the "see everything" link at the bottom of the dropdown. */
  overviewLabel?: string
}

const programHref = (slug: string) => `/programs/${slug}`

/**
 * Programs grouped by who they are for. Each entry is a distinct program
 * with its own focus and outcome. Names and descriptions are placeholders
 * until the final syllabi are confirmed.
 */
export const programGroups: NavGroup[] = [
  {
    label: "For beginners",
    links: [
      {
        title: "Data Analytics",
        href: programHref("data-analytics"),
        duration: "12 weeks",
        price: "$900",
        description:
          "Answer business questions with SQL, spreadsheets, and dashboards. No coding background needed.",
      },
      {
        title: "Data Science",
        href: programHref("data-science"),
        duration: "20 weeks",
        price: "$1,400",
        description:
          "Python, statistics, and predictive modeling, from first principles to a full project.",
      },
      {
        title: "AI & Machine Learning",
        href: programHref("ai-machine-learning"),
        duration: "20 weeks",
        price: "$1,400",
        description:
          "Learn how machine learning and modern AI work, and build your first intelligent applications.",
      },
      {
        title: "AI Automation",
        href: programHref("ai-automation"),
        duration: "10 weeks",
        price: "$800",
        description:
          "Automate real business workflows with AI tools, APIs, and low-code platforms.",
      },
      {
        title: "Software Engineering with AI",
        href: programHref("software-engineering-with-ai"),
        duration: "24 weeks",
        price: "$1,600",
        description:
          "Learn to program and ship software, working alongside AI coding tools.",
      },
    ],
    footer: { title: "Not sure? Take the quiz", href: "/programs/quiz" },
  },
  {
    label: "For tech professionals",
    links: [
      {
        title: "LLM & Agent Engineering",
        href: programHref("llm-agent-engineering"),
        duration: "10 weeks",
        price: "$1,800",
        description:
          "Build language-model applications with retrieval, tool use, and rigorous evaluation.",
      },
      {
        title: "AI Security",
        href: programHref("ai-security"),
        duration: "8 weeks",
        price: "$1,600",
        description:
          "Find and defend against threats to machine learning systems and AI-powered products.",
      },
      {
        title: "MLOps & Production AI",
        href: programHref("mlops-production-ai"),
        duration: "8 weeks",
        price: "$1,600",
        description:
          "Deploy, monitor, and maintain machine learning systems at scale.",
        badge: "Coming soon",
      },
      {
        title: "Data Engineering",
        href: programHref("data-engineering"),
        duration: "12 weeks",
        price: "$1,800",
        description:
          "Design the pipelines and platforms that data and AI teams rely on.",
        badge: "Coming soon",
      },
    ],
    footer: {
      title: "Take a 3-minute skills audit",
      href: "/programs/skills-audit",
    },
  },
]

/** Flat list of every program, used for routing and as a mobile fallback. */
export const programLinks: NavLink[] = programGroups.flatMap(
  (group) => group.links
)

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
  {
    title: "FAQ",
    href: "/resources/faq",
    description: "Answers to common questions about programs and admissions.",
  },
]

/** "Why us" dropdown. Existing pages (cohorts, career support, projects, about) live here. */
export const whyUsGroups: NavGroup[] = [
  {
    label: "How we teach",
    links: [
      { title: "Structured curriculum", href: "/why-us/curriculum" },
      { title: "Real-world projects", href: "/projects" },
      { title: "Mentorship", href: "/why-us/mentorship" },
      { title: "Meet the instructors", href: "/why-us/instructors" },
    ],
  },
  {
    label: "Your success",
    links: [
      { title: "Career support", href: "/career-support" },
      { title: "Cohorts & community", href: "/cohorts" },
      { title: "Student stories", href: "/why-us/student-stories" },
      { title: "About Data Bridge Academy", href: "/about" },
    ],
  },
]

export const mainNav: NavItem[] = [
  {
    title: "Programs",
    href: "/programs",
    children: programLinks,
    groups: programGroups,
    overviewLabel: "All programs",
  },
  {
    title: "Why us",
    href: "/why-us",
    children: whyUsGroups.flatMap((group) => group.links),
    groups: whyUsGroups,
    overviewLabel: "Why Data Bridge Academy",
  },
  {
    title: "Resources",
    href: "/resources",
    children: resourceLinks,
    overviewLabel: "All resources",
  },
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
