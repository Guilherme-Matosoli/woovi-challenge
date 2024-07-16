import { useTranslation } from "react-i18next";
import { PaymentCard } from "../PaymentCard";
import { Container, Warning } from "./styles";

interface Payment {
  id: string,
  installment: {
    quantity: number,
    value: number
  },
  steps: number
};

interface PaymentListProps {
  payments: Payment[] | undefined
};

export function PaymentList({ payments }: PaymentListProps) {
  const { t } = useTranslation();

  if (payments?.length! < 1) return <Warning>{t("components.paymentList")}</Warning>

  return (
    <Container>
      {
        payments && payments.map((payment, index) => {
          return (
            <PaymentCard
              key={payment.id}
              index={index}
              totalItems={payments.length - 1}
              payment={payment}
            />
          )
        })
      }
    </Container>
  )
}
