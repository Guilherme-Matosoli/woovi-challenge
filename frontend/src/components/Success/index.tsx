import { useTranslation } from "react-i18next";
import { ApprovedIcon } from "../ApprovedIcon";
import { Container } from "./styles";


export function Success() {
  const { t } = useTranslation()

  return (
    <Container>
      <ApprovedIcon />

      <h2>
        {t("components.success")}
      </h2>
    </Container>
  )
}
