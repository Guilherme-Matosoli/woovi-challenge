import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Installments from "./pages/installments/"
import RootLayout from "./layout"
import Payment from "./pages/payment"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />} >
          <Route index element={<Installments />} />
          <Route path="/payment/installments" element={<Installments />} />
          <Route path="/payment/pay" element={<Payment />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
