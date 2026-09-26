import { experiences, tools } from "@/lib/data";
import Container from "../ui/Container";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <h2 id="experience-title" className="type-heading text-[clamp(2rem,4vw,2.75rem)]">
            Experience
          </h2>
        </div>

        <div className="lg:col-span-8">
          <ol className="divide-y divide-line border-y border-line">
            {experiences.map((exp) => (
              <li key={exp.org} className="grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <p className="nums pt-0.5 text-sm text-muted">{exp.period}</p>
                <div>
                  <h3 className="type-heading text-lg">{exp.role}</h3>
                  <p className="text-[0.9375rem] text-muted">{exp.org}</p>
                  {exp.description && <p className="mt-3 max-w-[62ch] text-[0.9375rem]">{exp.description}</p>}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-[62ch] text-[0.9375rem]">
            <span className="text-muted">Tools I use most: </span>
            {tools}
          </p>
        </div>
      </Container>
    </section>
  );
}
