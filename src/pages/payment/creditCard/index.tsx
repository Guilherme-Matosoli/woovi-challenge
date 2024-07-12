import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";
import styles from "./styles.module.css";

export function CreditCard() {
  return (
    <form className={styles.container}>
      <Input
        required
        label="Nome completo"
      />
      <Input
        required
        label="CPF"
      />
      <Input
        required
        label="Número do cartão"
      />

      <section className={styles.inputWrapper}>
        <Input
          required
          label="Vencimento"
        />

        <Input
          required
          label="CVV"
        />
      </section>

      <Select
        label="Parcelas"
      />

      <Button
        text="Pagar"
        type="submit"
      />
    </form>
  )
}
