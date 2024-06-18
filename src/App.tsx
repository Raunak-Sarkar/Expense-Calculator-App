import { useEffect, useState } from "react";
import ExpenseList from "./components/ExpenseList.";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseForm from "./components/ExpenseForm";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const colors = [
  "hsl(279, 39%, 43%)",
  "hsl(188, 64%, 55%)",
  "hsl(0, 100%, 62%)",
];
const getExpenses = () => {
  const expenses = localStorage.getItem("expenses");
  if (expenses) {
    return JSON.parse(expenses);
  } else {
    return [];
  }
};
function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const [expenses, setExpenses] = useState(getExpenses());
  const [userData, setUserData] = useState({
    labels: expenses.map((expense: { category: string }) => expense.category),
    datasets: [
      {
        label: "Expense",
        data: expenses.map((expense: { amount: number }) => expense.amount),
        backgroundColor: colors.map((color) => color),
      },
    ],
  });
  const visibility = selectedCategory
    ? expenses.filter(
        (expense: { category: string }) =>
          expense.category === selectedCategory,
      )
    : expenses;
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Update userData whenever expenses change
    setUserData({
      labels: expenses.map((expense: { category: string }) => expense.category),

      datasets: [
        {
          label: "Expense",
          data: expenses.map((expense: { amount: number }) => expense.amount),
          backgroundColor: colors,
        },
      ],
    });
  }, [expenses]);
  return (
    <>
      <ExpenseForm
        onSubmit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />
      <ExpenseFilter onSelect={(category) => setSelectedCategory(category)} />
      <ExpenseList
        expenses={visibility}
        onDelete={(id) =>
          setExpenses(expenses.filter((e: { id: number }) => e.id !== id))
        }
      />
      <div className="mx-auto  w-[700px]">
        <Bar data={userData} />
      </div>
    </>
  );
}

export default App;