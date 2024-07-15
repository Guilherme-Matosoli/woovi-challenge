import { Container } from "./styles";

interface DeadlineProps {
  time: Date | undefined
}

export function Deadline({ time }: DeadlineProps) {
  if (!time) return;

  const date = new Date(time);

  const month = String(date.getMonth()).length == 1 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = String(date.getDate()).length == 1 ? "0" + date.getDate() : date.getDate();
  const hour = String(date.getHours()).length == 1 ? "0" + date.getHours() : date.getHours();
  const minutes = String(date.getMinutes()).length == 1 ? "0" + date.getMinutes() : date.getMinutes();

  const formatedDate = `${day}/${month}/${date.getFullYear()} - ${hour}:${minutes}`

  return (
    <Container>
      <span>Prazo de pagamento:</span>
      <strong>{formatedDate}</strong>
    </Container>
  )
}
