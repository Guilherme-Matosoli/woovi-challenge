import { InstallmentCard } from "../../components/InstallmentCard";

import { FormEvent, useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { PaymentContext } from "../../contexts/PaymentContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LoadingIcon } from "../../components/LoadingIcon";
import { Container } from "./styles";
import { MainText } from "../../globals";
import { useTranslation } from "react-i18next";


const GET_INSTALLMENTS = gql`
  query{
    installment{
      benefit{
        en
        pt
      }
      mainTitle{
        en
        pt
      }
      installment {
        quantity
        value
      }
    }
  }
`;

const CREATE_PAYMENT = gql`
  mutation($name: String!, $cpf: String!, $quantity: Int!, $value: Int!){
    createPayment(input: {name: $name, cpf: $cpf, quantity: $quantity, value: $value}){
      id
      pixInfo{
        code
        identifier
        expiresIn
      }
      concluded
      steps
    }
  }
`;

interface OptionsInstallment {
  installment: {
    quantity: number,
    value: number,
  },
  mainTitle?: {
    pt: string,
    en: string
  },
  benefit?: {
    pt: string,
    en: string
  }
};

export default function Installments() {
  const [options, setOptions] = useState<OptionsInstallment[]>();

  const {
    setPaymentId,
    installment,
    setInstallment,
    clientInfo,
    setPixInfo,
    setPaymentSteps
  } = useContext(PaymentContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!clientInfo) navigate('/');
  }, []);

  useQuery(GET_INSTALLMENTS, {
    onCompleted: data => {
      setOptions(data.installment)
    }
  });

  const [createPayment, { loading }] = useMutation(CREATE_PAYMENT);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await createPayment({
      variables: {
        name: clientInfo?.name,
        cpf: clientInfo?.cpf,
        quantity: installment?.quantity,
        value: installment?.value
      },
      onCompleted: response => {
        setPaymentId(response?.createPayment.id);
        setPixInfo(response?.createPayment.pixInfo);
        setPaymentSteps(response?.createPayment.steps);

        navigate('/payment/pay/' + response?.createPayment.id);
      }
    });
  };

  const { t } = useTranslation();

  return options && (
    <Container>
      <MainText>
        {clientInfo?.name.split(" ")[0]}, {t("installments.howPay")}
      </MainText>

      <form className="form" onSubmit={handleSubmit}>
        <Button
          disabled={!installment ? true : false}
          type="submit"
        >
          {
            loading ? <LoadingIcon /> : t("installments.continueToPayment")
          }
        </Button>

        <section className="oneTime">
          <InstallmentCard
            value={JSON.stringify(options[0].installment)}
            onChange={e => setInstallment(JSON.parse(e.target.value))}

            installmentQuantity={options[0].installment.quantity}
            installmentValue={options[0].installment.value}
            mainTitle={options[0].mainTitle}
            benefitText={options[0].benefit}
          />
        </section>

        <section className="installments">
          {
            options.map((item, index) => {
              if (index == 0) return;
              return (
                <InstallmentCard
                  key={item.installment.quantity}
                  index={index}
                  totalItems={options.length - 1}

                  value={JSON.stringify(item.installment)}
                  onChange={e => setInstallment(JSON.parse(e.target.value))}

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
          disabled={!installment ? true : false}
          type="submit"
        >
          {
            loading ? <LoadingIcon /> : t("installments.continueToPayment")
          }
        </Button>
      </form>
    </Container>
  )
}
