import { Container } from "./styles";

export function Footer() {
  return (
    <Container>
      <img
        src="/security-badge.svg"
        alt="Ícone de segurança"
      />

      <span className="text">
        Pagamento 100% seguro via:
      </span>

      <img
        src="/footer-logo.svg"
        alt="Woovi"
      />
    </Container>
  )
}
