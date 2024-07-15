import { Container } from "./styles";
import { BaseTextFieldProps, TextField } from "@mui/material"

interface InputProps extends BaseTextFieldProps {
  label: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  errorMessage: string | undefined
}

export function Input({ label, onChange, errorMessage, ...rest }: InputProps) {
  return (
    <Container>
      <TextField
        className="input"
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
        errorMessage && <span className="error">{errorMessage}</span>
      }
    </Container>
  )
}
