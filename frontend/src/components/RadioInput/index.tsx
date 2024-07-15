import { InputHTMLAttributes } from "react";
import { Input } from "./styles";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> { };

export function RadioInput(props: RadioInputProps) {
  return (
    <Input
      type="radio"
      name="installment"
      {...props}
    />
  )
}
