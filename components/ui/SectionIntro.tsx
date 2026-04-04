import Reveal from "./Reveal";

interface SectionIntroProps {
  label: string;
  title: string;
}

export default function SectionIntro({ label, title }: SectionIntroProps) {
  return (
    <Reveal>
      <div className="mb-16">
        <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] mb-4 block">
          {label}
        </span>
        <h2 className="font-headline text-4xl md:text-5xl font-bold">{title}</h2>
      </div>
    </Reveal>
  );
}
