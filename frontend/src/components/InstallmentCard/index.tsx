"use client"
import { InputHTMLAttributes, useMemo } from "react";
import { BenefitFlag } from "../BenefitFlag";
import { RadioInput } from "../RadioInput";
import { currencyFormatter } from "../../utils/currencyFormater";
import { Container } from "./styles";

interface InstallmentCardProps extends InputHTMLAttributes<HTMLInputElement> {
  installmentQuantity: number,
  installmentValue: number,

  mainTitle?: string,
  benefitText?: string,

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

  return (
    <Container className={handleContainer()}>
      <label>      <span className={mainTitle ? "mainCardInfo" : "hidden"}>
        {mainTitle}
      </span>

        <div className="topSide">
          <div className="installmentInfo">
            <span>{installmentQuantity}x </span> {formatedQuantity}
          </div>

          <RadioInput {...rest} />
        </div>
        {
          installmentQuantity == 1 ? (
            <span className="bonusInfo">
              Ganhe <strong>3%</strong> de Cashback
            </span>
          ) :
            (
              <span className="total">Total: {formatedTotal}</span>
            )
        }

        {
          benefitText && <BenefitFlag text={benefitText} />
        }
      </label>
    </Container>
  )
}
