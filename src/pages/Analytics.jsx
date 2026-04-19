import { useFinance } from "../context/FinanceContext";

export default function Analytics() {
  const { transactions } = useFinance();

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  // Optional: top spending category
  const categories = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });

  const topCategory = Object.entries(categories).sort((a,b) => b[1]-a[1])[0]?.[0] || "N/A";

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Analytics</h2>
      <p>💰 Total Income: ₹{income}</p>
      <p>💸 Total Expense: ₹{expense}</p>
      <p>📊 Balance: ₹{balance}</p>
      <p>🏆 Top Spending Category: {topCategory}</p>
    </div>
  );
}