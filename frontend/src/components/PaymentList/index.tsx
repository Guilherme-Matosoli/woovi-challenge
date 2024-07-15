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

  if (payments?.length! < 1) return <Warning>Você ainda não fez um pagamento, clique em "Novo" e comece um novo!</Warning>

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
