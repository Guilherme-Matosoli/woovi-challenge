import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string,
  children?: React.ReactNode
}

export function Button({ text, children, ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      {text}
      {children}
    </Container>
  )
}
