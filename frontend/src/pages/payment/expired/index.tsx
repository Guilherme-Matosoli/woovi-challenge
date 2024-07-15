import { Container } from "./styles";

export function Expired() {
  return (
    <Container>
      <div className="circle">
        <img
          src="/denied-icon.svg"
          alt="Negado"
        />
      </div>

      <h3>
        Prazo de pagamento expirado
      </h3>
    </Container>
  )
}
