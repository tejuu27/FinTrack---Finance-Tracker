import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import AddTransaction from "./pages/AddTransaction"
import Budget from "./pages/Budget"
import Analytics from "./pages/Analytics"

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#1e293b" }}>
        <NavLink to="/dashboard" style={{ color: "white" }}>Dashboard</NavLink>
        <NavLink to="/transactions" style={{ color: "white" }}>Transactions</NavLink>
        <NavLink to="/transactions/new" style={{ color: "white" }}>+ Add</NavLink>
        <NavLink to="/budget" style={{ color: "white" }}>Budget</NavLink>
        <NavLink to="/analytics" style={{ color: "white" }}>Analytics</NavLink>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/new" element={<AddTransaction />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App