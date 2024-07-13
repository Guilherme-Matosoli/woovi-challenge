import styles from "./styles.module.css";

import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";

import { useMask } from "@react-input/mask";
import { FormEvent, useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { luhnAlgorithm } from "../../../utils/luhnAlgorithm";
import { validateExpiryDate } from "../../../utils/validateExpiryDate";
import { validateCpf } from "../../../utils/validateCpf";

interface FormInfos {
  name: string,
  cpf: string,
  cardNumber: string,
  cardValidate: string,
  cardCvv: string,
  installments: string
};

const schema = z.object({
  name: z
    .string()
    .min(5, "Nome inválido")
    .regex(/^[A-Za-z\s]+$/, "Nome inválido"),

  cpf: z
    .string()
    .min(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .refine(validateCpf, "CPF inválido"),

  cardNumber: z
    .string()
    .min(19, "Cartão inválido")
    .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Cartão inválido")
    .refine(luhnAlgorithm, "Cartão inválido"),

  cardValidate: z
    .string()
    .min(4, "Formato de data inválido (MM/AA)")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato de data inválido (MM/AA)")
    .refine(validateExpiryDate, "Data inválida"),

  cardCvv: z
    .string()
    .min(3, "Cvv inválido")
})


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

  const [error, setError] = useState<any>()

  const validateFields = (name: keyof Pick<FormInfos, "cardNumber" | "cpf">) => {
    try {
      const fieldToValidate: { [K in keyof Omit<FormInfos, "installments">]?: true } = { [name]: true };
      schema.pick(fieldToValidate).parse({ [name]: formInfos[name] });

      console.log("válido")
      setError(null)
    }
    catch (err) {
      if (err instanceof ZodError) {
        console.log(err.errors[0])
        setError(err.errors[0])
      }
    }
  };

  const setInfos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormInfos((current: FormInfos) => ({
      ...current,
      [name]: value || ''
    }));
  };

  useEffect(() => {
    Object.keys(formInfos).map(key => {
      const rKey = key as keyof FormInfos;
      if (rKey != "cpf" && rKey != "cardNumber") return;

      if (formInfos[rKey].length > 1) validateFields(rKey);
    })
  }, [formInfos]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
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
          label={"Vencimento (MM/YY)"}
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
