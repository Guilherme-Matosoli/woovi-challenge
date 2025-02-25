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
import { LoadingIcon } from "../../components/LoadingIcon";


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


export default function Home() {
  const { t } = useTranslation();

  const schema = z.object({
    cpf: z
      .string()
      .min(14, t("validations.cpf"))
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, t("validations.cpf"))
      .refine(validateCpf, t("validations.cpf")),
  });


  const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });
  const [cpf, setCpf] = useState<string>('');
  const [cpfError, setCpfError] = useState<string>();

  const [payments, setPayments] = useState<Payments[]>();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      schema.parse({ cpf });

      const query = await client.query({ query: GET_PAYMENTS, variables: { cpf } });
      setPayments(query.data.getAllPayments);
    }
    catch (err) {
      if (err instanceof ZodError) {
        setCpfError(err.errors[0].message)
      };
    }
    finally { setLoading(false) };
  };

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

        <Button type="submit">
          {
            loading ? <LoadingIcon /> : t("home.listPayments")
          }
        </Button>
      </form>
    </Container>
  );
};
