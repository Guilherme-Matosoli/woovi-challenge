import { createContext, Dispatch, SetStateAction, useMemo, useState } from "react";
import { currencyFormatter } from "../utils/currencyFormater";

interface PaymentContextProviderProps {
  children: React.ReactNode
};

interface Installment {
  quantity: number,
  value: number
};

interface PixInfo {
  identifier: string,
  code: string,
  expiresIn: Date
};

interface ClientInfo {
  name: string,
  cpf: string
};

interface PaymentContextProps {
  installment: Installment | undefined,
  setInstallment: Dispatch<SetStateAction<Installment | undefined>>,

  total: string,
  installmentValue: string,

  pixInfo: PixInfo | undefined,
  setPixInfo: Dispatch<SetStateAction<PixInfo | undefined>>,

  paymentSteps: number,
  setPaymentSteps: Dispatch<SetStateAction<number>>,

  clientInfo: ClientInfo | undefined,
  setClientInfo: Dispatch<SetStateAction<ClientInfo | undefined>>
};


export const PaymentContext = createContext({} as PaymentContextProps);

export const PaymentContextProvider = ({ children }: PaymentContextProviderProps) => {
  const [installment, setInstallment] = useState<Installment>();
  const [pixInfo, setPixInfo] = useState<PixInfo>();

  const [clientInfo, setClientInfo] = useState<ClientInfo>();

  const [paymentSteps, setPaymentSteps] = useState(1);

  const installmentValue = useMemo(() => {
    const valueDivided = installment?.value! / 100;

    const formatedValue = currencyFormatter.format(valueDivided);
    return formatedValue
  }, [installment]);

  const total = useMemo(() => {
    const valueDivided = installment?.value! / 100;

    const formatedTotal = currencyFormatter.format(valueDivided * installment?.quantity!);
    return formatedTotal;
  }, [installment]);

  return (
    <PaymentContext.Provider value={{
      installment,
      setInstallment,

      total,
      installmentValue,

      pixInfo,
      setPixInfo,

      paymentSteps,
      setPaymentSteps,

      clientInfo,
      setClientInfo
    }}>
      {children}
    </PaymentContext.Provider>
  );
};
