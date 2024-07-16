import { Link } from "react-router-dom";
import { currencyFormatter } from "../../utils/currencyFormater";
import { Container } from "./styles";
import { useTranslation } from "react-i18next";

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
    if (index == 0 && totalItems == 0) return "normal"
    if (index == 0) return "first";
    if (index == totalItems) return "last";
    return "middle"
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

  const { t } = useTranslation();

  return (
    <Container className={handleContainer()}>
      <div className="paymentInfo">
        <span className="total">
          Total: <strong> {total()}</strong>
        </span>

        <span className="installment">
          {t("components.paymentCard")}: <strong> {installments()}</strong>
        </span>
      </div>

      <Link to={`/payment/pay/${payment.id}`} className="link">
        <img
          src="/arrow-right.svg"
          alt="Seta para direita"
        />
      </Link>
    </Container>
  );
};
