import { SelectHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

export function Select({ label }: SelectProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="select">
        {label}
      </label>

      <select name="select">
        <option>1x de R$ 15.300,00</option>
      </select>

      <img
        src="/arrow.svg"
        alt="Seta"
      />
    </div>
  )
}
