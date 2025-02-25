import { useContext } from "react";
import { PaymentStep } from "../PaymentStep";
import { PaymentContext } from "../../contexts/PaymentContext";
import { Container } from "./styles";

export function PaymentProgress() {
  const { paymentSteps, installment } = useContext(PaymentContext);

  return (
    <Container>
      {
        Array.from({ length: installment?.quantity || 0 }, (_, index) => {
          const installmentNumber = index + 1;

          return (
            <PaymentStep
              key={installmentNumber}

              installmentNumber={installmentNumber}
              installmentsQuantity={installment?.quantity || 0}
              installmentValue={installment?.value || 0}
              concluded={installmentNumber < paymentSteps}
            />
          )
        })
      }
    </Container>
  )
}
