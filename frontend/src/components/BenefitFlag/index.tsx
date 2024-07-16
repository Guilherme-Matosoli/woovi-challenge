import { Container } from "./styles";

interface BenefitFlagProps {
  text: string
}

export function BenefitFlag({ text }: BenefitFlagProps) {
  return (
    <Container>
      <abbr title={text}>
      <span className="text">
        {text}
      </span>
      </abbr>
    </Container>
  )
};
