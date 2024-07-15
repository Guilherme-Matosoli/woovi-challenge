import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { currencyFormatter } from "../../utils/currencyFormater";

interface Payment {
  id: string,
  installment: {
    quantity: number,
    value: number
  },
  steps: number
};

interface PaymentCardProps {
  index: number,
  totalItems: number,
  payment: Payment
};

export function PaymentCard({ index, totalItems, payment }: PaymentCardProps) {

  const handleContainer = () => {
    if (index == 0) return styles.first;
    if (index == totalItems) return styles.last;
    return styles.middle
  };

  const total = () => {
    const totalDivided = (payment.installment.value * payment.installment.quantity) / 100;
    return currencyFormatter.format(totalDivided);
  };

  const installments = () => {
    const divided = payment.installment.value / 100;

    const installmentValue = currencyFormatter.format(divided);
    return `${payment.installment.quantity}x ${installmentValue}`
  };

  return (
    <article className={`${styles.container} ${handleContainer()}`}>
      <div className={styles.paymentInfo}>
        <span className={styles.total}>
          Total: <strong> {total()}</strong>
        </span>

        <span className={styles.installment}>
          Parcelas: <strong> {installments()}</strong>
        </span>
      </div>

      <Link to={`/payment/pay/${payment.id}`} className={styles.link}>
        <img
          src="/arrow-right.svg"
          alt="Seta para direita"
        />
      </Link>
    </article>
  );
};
