import { useMask } from "@react-input/mask";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { validateCpf } from "../../utils/validateCpf";
import { z, ZodError } from "zod";
import { FormEvent, useContext, useState } from "react";
import { PaymentContext } from "../../contexts/PaymentContext";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";
import { MainText } from "../../globals";
import { useTranslation } from "react-i18next";


interface FormInfos {
  name: string,
  cpf: string
};


export default function NewPayment() {
  const { t } = useTranslation();

  const schema = z.object({
    name: z
      .string()
      .min(5, t("validations.name"))
      .regex(/^[\p{L}\p{M}\s]+$/u, t("validations.name")),

    cpf: z
      .string()
      .min(14, t("validations.cpf"))
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, t("validations.cpf"))
      .refine(validateCpf, t("validations.cpf")),
  });

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
    <Container>
      <MainText className="mainText">
        {t("newPayment.mainText")}
      </MainText>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          label={t("newPayment.name")}
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
          text={t("newPayment.chooseInstallment")}
          type="submit"
        />
      </form>
    </Container>
  )
}
