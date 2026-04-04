import { footerContent } from "@/lib/data";
import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-[var(--color-border)]">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="font-body text-xs tracking-wide text-[var(--color-text-secondary)]">
          {footerContent.text}
        </p>
        <div className="flex items-center space-x-8">
          <p className="font-body text-xs tracking-wide text-[var(--color-text-secondary)]">
            {footerContent.year}
          </p>
          <a
            href="#"
            className="font-body text-xs tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
