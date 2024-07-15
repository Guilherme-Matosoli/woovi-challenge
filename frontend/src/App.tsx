import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Installments from "./pages/installments/"
import RootLayout from "./layout";
import Payment from "./pages/payment";
import NewPayment from "./pages/newPayment";
import { Simulation } from "./pages/simulation";
import Home from "./pages/home";
import { GlobalStyles } from "./globals";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<RootLayout />} >
          <Route index element={<Home />} />
          <Route path="/payment/new" element={<NewPayment />} />
          <Route path="/payment/installments" element={<Installments />} />
          <Route path="/payment/pay/:paymentId" element={<Payment />} />
          <Route path="/simulation/:paymentId" element={<Simulation />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
