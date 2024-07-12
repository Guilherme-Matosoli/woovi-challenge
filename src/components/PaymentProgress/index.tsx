import { useContext } from "react";
import { PaymentStep } from "../PaymentStep";
import styles from "./styles.module.css";
import { PaymentContext } from "../../contexts/PaymentContext";

export function PaymentProgress() {
  const { paymentSteps, installment } = useContext(PaymentContext);

  return (
    <section className={styles.container}>
      {
        Array.from({ length: installment?.quantity || 0 }, (_, index) => {
          return (
            <PaymentStep
              index={index}
              installmentsQuantity={installment?.quantity || 0}
              installmentValue={installment?.value || 0}
              concluded={(index + 1) <= paymentSteps}
            />
          )
        })
      }
    </section>
  )
}
