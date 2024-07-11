"use client"
import { InputHTMLAttributes, useEffect, useMemo } from "react";
import { BenefitFlag } from "../BenefitFlag";
import { RadioInput } from "../RadioInput";
import styles from "./styles.module.css";

interface InstallmentCardProps extends InputHTMLAttributes<HTMLInputElement> {
  installmentQuantity: number,
  installmentValue: number,

  mainTitle?: string,
  benefitText?: string,

  index?: number,
  totalItems?: number,
};

export function InstallmentCard({ mainTitle, benefitText, installmentQuantity, installmentValue, index, totalItems, ...rest }: InstallmentCardProps) {
  const formater = new Intl.NumberFormat('pt-BR', {
    style: "currency",
    currency: "BRL"
  });

  const formatedQuantity = useMemo(() => {
    const divided = installmentValue / 100;

    const formatedInstallment = formater.format(divided)

    return formatedInstallment
  }, [installmentValue]);

  const formatedTotal = useMemo(() => {
    const divided = installmentValue / 100;
    const formatedTotal = formater.format(divided * installmentQuantity)

    return formatedTotal
  }, [installmentQuantity]);

  const handleContainer = () => {
    if (!index) return styles.container;
    if (index == 1) return styles.containerFirst;
    if (index == totalItems) return styles.containerLast;
    return styles.containerList
  };

  return (
    <div className={handleContainer()}>
      <label>      <span className={mainTitle ? styles.mainCardInfo : styles.hidden}>
        {mainTitle}
      </span>

        <div className={styles.topSide}>
          <div className={styles.installmentInfo}>
            <span>{installmentQuantity}x </span> {formatedQuantity}
          </div>

          <RadioInput {...rest} />
        </div>
        {
          installmentQuantity == 1 ? (
            <span className={styles.bonusInfo}>
              Ganhe <strong>3%</strong> de Cashback
            </span>
          ) :
            (
              <span className={styles.total}>Total: {formatedTotal}</span>
            )
        }

        {
          benefitText && <BenefitFlag text={benefitText} />
        }
      </label>
    </div>
  )
}
