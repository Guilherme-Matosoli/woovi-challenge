import { createContext } from "react";

interface PaymentContextProviderProps {
  children: React.ReactNode
}

const PaymentContext = createContext({});

export const PaymentContextProvider = ({ children }: PaymentContextProviderProps) => {
  return (
    <PaymentContext.Provider value={{}}>
      {children}
    </PaymentContext.Provider>
  );
};
