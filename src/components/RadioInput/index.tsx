import { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {

};

export function RadioInput(props: RadioInputProps) {
  return (
    <input
      className={styles.input}
      type="radio"
      name="installment"
      {...props}
    />
  )
}
