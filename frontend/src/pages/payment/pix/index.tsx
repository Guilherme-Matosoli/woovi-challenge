import styles from "./styles.module.css";
import { useContext, useState } from "react";
import { Button } from "../../../components/Button";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import { PaymentContext } from "../../../contexts/PaymentContext";
import { QrCode } from "../../../components/QrCode";


export function Pix() {
  const [copied, setCopied] = useState(false);

  const { pixInfo } = useContext(PaymentContext);

  return (
    <div className={styles.container}>
      <QrCode value={pixInfo?.code!} />

      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => {
            copyToClipboard(pixInfo?.code!);
            setCopied(true);

            setTimeout(() => {
              setCopied(false);
            }, 1500);
          }}
        >
          {
            copied
              ?
              "Copiado!"
              :
              <>
                <img
                  src="/copy-icon.svg"
                  alt="Copiar"
                />
                Clique para copiar o QR CODE
              </>
          }
        </Button>
      </div>

    </div>
  )
}
