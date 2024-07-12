import { useContext } from "react";
import { AccordionUsage } from "../../components/Accordion";
import { Button } from "../../components/Button";
import { Deadline } from "../../components/Deadline";
import { PaymentProgress } from "../../components/PaymentProgress";
import { QrCode } from "../../components/QrCode";
import styles from "./styles.module.css";
import { PaymentContext } from "../../contexts/PaymentContext";
import { copyToClipboard } from "../../utils/copyToClipboard";

export default function Payment() {
  const { installmentValue, installment, total, pixInfo, paymentSteps } = useContext(PaymentContext);
  return (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        {
          paymentSteps == 0 && `João, pague a entrada de ${installmentValue} no pix`
        }

        {
          paymentSteps > 0 && paymentSteps + 1 != installment?.quantity && `João, pague a ${paymentSteps + 1}ª parcela em 1x no cartão`
        }

        {
          paymentSteps + 1 == installment?.quantity && installment.quantity != 1 && `João, pague o restante em 1x no cartão`
        }
      </h2>

      <QrCode value={pixInfo.code} />

      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => copyToClipboard(pixInfo.code)}
        >
          Clique para copiar QR CODE
          <img
            src="/copy-icon.svg"
            alt="Copiar"
          />
        </Button>
      </div>

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
