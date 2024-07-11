import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Installments from "./pages/installments/page"
import RootLayout from "./layout"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />} >
          <Route index element={<Installments />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
