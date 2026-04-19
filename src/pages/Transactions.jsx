import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function Transactions() {
  const { transactions, deleteTransaction } = useFinance();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  
  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.notes.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" || t.type === filterType;
    const matchesCategory = filterCategory === "all" || t.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  if (transactions.length === 0)
    return <div style={{ padding: "20px" }}><h2>No transactions yet</h2></div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transactions</h2>

      {/* Search & Filters */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search by title/notes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Rent</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Health</option>
          <option>Utilities</option>
          <option>Subscriptions</option>
        </select>
      </div>

      {/* Transaction Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>
  {t.title} {t.recurring && <span style={{
    background: "#FFBB28",
    color: "white",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "12px",
    marginLeft: "5px"
  }}>Recurring</span>}
</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td>{t.type}</td>
              <td>{t.date}</td>
              <td>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  style={{ color: "white", background: "red", border: "none", padding: "5px 10px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && <p style={{ marginTop: "20px" }}>No transactions match your search/filter.</p>}
    </div>
  );
}