import { navItems, profile } from "@/lib/data";
import Container from "../ui/Container";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="py-6 sm:py-8">
      <Container className="flex items-center justify-between gap-6">
        <a href="#main-content" className="type-heading whitespace-nowrap text-lg text-ink">
          <span className="sm:hidden">{profile.shortName.split(" ")[0]}</span>
          <span className="hidden sm:inline">{profile.shortName}</span>
        </a>
        <div className="flex items-center gap-3 sm:gap-8">
          <nav aria-label="Sections">
            <ul className="flex items-center gap-3.5 text-[0.9375rem] sm:gap-7">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted underline-offset-[0.3em] transition-colors hover:text-ink hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
