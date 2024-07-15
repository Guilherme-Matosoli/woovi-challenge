import { SelectHTMLAttributes } from "react";
import styles from "./styles.module.css";

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
    <div className={styles.container}>
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
    </div>
  )
}
