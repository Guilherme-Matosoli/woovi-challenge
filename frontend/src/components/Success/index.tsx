import { ApprovedIcon } from "../ApprovedIcon";
import { Container } from "./styles";


export function Success() {
  return (
    <Container>
      <ApprovedIcon />

      <h2>
        Pagamento realizado com sucesso!
      </h2>
    </Container>
  )
}
