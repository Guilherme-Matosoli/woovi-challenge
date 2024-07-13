import { InstallmentCard } from "../../components/InstallmentCard";
import styles from "./styles.module.css";

import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../../contexts/PaymentContext";

interface Installment {
  quantity: number,
  value: number
}

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

  const [optionSelected, setOptionSelected] = useState<Installment>();
  const { setInstallment, clientInfo } = useContext(PaymentContext);

  const navigate = useNavigate();
  function chooseInstallment() {
    if (!optionSelected) return;

    setInstallment(optionSelected);

    navigate("/payment/pay")
  };

  useEffect(() => {
    if (!clientInfo) navigate('/');
  }, []);

  return (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        {clientInfo?.name.split(" ")[0]}, como você quer pagar?
      </h2>

      <Button
        text="Continuar"
        disabled={!optionSelected ? true : false}
        onClick={chooseInstallment}
      />

      <section className={styles.oneTime}>
        <InstallmentCard
          value={JSON.stringify(options[0].installment)}
          onChange={e => setOptionSelected(JSON.parse(e.target.value))}

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
                onChange={e => setOptionSelected(JSON.parse(e.target.value))}

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
        text="Continuar"
        disabled={!optionSelected ? true : false}
        onClick={chooseInstallment}
      />
    </main>
  )
}
