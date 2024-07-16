import { useContext, useState } from "react";
import { Button } from "../../../components/Button";
import { copyToClipboard } from "../../../utils/copyToClipboard";
import { PaymentContext } from "../../../contexts/PaymentContext";
import { QrCode } from "../../../components/QrCode";
import { Container } from "./styles";
import { useTranslation } from "react-i18next";


export function Pix() {
  const [copied, setCopied] = useState(false);

  const { pixInfo } = useContext(PaymentContext);

  const { t } = useTranslation();

  return (
    <Container>
      <QrCode value={pixInfo?.code!} />

      <div className="buttonWrapper">
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
              t("payment.pix.copied")
              :
              <>
                {t("payment.pix.copyText")}
                <img
                  src="/copy-icon.svg"
                  alt="Copiar"
                />
              </>
          }
        </Button>
      </div>

    </Container>
  )
}
