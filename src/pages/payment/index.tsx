import { useContext } from "react";
import { AccordionUsage } from "../../components/Accordion";
import { Deadline } from "../../components/Deadline";
import { PaymentProgress } from "../../components/PaymentProgress";
import styles from "./styles.module.css";
import { PaymentContext } from "../../contexts/PaymentContext";
import { Pix } from "./pix";
import { CreditCard } from "./creditCard";

export default function Payment() {
  const { installmentValue, installment, total, pixInfo, paymentSteps } = useContext(PaymentContext);

  return (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        {
          paymentSteps == 1 && installment?.quantity == 1 && `João, pague o valor de ${installmentValue} no pix`
        }

        {
          paymentSteps == 1 && installment?.quantity! > 1 && `João, pague a entrada de ${installmentValue} no pix`
        }

        {
          paymentSteps > 1 && paymentSteps != installment?.quantity && `João, pague a ${paymentSteps}ª parcela em 1x no cartão`
        }

        {
          paymentSteps == installment?.quantity && installment.quantity != 1 && `João, pague o restante em 1x no cartão`
        }
      </h2>

      {
        paymentSteps == 1 ? <Pix /> : <CreditCard />
      }

      <Deadline
        time={pixInfo.expiresIn}
      />
      <PaymentProgress />

      <section className={styles.fee}>
        <span className={styles.info}>
          CET: 0,5%
        </span>

        <span className={styles.value}>
          Total: {total}
        </span>
      </section>

      <AccordionUsage />

      <section className={styles.paymentId}>
        <span>Identificador:</span>
        <strong>{pixInfo.identifier}</strong>
      </section>
    </main>
  )
}
