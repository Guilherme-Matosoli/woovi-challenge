import styles from "./styles.module.css";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";

import { useMask } from "@react-input/mask";
import { useState } from "react";

interface FormInfos {
  name: string,
  cpf: string,
  cardNumber: string,
  cardValidate: string,
  cardCvv: string,
  installments: string
};


export function CreditCard() {
  const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
  const ccNumberMask = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
  const ccValidateMask = useMask({ mask: '__/__', replacement: { _: /\d/ } });
  const ccCvvMask = useMask({ mask: '___', replacement: { _: /\d/ } });

  const [formInfos, setFormInfos] = useState<FormInfos>({
    name: '',
    cpf: '',
    cardNumber: '',
    cardValidate: '',
    cardCvv: '',
    installments: '1'
  });

  const setInfos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormInfos((current: FormInfos) => ({
      ...current,
      [name]: value || ''
    }));
  };

  return (
    <form className={styles.container}>
      <Input
        required
        label="Nome completo"
        name="name"

        value={formInfos.name}
        onChange={setInfos}
      />
      <Input
        required
        label="CPF"
        name="cpf"
        inputRef={cpfMask}

        value={formInfos.cpf}
        onChange={setInfos}
      />
      <Input
        required
        label="Número do cartão"
        name="cardNumber"
        inputRef={ccNumberMask}

        value={formInfos.cardNumber}
        onChange={setInfos}
      />

      <section className={styles.inputWrapper}>
        <Input
          required
          label="Vencimento (MM/YY)"
          name="cardValidate"
          inputRef={ccValidateMask}

          value={formInfos.cardValidate}
          onChange={setInfos}
        />

        <Input
          required
          name="cardCvv"
          label="CVV"
          inputRef={ccCvvMask}

          value={formInfos.cardCvv}
          onChange={setInfos}
        />
      </section>

      <Select
        label="Parcelas"
        value={formInfos.installments}
        onChange={setInfos}
      />

      <Button
        text="Pagar"
        type="submit"
      />
    </form>
  )
}
