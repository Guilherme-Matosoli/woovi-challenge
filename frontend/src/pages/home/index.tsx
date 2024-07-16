import { Container } from "./styles";

import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PaymentList } from "../../components/PaymentList";

import { useMask } from "@react-input/mask";
import { ZodError, z } from "zod";
import { validateCpf } from "../../utils/validateCpf";
import { FormEvent, useState } from "react";
import { gql } from "@apollo/client";
import { client } from "../../services/apollo";
import { MainText } from "../../globals";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";


interface Payments {
  id: string,
  installment: {
    quantity: number,
    value: number
  },
  steps: number
};

const GET_PAYMENTS = gql`
  query($cpf: String!){
    getAllPayments(cpf: $cpf){
      id
      concluded
      installment{
        quantity
        value
      }
      steps
    }
  }
`;

const schema = z.object({
  cpf: z
    .string()
    .min(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .refine(validateCpf, "CPF inválido"),
});

export default function Home() {
  const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
  const [cpf, setCpf] = useState<string>('');
  const [cpfError, setCpfError] = useState<string>();

  const [payments, setPayments] = useState<Payments[]>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      schema.parse({ cpf });

      const query = await client.query({ query: GET_PAYMENTS, variables: { cpf } });
      setPayments(query.data.getAllPayments);
    }
    catch (err) {
      if (err instanceof ZodError) {
        setCpfError(err.errors[0].message)
      };
    };
  };

  const { t } = useTranslation();

  return (
    <Container>
      <LanguageSwitcher />

      <MainText>
        {t("home.mainText")}
      </MainText>

      <form onSubmit={handleSubmit}>
        <div className="inputWrapper">
          <Input
            label="CPF"
            name="cpf"
            errorMessage={cpfError}
            inputRef={cpfMask}

            value={cpf}
            onChange={e => {
              setCpf(e.target.value);
              setCpfError(undefined);
            }}
          />

          <Link to="/payment/new" className="buttonNew">
            {t("home.new")}
          </Link>
        </div>

        {
          payments && <PaymentList payments={payments} />
        }

        <Button text={t("home.listPayments")} type="submit" />
      </form>
    </Container>
  );
};
