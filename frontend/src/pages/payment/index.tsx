import { useContext, useEffect, useState } from "react";
import { AccordionUsage } from "../../components/Accordion";
import { Deadline } from "../../components/Deadline";
import { PaymentProgress } from "../../components/PaymentProgress";
import { PaymentContext } from "../../contexts/PaymentContext";
import { Pix } from "./pix";
import { CreditCard } from "./creditCard";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../services/websocket";
import { gql, useQuery } from "@apollo/client";
import { LoadingIcon } from "../../components/LoadingIcon";
import { isExpired } from "../../utils/isExpired";
import { Expired } from "./expired";
import { Success } from "../../components/Success";
import { ApprovedIcon } from "../../components/ApprovedIcon";
import { Container } from "./styles";
import { MainText } from "../../globals";
import { useTranslation } from "react-i18next";

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
  const [concluded, setConcluded] = useState()


  const { loading } = useQuery(GET_PAYMENT, {
    variables: {
      id: paymentId
    },
    onCompleted: data => {
      setPixInfo(data.payment.pixInfo);
      setClientInfo(data.payment.client);
      setInstallment(data.payment.installment);
      setPaymentSteps(data.payment.steps);
      setConcluded(data.payment.concluded);
    }
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!paymentId) navigate('/');

    socket.emit("join", paymentId);
    socket.on("payment", () => {
      setPaymentSuccess(true);

      setInterval(() => {
        window.location.reload();
      }, 2000);
    });
  }, []);

  const clientFirstName = clientInfo?.name.split(" ")[0];
  const paymentExpired = isExpired(pixInfo?.expiresIn!) && paymentSteps == 1;

  const { t } = useTranslation();

  return !loading && clientInfo && (
    <Container>

      {paymentSuccess && <Success />}

      {loading && <LoadingIcon />}

      <MainText>
        {
          !paymentExpired && concluded && `${clientFirstName}, ${t("payment.mainText.congratulations")}`
        }
        {
          !paymentExpired && !concluded && paymentSteps == 1 && installment?.quantity == 1 && !paymentExpired && `${clientFirstName}, ${t("payment.mainText.firstPayment.1")} ${installmentValue} ${"payment.mainText.firstPayment.2"}`
        }

        {
          !paymentExpired && !concluded && paymentSteps == 1 && installment?.quantity! > 1 && `${clientFirstName}, ${t("payment.mainText.enter.1")} ${installmentValue} ${t("payment.mainText.enter.2")}`
        }

        {
          !paymentExpired && !concluded && paymentSteps > 1 && paymentSteps != installment?.quantity && `${clientFirstName}, ${t("payment.mainText.installment.1")} ${paymentSteps}ª ${t("payment.mainText.installment.1")}`
        }

        {
          !paymentExpired && !concluded && paymentSteps == installment?.quantity && installment.quantity != 1 && `${clientFirstName}, ${t("payment.mainText.rest")}`
        }
      </MainText>

      {
        concluded && <ApprovedIcon />
      }

      {
        !concluded && paymentExpired && <Expired />
      }

      {
        !concluded && paymentSteps == 1 && !paymentExpired && <Pix />
      }

      {
        !concluded && paymentSteps != 1 && !paymentExpired && <CreditCard />
      }


      <Deadline
        time={pixInfo?.expiresIn}
      />
      <PaymentProgress />

      <section className="fee">
        <span className="info">
          CET: 0,5%
        </span>

        <span className="value">
          Total: {total}
        </span>
      </section>

      <AccordionUsage />

      <section className="paymentId">
        <span>{t("payment.identifier")}:</span>
        <strong>{pixInfo?.identifier}</strong>
      </section>
    </Container>
  )
}
