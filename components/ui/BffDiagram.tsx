function Node({
  title,
  detail,
  primary = false,
}: {
  title: string;
  detail: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`rounded-[4px] bg-bg px-4 py-3 ${
        primary ? "border-2 border-ink" : "border border-line"
      }`}
    >
      <p className="type-heading flex items-center gap-2 text-base">
        {primary && <span className="size-2 shrink-0 rounded-full bg-signal ring-1 ring-ink" aria-hidden />}
        {title}
      </p>
      <p className="mt-1 text-sm leading-snug text-muted">{detail}</p>
    </div>
  );
}

function Link({ direction }: { direction: "row" | "down" }) {
  if (direction === "down") {
    return <span className="mx-auto block h-6 w-px bg-ink/60" aria-hidden />;
  }
  return (
    <>
      <span className="mx-auto block h-6 w-px bg-ink/60 md:hidden" aria-hidden />
      <span className="hidden h-px w-full bg-ink/60 md:block" aria-hidden />
    </>
  );
}

export default function BffDiagram() {
  return (
    <figure className="rounded-md border border-line bg-surface p-5 sm:p-8">
      <div className="grid items-center md:grid-cols-[1fr_2rem_1.15fr_2rem_1fr]">
        <Node title="Mobile app" detail="Asset monitoring client" />
        <Link direction="row" />
        <Node title="BFF API" detail="Express, TypeScript, Socket.IO" primary />
        <Link direction="row" />
        <Node title="Company systems" detail="Web APIs of PT Len, PINDAD, DI, DAHANA and PAL" />
        <div className="md:col-start-3">
          <Link direction="down" />
          <Node title="PostgreSQL" detail="Asset sessions, trips and usage" />
        </div>
      </div>
      <figcaption className="mt-6 flex items-center gap-2 text-sm text-muted">
        <span className="size-2 shrink-0 rounded-full bg-signal ring-1 ring-ink" aria-hidden />
        The layer I worked on. Live GPS positions stream from it to the app over Socket.IO.
      </figcaption>
    </figure>
  );
}
