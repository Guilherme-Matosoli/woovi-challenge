import { Container } from "./styles"

export function Header() {
  return (
    <Container>
      <a href="https://woovi.com/#home" target="_blank">
        <img
          src="/logo.svg"
          alt="Woovi"
        />
      </a>
    </Container>
  )
}
