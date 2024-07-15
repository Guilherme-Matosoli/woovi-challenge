import { useContext, useMemo } from "react";
import { StepStatus } from "../StepStatus";
import { currencyFormatter } from "../../utils/currencyFormater";
import { PaymentContext } from "../../contexts/PaymentContext";
import { Container } from "./styles";

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

  return (
    <Container>
      <div className="info">
        <StepStatus
          haveNext={installmentNumber != installmentsQuantity}
          checked={concluded}
          actual={installmentNumber == paymentSteps}
        />

        <span className="description">
          {installmentNumber == 1 && installmentsQuantity == 1 && "Pagamento no pix"}

          {installmentNumber == 1 && installmentsQuantity != 1 && "1ª entrada no pix"}

          {installmentNumber != 1 && `${installmentNumber}ª no cartão`}
        </span>
      </div>

      <strong className="strong">
        {formatedValue}
      </strong>
    </Container>
  )
}
