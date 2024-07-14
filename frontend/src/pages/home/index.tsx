import { useMask } from "@react-input/mask";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import styles from "./styles.module.css";
import { validateCpf } from "../../utils/validateCpf";
import { z, ZodError } from "zod";
import { FormEvent, useContext, useState } from "react";
import { PaymentContext } from "../../contexts/PaymentContext";
import { useNavigate } from "react-router-dom";


interface FormInfos {
  name: string,
  cpf: string
};


const schema = z.object({
  name: z
    .string()
    .min(5, "Nome inválido")
    .regex(/^[\p{L}\p{M}\s]+$/u, "Nome inválido"),

  cpf: z
    .string()
    .min(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .refine(validateCpf, "CPF inválido"),
});

export default function Home() {
  const { setClientInfo } = useContext(PaymentContext);

  const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
  const [formInfos, setFormInfos] = useState<FormInfos>({
    name: '',
    cpf: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormInfos, string>>>({
    name: undefined,
    cpf: undefined
  });

  const setInfos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormInfos(current => ({
      ...current,
      [name]: value || ''
    }));

    setErrors(current => ({
      ...current,
      [name]: undefined
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = schema.parse(formInfos);
      setClientInfo(data);

      navigate('/payment/installments');
    }
    catch (err) {
      if (err instanceof ZodError) {
        err.errors.forEach(error => {
          setErrors(current => ({
            ...current,
            [error.path[0]]: error.message
          }));
        });
      };
    };
  };

  return (
    <main className={styles.container}>
      <h2 className={styles.mainText}>
        Olá, seja bem vindo! Digite seus dados abaixo:
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Nome completo"
          name="name"
          required
          errorMessage={errors.name}

          value={formInfos.name}
          onChange={setInfos}
        />

        <Input
          label="CPF"
          name="cpf"
          required
          errorMessage={errors.cpf}
          inputRef={cpfMask}

          value={formInfos.cpf}
          onChange={setInfos}
        />

        <Button
          text="Escolher parcelas"
          type="submit"
        />
      </form>
    </main>
  )
}
