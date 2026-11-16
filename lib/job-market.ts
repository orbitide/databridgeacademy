/**
 * Job-market content for the home page.
 *
 * `demandRoles` are real figures from the U.S. Bureau of Labor Statistics
 * Occupational Outlook Handbook (employment 2025, projected 2035, May 2025
 * median pay). They are projections for the U.S. only. Re-check them when BLS
 * publishes new projections.
 *
 * `sampleRoles` are illustrative examples of the kinds of roles open to
 * graduates in different regions. They are NOT live postings: no real
 * employers, salaries, or counts are implied.
 */

export type DemandRole = {
  title: string
  /** Projected employment change 2025–35, in percent. */
  growth: number
  jobs2025: number
  jobs2035: number
  /** May 2025 median annual pay, USD. */
  medianPay: number
  href: string
}

export const demandRoles: DemandRole[] = [
  {
    title: "Data scientists",
    growth: 35,
    jobs2025: 275_600,
    jobs2035: 371_000,
    medianPay: 120_230,
    href: "https://www.bls.gov/ooh/math/data-scientists.htm",
  },
  {
    title: "Computer & information research scientists",
    growth: 22,
    jobs2025: 38_600,
    jobs2035: 47_000,
    medianPay: 140_300,
    href: "https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm",
  },
  {
    title: "Software developers",
    growth: 10,
    jobs2025: 1_717_800,
    jobs2035: 1_892_600,
    medianPay: 135_980,
    href: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
  },
]

/** Skills and tools that entered the AI toolkit, oldest first. Dates supplied by the academy. */
export const skillTimeline: { date: string; skill: string }[] = [
  { date: "Apr 2023", skill: "LLM orchestration" },
  { date: "Oct 2023", skill: "RAG pipelines" },
  { date: "Jul 2024", skill: "Agentic workflows" },
  { date: "Feb 2025", skill: "vLLM" },
  { date: "Apr 2025", skill: "MCP" },
  { date: "Sep 2025", skill: "Claude Code" },
  { date: "Feb 2026", skill: "OpenAI Frontier" },
]

export type SampleRole = {
  title: string
  location: string
  mode: "Remote" | "Hybrid" | "On-site"
  skills: string[]
  /** Slug of the program that prepares for this role (see lib/navigation.ts). */
  program: string
}

export const sampleRoles: SampleRole[] = [
  {
    title: "Data Analyst",
    location: "London, UK",
    mode: "Hybrid",
    skills: ["SQL", "Dashboards", "Statistics"],
    program: "data-analytics",
  },
  {
    title: "Machine Learning Engineer",
    location: "Toronto, Canada",
    mode: "Hybrid",
    skills: ["Python", "PyTorch", "MLOps"],
    program: "ai-machine-learning",
  },
  {
    title: "AI Automation Specialist",
    location: "Remote, Global",
    mode: "Remote",
    skills: ["APIs", "LLM tools", "Workflows"],
    program: "ai-automation",
  },
  {
    title: "Data Engineer",
    location: "Berlin, Germany",
    mode: "On-site",
    skills: ["Pipelines", "Cloud", "SQL"],
    program: "data-engineering",
  },
  {
    title: "LLM Application Developer",
    location: "Singapore",
    mode: "Hybrid",
    skills: ["RAG", "Evaluation", "Python"],
    program: "llm-agent-engineering",
  },
  {
    title: "Data Scientist",
    location: "Sydney, Australia",
    mode: "Hybrid",
    skills: ["Modeling", "Experimentation", "Python"],
    program: "data-science",
  },
  {
    title: "Deep Learning Engineer",
    location: "Zurich, Switzerland",
    mode: "Hybrid",
    skills: ["PyTorch", "Computer vision", "NLP"],
    program: "deep-learning",
  },
]
