import { InstallmentCard } from "../../components/InstallmentCard";
import styles from "./styles.module.css";

import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../../contexts/PaymentContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LoadingIcon } from "../../components/LoadingIcon";


const GET_INSTALLMENTS = gql`
  query{
    installment{
      benefits
      mainTitle
      installment {
        quantity
        value
      }
    }
  }
`;

const CREATE_PAYMENT = gql`
  mutation($name: String!, $cpf: String!, $quantity: Int!, $value: Int!){
    createPayment(input: {name: $name, cpf: $cpf, quantity: $quantity, value: $value}){
      id
      pixInfo{
        code
        identifier
        expiresIn
      }
      concluded
      steps
    }
  }
`;

interface OptionsInstallment {
  installment: {
    quantity: number,
    value: number,
  },
  mainTitle?: string,
  benefit?: string
}

export default function Installments() {
  const [options, setOptions] = useState<OptionsInstallment[]>();

  const {
    setPaymentId,
    installment,
    setInstallment,
    clientInfo,
    setPixInfo,
    setPaymentSteps
  } = useContext(PaymentContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!clientInfo) navigate('/');
  }, []);

  const getInstallments = useQuery(GET_INSTALLMENTS, {
    onCompleted: data => {
      setOptions(data.installment)
    }
  });

  if (getInstallments.error) console.log(JSON.stringify(getInstallments.error))


  const [createPayment, { loading, error }] = useMutation(CREATE_PAYMENT);
  if (error) {
    console.log(JSON.stringify(error))
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await createPayment({
      variables: {
        name: clientInfo?.name,
        cpf: clientInfo?.cpf,
        quantity: installment?.quantity,
        value: installment?.value
      },
      onCompleted: response => {
        setPaymentId(response?.createPayment.id);
        setPixInfo(response?.createPayment.pixInfo);
        setPaymentSteps(response?.createPayment.steps);

        navigate('/payment/pay/' + response?.createPayment.id);
      }
    });
  };

  return options && (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        {clientInfo?.name.split(" ")[0]}, como você quer pagar?
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Button
          disabled={!installment ? true : false}
          type="submit"
        >
          {
            loading ? <LoadingIcon /> : "Prosseguir para o pagamento"
          }
        </Button>

        <section className={styles.oneTime}>
          <InstallmentCard
            value={JSON.stringify(options[0].installment)}
            onChange={e => setInstallment(JSON.parse(e.target.value))}

            installmentQuantity={options[0].installment.quantity}
            installmentValue={options[0].installment.value}
            mainTitle={options[0].mainTitle}
            benefitText={options[0].benefit}
          />
        </section>

        <section className={styles.installments}>
          {
            options.map((item, index) => {
              if (index == 0) return;
              return (
                <InstallmentCard
                  key={item.installment.quantity}
                  index={index}
                  totalItems={options.length - 1}

                  value={JSON.stringify(item.installment)}
                  onChange={e => setInstallment(JSON.parse(e.target.value))}

                  installmentQuantity={item.installment.quantity}
                  installmentValue={item.installment.value}
                  mainTitle={item.mainTitle}
                  benefitText={item.benefit}
                />
              )
            })
          }
        </section>
        <Button
          disabled={!installment ? true : false}
          type="submit"
        >
          {
            loading ? <LoadingIcon /> : "Prosseguir para o pagamento"
          }
        </Button>
      </form>
    </main>
  )
}
