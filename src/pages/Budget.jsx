import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function Budget() {
  const { budget, setBudget, transactions } = useFinance();
  const [newBudget, setNewBudget] = useState(budget);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudget(Number(newBudget));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Budget</h2>

      <div style={{ marginTop: "20px" }}>
        <p>Current Budget: ₹{budget}</p>
        <p>Total Expense: ₹{totalExpense}</p>
        <p>Remaining: ₹{budget - totalExpense}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Set new budget"
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Update Budget</button>
      </form>
    </div>
  );
}