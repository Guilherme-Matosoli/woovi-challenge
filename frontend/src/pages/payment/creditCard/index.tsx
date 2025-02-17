import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";

import { useMask } from "@react-input/mask";
import { FormEvent, useContext, useEffect, useState } from "react";
import { z, ZodError } from "zod";
import { luhnAlgorithm } from "../../../utils/luhnAlgorithm";
import { validateExpiryDate } from "../../../utils/validateExpiryDate";
import { validateCpf } from "../../../utils/validateCpf";
import { gql, useMutation } from "@apollo/client";
import { Success } from "../../../components/Success";
import { useParams } from "react-router-dom";
import { LoadingIcon } from "../../../components/LoadingIcon";
import { PaymentContext } from "../../../contexts/PaymentContext";
import { currencyFormatter } from "../../../utils/currencyFormater";

import { Container } from "./styles";
import { useTranslation } from "react-i18next";


interface FormInfos {
  name: string,
  cpf: string,
  cardNumber: string,
  cardValidate: string,
  cardCvv: string,
  installments: string
};

const SIMULATE_CARD = gql`
mutation ($id: String!){
  simulateCreditCard(id: $id)
  }
`;

export function CreditCard() {
  const { t } = useTranslation();

  const schema = z.object({
    name: z
      .string()
      .min(5, t("validations.name"))
      .regex(/^[\p{L}\p{M}\s]+$/u, t("validations.name")),

    cpf: z
      .string()
      .min(14, t("validaitons.cpf"))
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, t("validations.cpf"))
      .refine(validateCpf, t("validations.cpf")),

    cardNumber: z
      .string()
      .min(19, t("validations.cardNumber"))
      .regex(/^\d{4} \d{4} \d{4} \d{4}$/, t("validations.cardNumber"))
      .refine(luhnAlgorithm, t("validations.cardNumber")),

    cardValidate: z
      .string()
      .min(4, t("validations.date.format"))
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, t("validations.date.format"))
      .refine(validateExpiryDate, t("validations.date.invalid")),

    cardCvv: z
      .string()
      .min(3, "Cvv inválido")
  });

  const { paymentId } = useParams();
  const { clientInfo, installment } = useContext(PaymentContext);

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

  useEffect(() => {
    if (clientInfo) {
      setFormInfos(current => ({
        ...current,
        name: clientInfo?.name,
        cpf: clientInfo?.cpf
      }));
    };
  }, []);

  const [errors, setErrors] = useState<Partial<Record<keyof Omit<FormInfos, "installments">, string>>>({
    name: undefined,
    cpf: undefined,
    cardNumber: undefined,
    cardValidate: undefined,
    cardCvv: undefined
  });

  const validateFields = (name: keyof Pick<FormInfos, "cardNumber" | "cpf">) => {
    try {
      const fieldToValidate: { [K in keyof Omit<FormInfos, "installments">]?: true } = { [name]: true };
      schema.pick(fieldToValidate).parse({ [name]: formInfos[name] });

      setErrors((current) => ({
        ...current,
        [name]: undefined
      }));
    }
    catch (error) {
      if (error instanceof ZodError) {
        const err = error as ZodError;
        setErrors(current => ({
          ...current,
          [name]: err.errors[0].message
        }));
      }
    };
  };

  const setInfos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormInfos((current: FormInfos) => ({
      ...current,
      [name]: value || ''
    }));

    setErrors(current => ({
      ...current,
      [name]: undefined
    }));
  };

  useEffect(() => {
    Object.keys(formInfos).map(key => {
      const rKey = key as keyof FormInfos;
      if (rKey != "cpf" && rKey != "cardNumber") return;

      if (formInfos[rKey].length > 1) validateFields(rKey);
    })
  }, [formInfos]);

  const [success, setSucces] = useState(false);

  const [simulate, { error, loading }] = useMutation(SIMULATE_CARD);
  if (error) console.log(JSON.stringify(error))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      schema.parse(formInfos);
      await simulate({
        variables: {
          id: paymentId
        },
        onCompleted: () => {
          setSucces(true);
        }
      });

      setInterval(() => { window.location.reload() }, 2000);
    }
    catch (err) {
      if (err instanceof ZodError) {
        err.errors.forEach((error) => {
          setErrors(current => ({
            ...current,
            [error.path[0]]: error.message
          }))
        });
      };
    };
  };

  return (
    <Container onSubmit={handleSubmit}>
      {success && <Success />}

      <Input
        required
        label={t("payment.creditCard.name")}
        name="name"

        value={formInfos.name}
        onChange={setInfos}

        errorMessage={errors.name}
      />
      <Input
        required
        label="CPF"
        name="cpf"
        inputRef={cpfMask}

        value={formInfos.cpf}
        onChange={setInfos}

        errorMessage={errors.cpf}
      />
      <Input
        required
        label={t("payment.creditCard.cardNumber")}
        name="cardNumber"
        inputRef={ccNumberMask}

        value={formInfos.cardNumber}
        onChange={setInfos}

        errorMessage={errors.cardNumber}
      />

      <section className="inputWrapper">
        <Input
          required
          label={t("payment.creditCard.cardValidate")}
          name="cardValidate"
          inputRef={ccValidateMask}

          value={formInfos.cardValidate}
          onChange={setInfos}


          errorMessage={errors.cardValidate}
        />

        <Input
          required
          name="cardCvv"
          label="CVV"
          inputRef={ccCvvMask}

          value={formInfos.cardCvv}
          onChange={setInfos}

          errorMessage={errors.cardCvv}
        />
      </section>

      <Select
        label={t("payment.creditCard.installment")}
        value={formInfos.installments}
        onChange={setInfos}
        options={[
          {
            value: "1",
            label: "1x " + currencyFormatter.format(installment?.value! / 100)
          }
        ]}
      />

      <Button
        type="submit"
      >
        {loading ? <LoadingIcon /> : t("payment.creditCard.pay")}
      </Button>
    </Container>
  )
}
