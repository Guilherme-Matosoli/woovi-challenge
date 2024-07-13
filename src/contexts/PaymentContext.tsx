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

  pixInfo: PixInfo,
  setPixInfo: Dispatch<SetStateAction<PixInfo>>,

  paymentSteps: number,
  increaseInstallment: () => void,

  clientInfo: ClientInfo | undefined,
  setClientInfo: Dispatch<SetStateAction<ClientInfo | undefined>>
};


export const PaymentContext = createContext({} as PaymentContextProps);

export const PaymentContextProvider = ({ children }: PaymentContextProviderProps) => {
  const [installment, setInstallment] = useState<Installment>();
  const [pixInfo, setPixInfo] = useState<PixInfo>({
    identifier: "2c1b951f356c4680b13ba1c9fc889c47",
    code: "JHGASJDGKJHGJUH3I2U4632847JKSHDFABI7Y6T342UYGJKDHSFAGVF87T34GHJVHJ",
    expiresIn: new Date()
  });

  const [clientInfo, setClientInfo] = useState<ClientInfo>();

  const [paymentSteps, setPaymentSteps] = useState(1);

  const increaseInstallment = () => {
    setPaymentSteps(current => current + 1);
  };

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
      increaseInstallment,

      clientInfo,
      setClientInfo
    }}>
      {children}
    </PaymentContext.Provider>
  );
};
