"use client"
import { InputHTMLAttributes, useMemo } from "react";
import { BenefitFlag } from "../BenefitFlag";
import { RadioInput } from "../RadioInput";
import { currencyFormatter } from "../../utils/currencyFormater";
import { Container } from "./styles";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

interface InstallmentCardProps extends InputHTMLAttributes<HTMLInputElement> {
  installmentQuantity: number,
  installmentValue: number,

  mainTitle?: {
    en: string,
    pt: string
  },
  benefitText?: {
    en: string,
    pt: string
  },

  index?: number,
  totalItems?: number,
};

export function InstallmentCard({ mainTitle, benefitText, installmentQuantity, installmentValue, index, totalItems, ...rest }: InstallmentCardProps) {
  const formatedQuantity = useMemo(() => {
    const divided = installmentValue / 100;

    const formatedInstallment = currencyFormatter.format(divided)

    return formatedInstallment
  }, [installmentValue]);

  const formatedTotal = useMemo(() => {
    const divided = installmentValue / 100;
    const formatedTotal = currencyFormatter.format(divided * installmentQuantity)

    return formatedTotal
  }, [installmentQuantity]);

  const handleContainer = () => {
    if (!index) return "solo";
    if (index == 1) return "first";
    if (index == totalItems) return "last";
    return "middle"
  };

  const { t } = useTranslation();
  const currentLanguage = i18n.language as "en" | "pt";

  return (
    <Container className={handleContainer()}>
      <label>
        {
          mainTitle &&
          <span className="mainCardInfo">
            {mainTitle[currentLanguage]}
          </span>
        }

        <div className="topSide">
          <div className="installmentInfo">
            <span>{installmentQuantity}x </span> {formatedQuantity}
          </div>

          <RadioInput {...rest} />
        </div>
        {
          installmentQuantity == 1 ? (
            <span className="bonusInfo">
              {t("components.installmentCard.1")} <strong>3%</strong> {t("components.installmentCard.2")}
            </span>
          ) :
            (
              <span className="total">Total: {formatedTotal}</span>
            )
        }

        {
          benefitText && <BenefitFlag text={benefitText[currentLanguage]} />
        }
      </label>
    </Container>
  )
}
