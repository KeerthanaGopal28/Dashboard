export const transactions = [
  {
    id: 1,
    date: "2026-03-01",
    amount: 50000,
    category: "Salary",
    type: "income"
  },
  {
    id: 2,
    date: "2026-03-02",
    amount: 2000,
    category: "Food",
    type: "expense"
  },
  {
    id: 3,
    date: "2026-03-03",
    amount: 1500,
    category: "Transport",
    type: "expense"
  },
  {
    id: 4,
    date: "2026-03-05",
    amount: 8000,
    category: "Freelance",
    type: "income"
  },
  {
    id: 5,
    date: "2026-03-06",
    amount: 3000,
    category: "Shopping",
    type: "expense"
  },
  {
    id: 6,
    date: "2026-03-08",
    amount: 10000,
    category: "Investment",
    type: "income"
  },
  {
    id: 7,
    date: "2026-03-10",
    amount: 2500,
    category: "Food",
    type: "expense"
  },
  {
    id: 8,
    date: "2026-03-12",
    amount: 4000,
    category: "Travel",
    type: "expense"
  }
];
export const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Travel",
  "Salary",
  "Freelance",
  "Investment"
];
export const roles = ["viewer", "admin"];

export const getChartData = (transactions) => {
  const result = {};

  transactions.forEach((t) => {
    if (!result[t.date]) {
      result[t.date] = {
        date: t.date,
        income: 0,
        expense: 0
      };
    }

    if (t.type === "income") {
      result[t.date].income += t.amount;
    } else {
      result[t.date].expense += t.amount;
    }
  });

  return Object.values(result);
};

export const getCategoryData = (transactions) => {
  const result = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!result[t.category]) {
        result[t.category] = 0;
      }

      result[t.category] += t.amount;
    }
  });
  return Object.keys(result).map((key) => ({
    name: key,
    value: result[key]
  }));
};