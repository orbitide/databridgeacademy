/** The mock-ups drawn in `components/project-visuals.tsx`. */
export type ProjectVisualKind =
  | "dashboard"
  | "importance"
  | "vision"
  | "workflow"
  | "code"
  | "chat"
  | "security"
  | "monitoring"
  | "pipeline"
  | "android"

export type ProgramProject = {
  /** Program slug: the last segment of the program's href in `lib/navigation.ts`. */
  slug: string
  /** Name of the sample project. */
  title: string
  description: string
  tools: string[]
  visual: ProjectVisualKind
}

/**
 * Sample projects (one per program; Software Engineering has two), shown on the home page in program order.
 * These are templates that show the kind of outcome each program builds toward.
 * They are not real student work, and the final projects depend on the
 * confirmed syllabi.
 */
export const programProjects: ProgramProject[] = [
  {
    slug: "data-analytics",
    title: "Business performance dashboard",
    description:
      "Clean a year of company data, find what is driving revenue and margin, and present it in an interactive dashboard a manager can use.",
    tools: ["SQL", "Excel", "Power BI"],
    visual: "dashboard",
  },
  {
    slug: "data-science",
    title: "Predictive model with a recommendation",
    description:
      "Build and evaluate a model that predicts customer churn, explain which factors matter most, and turn the result into a clear business recommendation.",
    tools: ["Python", "pandas", "scikit-learn"],
    visual: "importance",
  },
  {
    slug: "ai-machine-learning",
    title: "Image classifier, trained and deployed",
    description:
      "Train a neural network from scratch, diagnose overfitting, and put the model behind a simple app anyone can try.",
    tools: ["Python", "PyTorch", "Streamlit"],
    visual: "vision",
  },
  {
    slug: "ai-automation",
    title: "Automated team workflow",
    description:
      "Take a repetitive business process, such as triaging support email, and automate it with AI steps and a human review before anything is sent.",
    tools: ["n8n", "LLM API", "Python"],
    visual: "workflow",
  },
  {
    slug: "software-engineering-with-ai",
    title: "Full-stack product, shipped",
    description:
      "Design, build, test, and deploy a complete web app with accounts and a database, using AI coding tools while you review every change.",
    tools: ["TypeScript", "React", "PostgreSQL"],
    visual: "code",
  },
  {
    slug: "software-engineering-with-ai",
    title: "Android receipt scanner",
    description:
      "Build a native Android app with Kotlin and Jetpack Compose that scans receipts on-device with machine learning, and take it to a Play Store internal release.",
    tools: ["Kotlin", "Jetpack Compose", "ML Kit"],
    visual: "android",
  },
  {
    slug: "llm-agent-engineering",
    title: "Evaluated document assistant",
    description:
      "Build a retrieval-based assistant that answers from company documents with citations, and measure its quality with a test set instead of by feel.",
    tools: ["Python", "Vector DB", "LLM API"],
    visual: "chat",
  },
  {
    slug: "ai-security",
    title: "Red-team and harden an AI app",
    description:
      "Attack a sample AI application with prompt injection and data-leak tests, fix what you find, and deliver a report that proves the fixes work.",
    tools: ["Python", "promptfoo", "MITRE ATLAS"],
    visual: "security",
  },
  {
    slug: "mlops-production-ai",
    title: "Monitored ML system in production",
    description:
      "Take a model from notebook to a versioned, containerized service with automated releases, and add monitoring that catches drift early.",
    tools: ["MLflow", "Docker", "GitHub Actions"],
    visual: "monitoring",
  },
  {
    slug: "data-engineering",
    title: "Data platform with quality checks",
    description:
      "Build an orchestrated pipeline that ingests raw data, validates it, and loads trusted tables, with tests and run history you can inspect.",
    tools: ["Airflow", "dbt", "SQL"],
    visual: "pipeline",
  },
]
