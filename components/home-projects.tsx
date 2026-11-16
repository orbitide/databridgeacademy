import { ProjectsSlider, type ProjectSlide } from "@/components/projects-slider"
import { SectionHeading } from "@/components/section-heading"
import { programLinks } from "@/lib/navigation"
import { programProjects } from "@/lib/projects"

/** Join each sample project to its program (matched on the href's last segment). */
const slides: ProjectSlide[] = programProjects.flatMap((project) => {
  const program = programLinks.find(
    (link) => link.href.split("/").pop() === project.slug
  )
  if (!program) return []
  return {
    category: program.title,
    badge: program.badge,
    title: project.title,
    description: project.description,
    tools: project.tools,
    visual: project.visual,
  }
})

export function HomeProjects() {
  return (
    <section className="overflow-hidden border-b bg-background py-16 sm:py-20">
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Create projects that work like the real thing"
          description="Turn your capstone into original research."
        />
      </div>
      <ProjectsSlider slides={slides} label="Sample project for each program" />
    </section>
  )
}
