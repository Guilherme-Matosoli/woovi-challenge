import { useMemo } from "react";
import { StepStatus } from "../StepStatus";
import styles from "./styles.module.css";
import { currencyFormatter } from "../../utils/currencyFormater";

interface PaymentStepProps {
  index: number,
  installmentsQuantity?: number,
  installmentValue: number,

  concluded?: boolean
}

export function PaymentStep({ index, installmentsQuantity, installmentValue, concluded }: PaymentStepProps) {
  const formatedValue = useMemo(() => {
    const divided = installmentValue / 100;

    const formatedValue = currencyFormatter.format(divided);
    return formatedValue;
  }, [installmentValue])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <StepStatus
          haveNext={index != installmentsQuantity}
          checked={concluded}
        />

        <span className={styles.description}>
          {index == 0 && "1ª entrada no pix"}

          {index != 0 && `${index + 1}ª no cartão`}
        </span>
      </div>

      <strong className={styles.strong}>
        {formatedValue}
      </strong>
    </div>
  )
}
