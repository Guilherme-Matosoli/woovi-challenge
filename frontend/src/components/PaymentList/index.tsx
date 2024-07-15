import { PaymentCard } from "../PaymentCard";
import styles from "./styles.module.css";

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

  if (payments?.length! < 1) return <h3 className={styles.warning}>Você ainda não fez um pagamento, clique em "Novo" e comece um novo!</h3>

  return (
    <section className={styles.container}>
      {
        payments && payments.map((payment, index) => {
          return (
            <PaymentCard
              index={index}
              totalItems={payments.length - 1}
              payment={payment}
            />
          )
        })
      }
    </section>
  )
}
