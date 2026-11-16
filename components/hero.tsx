import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Briefcase,
  ChartScatter,
  FlaskConical,
  FolderGit2,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type PathStep = {
  icon: LucideIcon
  title: string
  detail: string
}

const learningPath: PathStep[] = [
  {
    icon: BookOpen,
    title: "Theory",
    detail: "Core concepts explained clearly, from first principles",
  },
  {
    icon: FlaskConical,
    title: "Practice",
    detail: "Guided exercises after every lesson",
  },
  {
    icon: FolderGit2,
    title: "Real-world projects",
    detail: "Portfolio work built on real datasets",
  },
  {
    icon: Users,
    title: "Mentorship",
    detail: "Feedback and code reviews from practitioners",
  },
  {
    icon: Briefcase,
    title: "Career preparation",
    detail: "Resume, portfolio, and interview readiness",
  },
]

type Program = {
  icon: LucideIcon
  name: string
  summary: string
  href: string
}

const programs: Program[] = [
  {
    icon: ChartScatter,
    name: "Data Science",
    summary: "Analyze, model, and communicate with data.",
    href: "/programs/data-science",
  },
  {
    icon: BrainCircuit,
    name: "Machine Learning",
    summary: "Train, evaluate, and deploy predictive models.",
    href: "/programs/machine-learning",
  },
  {
    icon: Sparkles,
    name: "Artificial Intelligence",
    summary: "Build applied AI systems and LLM-powered tools.",
    href: "/programs/artificial-intelligence",
  },
]

const audiences = [
  "Beginners",
  "Students",
  "Graduates",
  "Professionals",
  "Career switchers",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-8 lg:pt-28 lg:pb-16">
        {/* Copy */}
        <div className="lg:col-span-7">
          <p className="flex items-center gap-2 text-sm font-medium text-brand">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            Data Science · Machine Learning · AI
          </p>

          <h1 className="mt-5 font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Learn data and AI by{" "}
            <span className="text-brand">building real things.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Structured, career-focused programs that combine theory, hands-on
            practice, and real-world projects, with mentors guiding you all
            the way to your next role.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6 text-base">
              <Link href="/programs">
                Explore Programs
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 px-6 text-base"
            >
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>

          <div className="mt-10">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Designed for
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {audiences.map((audience) => (
                <li key={audience}>
                  <Badge
                    variant="outline"
                    className="h-7 px-3 text-sm font-normal text-foreground/80"
                  >
                    {audience}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Learning path visual */}
        <div className="relative lg:col-span-5">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl bg-brand-muted sm:-inset-6"
          />
          <Card className="relative shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-xl">
                How every program works
              </CardTitle>
              <CardDescription>
                One structured path, from fundamentals to job-ready.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="relative">
                {learningPath.map((step, index) => {
                  const Icon = step.icon
                  const isLast = index === learningPath.length - 1
                  return (
                    <li key={step.title} className="relative flex gap-4 pb-5 last:pb-0">
                      {!isLast && (
                        <span
                          aria-hidden
                          className="absolute top-9 bottom-0 left-[1.0625rem] w-px bg-border"
                        />
                      )}
                      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border bg-background text-brand">
                        <Icon className="size-4" />
                      </span>
                      <div className="pt-1">
                        <p className="text-sm font-medium">
                          <span className="mr-1.5 text-muted-foreground tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Program tracks */}
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid overflow-hidden rounded-xl border sm:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon
            return (
              <Link
                key={program.name}
                href={program.href}
                className="group flex items-start gap-4 border-b p-5 transition-colors outline-none last:border-b-0 hover:bg-muted/60 focus-visible:bg-muted/60 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-brand" />
                <div className="flex-1">
                  <p className="flex items-center justify-between gap-2 font-medium">
                    {program.name}
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {program.summary}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
