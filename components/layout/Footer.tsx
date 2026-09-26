import { profile } from "@/lib/data";
import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
