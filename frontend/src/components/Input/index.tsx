import styles from "./styles.module.css";
import { BaseTextFieldProps, TextField } from "@mui/material"

interface InputProps extends BaseTextFieldProps {
  label: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  errorMessage: string | undefined
}

export function Input({ label, onChange, errorMessage, ...rest }: InputProps) {
  return (
    <div className={styles.container}>
      <TextField
        className={styles.input}
        label={label}
        onChange={onChange}
        error={errorMessage ? true : false}
        {...rest}

        InputLabelProps={{
          sx: {
            '&.MuiInputLabel-root.MuiInputLabel-shrink': {
              transform: 'translate(20px, -9px)',
              fontSize: '14px',
              background: 'white',
              padding: '0 2px',
            }
          }
        }}
      />

      {
        errorMessage && <span className={styles.error}>{errorMessage}</span>
      }
    </div>
  )
}
