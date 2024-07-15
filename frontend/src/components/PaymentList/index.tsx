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
  console.log(payments)
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
