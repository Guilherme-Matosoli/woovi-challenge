import { useTranslation } from "react-i18next";
import { Container } from "./styles";

export function Footer() {
  const { t } = useTranslation();

  return (
    <Container>
      <img
        src="/security-badge.svg"
        alt="Ícone de segurança"
      />

      <span className="text">
        {t("components.footer")}
      </span>

      <img
        src="/footer-logo.svg"
        alt="Woovi"
      />
    </Container>
  )
}
