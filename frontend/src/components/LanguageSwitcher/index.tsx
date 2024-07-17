import { useTranslation } from "react-i18next";
import { Container } from "./styles";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    localStorage.setItem("lng", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <Container>
      <h3>{t("home.translation")}</h3>

      <div>
        <button onClick={() => changeLanguage("pt")}>
          <img
            src="br-flag.svg"
            alt="Português"
          />
        </button>

        <button onClick={() => changeLanguage("en")}>
          <img
            src="usa-flag.svg"
            alt="Inglês"
          />
        </button>
      </div>
    </Container>
  )
};
