import { heroTrace, profile } from "@/lib/data";
import Container from "../ui/Container";
import Trace from "../ui/Trace";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-6 pb-20 sm:pt-10 sm:pb-28">
      <Container>
        <h1 id="hero-title" className="type-display max-w-[21ch] text-balance text-[clamp(2.25rem,5.4vw,4.25rem)]">
          {profile.headline}
        </h1>

        <div className="mt-10 sm:mt-12">
          <Trace values={heroTrace.values} reading={heroTrace.reading} caption={heroTrace.caption} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-[58ch] text-lg leading-relaxed lg:col-span-7">{profile.intro}</p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-5 lg:justify-self-end">
            <a
              href="#work"
              className="rounded-[4px] bg-ink px-5 py-3 font-medium text-bg transition-opacity hover:opacity-85"
            >
              See projects
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="link font-medium">
              View résumé
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
