import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export function Button({ text, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {text}
    </button>
  )
}
