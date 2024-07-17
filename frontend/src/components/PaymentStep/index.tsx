import { useContext, useMemo } from "react";
import { StepStatus } from "../StepStatus";
import { currencyFormatter } from "../../utils/currencyFormater";
import { PaymentContext } from "../../contexts/PaymentContext";
import { Container } from "./styles";
import { useTranslation } from "react-i18next";

interface PaymentStepProps {
  installmentNumber: number,
  installmentsQuantity: number,
  installmentValue: number,

  concluded: boolean
}

export function PaymentStep({ installmentNumber, installmentsQuantity, installmentValue, concluded }: PaymentStepProps) {
  const formatedValue = useMemo(() => {
    const divided = installmentValue / 100;

    const formatedValue = currencyFormatter.format(divided);
    return formatedValue;
  }, [installmentValue]);

  const { paymentSteps } = useContext(PaymentContext);
  const { t } = useTranslation();

  return (
    <Container>
      <div className="info">
        <StepStatus
          haveNext={installmentNumber != installmentsQuantity}
          checked={concluded}
          actual={installmentNumber == paymentSteps}
        />

        <span className="description">
          {installmentNumber == 1 && installmentsQuantity == 1 && t("components.paymentStep.first")}

          {installmentNumber == 1 && installmentsQuantity != 1 && t("components.paymentStep.enter")}

          {installmentNumber != 1 && `${installmentNumber}ª ${t("components.paymentStep.card")}`}
        </span>
      </div>

      <strong className="strong">
        {formatedValue}
      </strong>
    </Container>
  )
}
