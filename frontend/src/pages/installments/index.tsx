import { InstallmentCard } from "../../components/InstallmentCard";
import styles from "./styles.module.css";

import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../../contexts/PaymentContext";
import { gql, useMutation } from "@apollo/client";
import { LoadingIcon } from "../../components/LoadingIcon";


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

export default function Installments() {
  const [options, _] = useState([
    {
      installment: {
        quantity: 1,
        value: 3050000
      },
      mainTitle: "Pix",
      benefit: "🤑 R$ 300,00 de volta no seu Pix na hora"
    },
    {
      installment: {
        quantity: 2,
        value: 1530000
      },
      mainTitle: "Pix parcelado"
    },
    {
      installment: {
        quantity: 3,
        value: 1019666
      }
    },
    {
      installment: {
        quantity: 4,
        value: 772500
      },
      benefit: "-3% de juros: Melhor opção de parcelamento"
    },
    {
      installment: {
        quantity: 5,
        value: 630000
      }
    },
    {
      installment: {
        quantity: 6,
        value: 528333
      }
    },
    {
      installment: {
        quantity: 7,
        value: 454285
      }
    }
  ]);

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

  return (
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
