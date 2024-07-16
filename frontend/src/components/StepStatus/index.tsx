import { Container } from "./styles";

interface StepStatusProps {
  haveNext: boolean,
  checked: boolean,
  actual: boolean
}

export function StepStatus({ haveNext, checked, actual }: StepStatusProps) {
  return (
    <Container className={`${actual && 'actual'} ${haveNext && 'next'} ${checked && 'checked'}`}>
      {
        checked && <img src="/checked-icon.svg" alt="Etapa concluída" />
      }
    </Container>
  )
}
