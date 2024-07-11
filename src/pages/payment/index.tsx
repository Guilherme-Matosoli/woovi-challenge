import { Button } from "../../components/Button";
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
    </main>
  )
}
