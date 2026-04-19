import { useFinance } from "../context/FinanceContext";

export default function Dashboard() {
  const { transactions, budget } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div>💰 Income: ₹{income}</div>
        <div>💸 Expense: ₹{expense}</div>
        <div>📊 Balance: ₹{balance}</div>
        <div>🎯 Budget: ₹{budget}</div>
      </div>
    </div>
  );
}