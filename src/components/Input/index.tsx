import styles from "./styles.module.css";
import { BaseTextFieldProps, TextField } from "@mui/material"

interface InputProps extends BaseTextFieldProps {
  label: string
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <TextField
      className={styles.input}
      label={label}
      {...rest}
    />
  )
}
