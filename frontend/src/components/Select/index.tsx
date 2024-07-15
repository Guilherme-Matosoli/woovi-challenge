import { SelectHTMLAttributes } from "react";
import { Container } from "./styles";

interface Option {
  value: string,
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string,
  options: Option[]
};

export function Select({ label, options }: SelectProps) {
  return (
    <Container>
      <label htmlFor="select">
        {label}
      </label>

      <select name="select">
        {
          options.map(option => {
            return <option value={option.value}>{option.label}</option>
          })
        }
      </select>

      <img
        src="/arrow.svg"
        alt="Seta"
      />
    </Container>
  )
}
