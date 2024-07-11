"use client"
import { InstallmentCard } from "@/components/InstallmentCard";
import styles from "./styles.module.css";

import { useState } from "react";

export default function Installments() {
  const [options, setOptions] = useState([
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
        value: 7725000
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
  ])

  return (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        João, como você quer pagar?
      </h2>

      <section className={styles.oneTime}>
        <InstallmentCard
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

                installmentQuantity={item.installment.quantity}
                installmentValue={item.installment.value}
                mainTitle={item.mainTitle}
                benefitText={item.benefit}
              />
            )
          })
        }
      </section>
    </main>
  )
}
