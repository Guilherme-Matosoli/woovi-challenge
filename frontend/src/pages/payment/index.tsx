import { useContext, useEffect } from "react";
import { AccordionUsage } from "../../components/Accordion";
import { Deadline } from "../../components/Deadline";
import { PaymentProgress } from "../../components/PaymentProgress";
import styles from "./styles.module.css";
import { PaymentContext } from "../../contexts/PaymentContext";
import { Pix } from "./pix";
import { CreditCard } from "./creditCard";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../services/websocket";
import { gql, useQuery } from "@apollo/client";
import { LoadingIcon } from "../../components/LoadingIcon";

const GET_PAYMENT = gql`
  query($id: String!){
    payment(id: $id){
      client{
        cpf
        name
      }
      installment{
        quantity
        value
      }
      pixInfo{
        code
        identifier
        expiresIn
      }
      steps
      concluded
    }
  }
`;

export default function Payment() {
  const {
    installmentValue,
    installment,
    total,
    pixInfo,
    paymentSteps,
    clientInfo,
    setPixInfo,
    setClientInfo,
    setInstallment,
    setPaymentSteps
  } = useContext(PaymentContext);

  const { paymentId } = useParams();

  const { loading } = useQuery(GET_PAYMENT, {
    variables: {
      id: paymentId
    },
    onCompleted: data => {
      console.log(data)
      setPixInfo(data.payment.pixInfo);
      setClientInfo(data.payment.client);
      setInstallment(data.payment.installment);
      setPaymentSteps(data.payment.steps)
    }
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!installment) navigate('/payment/installments');

    socket.emit("join", paymentId);
  }, []);

  const clientFirstName = clientInfo?.name.split(" ")[0];

  return !loading && (
    <main className={styles.container}>
      {loading && <LoadingIcon />}
      <h2 className={styles.mainText}>
        {
          paymentSteps == 1 && installment?.quantity == 1 && `${clientFirstName}, pague o valor de ${installmentValue} no pix`
        }

        {
          paymentSteps == 1 && installment?.quantity! > 1 && `${clientFirstName}, pague a entrada de ${installmentValue} no pix`
        }

        {
          paymentSteps > 1 && paymentSteps != installment?.quantity && `${clientFirstName}, pague a ${paymentSteps}ª parcela em 1x no cartão`
        }

        {
          paymentSteps == installment?.quantity && installment.quantity != 1 && `${clientFirstName}, pague o restante em 1x no cartão`
        }
      </h2>

      {
        paymentSteps == 1 ? <Pix /> : <CreditCard />
      }

      <Deadline
        time={pixInfo?.expiresIn}
      />
      <PaymentProgress />

      <section className={styles.fee}>
        <span className={styles.info}>
          CET: 0,5%
        </span>

        <span className={styles.value}>
          Total: {total}
        </span>
      </section>

      <AccordionUsage />

      <section className={styles.paymentId}>
        <span>Identificador:</span>
        <strong>{pixInfo?.identifier}</strong>
      </section>
    </main>
  )
}