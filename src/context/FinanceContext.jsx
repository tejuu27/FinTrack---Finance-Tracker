import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [
      {
        id: uuidv4(),
        title: "Salary",
        amount: 50000,
        category: "Income",
        type: "income",
        date: "2026-03-01",
        notes: "",
        recurring: false,
      },
      {
        id: uuidv4(),
        title: "Netflix",
        amount: 499,
        category: "Subscriptions",
        type: "expense",
        date: "2026-03-05",
        notes: "Monthly subscription",
        recurring: true,
      },
      {
        id: uuidv4(),
        title: "Groceries",
        amount: 2000,
        category: "Food",
        type: "expense",
        date: "2026-03-10",
        notes: "",
        recurring: false,
      },
    ];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? Number(saved) : 30000;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const addTransaction = (data) => {
    setTransactions((prev) => [...prev, { ...data, id: uuidv4() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = (id, updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        budget,
        setBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);