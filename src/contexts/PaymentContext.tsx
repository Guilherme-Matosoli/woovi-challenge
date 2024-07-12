import { createContext, Dispatch, SetStateAction, useMemo, useState } from "react";
import { currencyFormatter } from "../utils/currencyFormater";

interface PaymentContextProviderProps {
  children: React.ReactNode
}

interface Installment {
  quantity: number,
  value: number
}

interface PaymentContextProps {
  installment: Installment | undefined,
  setInstallment: Dispatch<SetStateAction<Installment | undefined>>,

  total: string
};

export const PaymentContext = createContext({} as PaymentContextProps);

export const PaymentContextProvider = ({ children }: PaymentContextProviderProps) => {
  const [installment, setInstallment] = useState<Installment>();

  const total = useMemo(() => {
    const valueDivided = installment?.value! / 100;

    const formatedTotal = currencyFormatter.format(valueDivided * installment?.quantity!);
    return formatedTotal;
  }, [installment]);

  return (
    <PaymentContext.Provider value={{ installment, setInstallment, total }}>
      {children}
    </PaymentContext.Provider>
  );
};
