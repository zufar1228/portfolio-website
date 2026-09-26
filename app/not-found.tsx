import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center">
      <Container>
        <p className="type-reading text-5xl text-muted">404</p>
        <h1 className="type-display mt-4 max-w-[16ch] text-[clamp(2rem,5vw,3.5rem)]">
          There&apos;s no page at this address.
        </h1>
        <p className="mt-4 max-w-[48ch] text-muted">
          The link may be old, or the address may have a typo. Everything on this site lives on the home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-[4px] bg-ink px-5 py-3 font-medium text-bg transition-opacity hover:opacity-85"
        >
          Go to the home page
        </Link>
      </Container>
    </main>
  );
}
