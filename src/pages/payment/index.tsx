import { useContext } from "react";
import { AccordionUsage } from "../../components/Accordion";
import { Button } from "../../components/Button";
import { Deadline } from "../../components/Deadline";
import { PaymentProgress } from "../../components/PaymentProgress";
import { QrCode } from "../../components/QrCode";
import styles from "./styles.module.css";
import { PaymentContext } from "../../contexts/PaymentContext";

export default function Payment() {
  const { installmentValue, total, pixInfo } = useContext(PaymentContext);
  return (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        João, pague a entrada de {installmentValue} pelo Pix
      </h2>

      <QrCode value={pixInfo.code} />

      <div className={styles.buttonWrapper}>
        <Button>
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
