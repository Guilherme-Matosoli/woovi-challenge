import { Outlet } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { PaymentContextProvider } from "./contexts/PaymentContext"

export default function RootLayout() {
  return (
    <>
      <Header />
      <PaymentContextProvider>
        <Outlet />
      </PaymentContextProvider>
      <Footer />
    </>
  )
}
