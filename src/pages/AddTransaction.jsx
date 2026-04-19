import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";

export default function AddTransaction() {
  const { addTransaction } = useFinance();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: "",
    notes: "",
    recurring: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) {
      alert("Please fill Title, Amount, and Date");
      return;
    }
    addTransaction({ ...form, amount: Number(form.amount) });
    navigate("/transactions");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="amount" type="number" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange}>
          <option>Food</option>
          <option>Travel</option>
          <option>Rent</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Utilities</option>
          <option>Subscriptions</option>
        </select>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange}></textarea>
        <label>
          <input type="checkbox" name="recurring" checked={form.recurring} onChange={handleChange} />
          Recurring
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}