import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string,
  children?: React.ReactNode
}

export function Button({ text, children, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {text}
      {children}
    </button>
  )
}
