import { useTranslation } from "react-i18next";
import { Container } from "./styles";

export function Expired() {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="circle">
        <img
          src="/denied-icon.svg"
          alt="Negado"
        />
      </div>

      <h3>
        {t("payment.expired")}
      </h3>
    </Container>
  )
}
