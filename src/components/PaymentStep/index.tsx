import { useContext, useMemo } from "react";
import { StepStatus } from "../StepStatus";
import styles from "./styles.module.css";
import { currencyFormatter } from "../../utils/currencyFormater";
import { PaymentContext } from "../../contexts/PaymentContext";

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
    <div className={styles.container}>
      <div className={styles.info}>
        <StepStatus
          haveNext={installmentNumber != installmentsQuantity}
          checked={concluded}
          actual={installmentNumber == paymentSteps}
        />

        <span className={styles.description}>
          {installmentNumber == 1 && "1ª entrada no pix"}

          {installmentNumber != 1 && `${installmentNumber}ª no cartão`}
        </span>
      </div>

      <strong className={styles.strong}>
        {formatedValue}
      </strong>
    </div>
  )
}
