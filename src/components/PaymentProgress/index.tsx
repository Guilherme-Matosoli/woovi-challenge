import { PaymentStep } from "../PaymentStep";
import styles from "./styles.module.css";

export function PaymentProgress() {
  return (
    <section className={styles.container}>
      <PaymentStep
        index={0}
        installmentsQuantity={1}
        installmentValue={1530000}
        concluded
      />
      <PaymentStep
        installmentValue={1530000}
        index={1}
        installmentsQuantity={1}
      />
    </section>
  )
}
