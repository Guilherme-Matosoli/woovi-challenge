import { AccordionUsage } from "../../components/Accordion";
import { Button } from "../../components/Button";
import { Deadline } from "../../components/Deadline";
import { PaymentProgress } from "../../components/PaymentProgress";
import { QrCode } from "../../components/QrCode";
import styles from "./styles.module.css";

export default function Payment() {
  return (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        João, pague a entrada de R$ 15.300,00 pelo Pix
      </h2>

      <QrCode value="KDJSFGHDSFJGASDFGIADFSUHgGIAUDFGOUYADFGSUYADGSFUYGSERUFYGSURYGFUYERWGFUYEGRFUYWREG" />

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
        time={new Date()}
      />
      <PaymentProgress />

      <section className={styles.fee}>
        <span className={styles.info}>
          CET: 0,5%
        </span>

        <span className={styles.value}>
          Total: R$ 30.600,00
        </span>
      </section>

      <AccordionUsage />

      <section className={styles.paymentId}>
        <span>Identificador:</span>
        <strong>2c1b951f356c4680b13ba1c9fc889c47</strong>
      </section>
    </main>
  )
}
