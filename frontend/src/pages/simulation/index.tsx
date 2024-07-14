import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "../../components/Button";
import { socket } from "../../services/websocket";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LoadingIcon } from "../../components/LoadingIcon";
import { useEffect, useState } from "react";
import { currencyFormatter } from "../../utils/currencyFormater";

const SIMULATE_PAYMENT = gql`
  mutation($id: String!){
    simulatePayment(id: $id){
      steps
    }
  }
`;

const GET_VALUE = gql`
  query($id: String!){
    payment(id: $id){
      installment{
        value
      }
      concluded
    }
  }
`;

export function Simulation() {
  const [value, setValue] = useState();
  const [success, setSuccess] = useState(false);
  const [concluded, setConcluded] = useState(false);
  const { paymentId } = useParams();

  const query = useQuery(GET_VALUE, {
    variables: { id: paymentId },
    onCompleted: data => {
      setValue(data.payment.installment.value);
      setConcluded(data.payment.concluded)
    }
  });

  const [simualtePayment, { loading }] = useMutation(SIMULATE_PAYMENT);

  async function simulate() {
    simualtePayment({
      variables: { id: paymentId },
      onCompleted: () => {
        socket.emit("payment", { id: paymentId });

        setSuccess(true);
      }
    });

    setInterval(() => { setSuccess(false) }, 2000);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!paymentId) navigate('/');
  }, []);

  return !query.loading && (
    <main className={styles.container}>
      <h1>Simulador de pagamentos</h1>
      <h2>
        {
          concluded && "Este pagamento Pix já foi simulado. Para simular os demais, preencha o formulário de pagamento por cartão."
        }
        {
          !concluded && <>Simular pagamento de {currencyFormatter.format(value! / 100)}</>

        }
      </h2>

      <Button onClick={simulate} disabled={concluded == true}>
        {
          success && "Pagamento simulado!"
        }
        {
          !success && loading && <LoadingIcon />
        }
        {
          !success && !loading && "Clique aqui para simular!"
        }
      </Button>

    </main>
  )
}
