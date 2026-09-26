import Image from "next/image";
import { earlierWork, projects, type Project } from "@/lib/data";
import Container from "../ui/Container";
import BffDiagram from "../ui/BffDiagram";

function ProjectMedia({ project }: { project: Project }) {
  if (project.diagram === "bff") return <BffDiagram />;
  if (!project.image) return null;
  const { light, dark, width, height, alt } = project.image;
  const sizes = "(min-width: 1152px) 720px, (min-width: 1024px) 62vw, 100vw";

  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      <Image
        src={light}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={dark ? "block h-auto w-full dark:hidden" : "block h-auto w-full"}
      />
      {dark && (
        <Image
          src={dark}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="hidden h-auto w-full dark:block"
        />
      )}
    </div>
  );
}

function ProjectEntry({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-4">
        <h3 id={`${project.id}-title`} className="type-heading text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{project.context}</p>

        <p className="mt-5">{project.summary}</p>

        <dl className="mt-6 space-y-4 text-[0.9375rem]">
          <div>
            <dt className="text-sm text-muted">My part</dt>
            <dd className="mt-1">{project.contribution}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Built with</dt>
            <dd className="mt-1">{project.stack.join(", ")}</dd>
          </div>
        </dl>

        {project.links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-medium">
            {project.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lg:col-span-8">
        <ProjectMedia project={project} />
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <Container>
        <h2 id="work-title" className="type-heading text-[clamp(2rem,4vw,2.75rem)]">
          Work
        </h2>
        <p className="mt-3 max-w-[56ch] text-muted">
          Monitoring systems I&apos;ve built or helped build, from sensor to screen.
        </p>

        <div className="mt-12 space-y-16 sm:space-y-24">
          {projects.map((project) => (
            <ProjectEntry key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-10 sm:mt-24">
          <h3 className="type-heading text-xl">Earlier</h3>
          <ul className="mt-5 space-y-4">
            {earlierWork.map((item) => (
              <li key={item.title} className="max-w-[70ch]">
                <span className="font-semibold">{item.title}.</span> {item.summary}{" "}
                <span className="text-muted">{item.stack}.</span>{" "}
                <a href={item.link.href} target="_blank" rel="noopener noreferrer" className="link font-medium">
                  {item.link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
