import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthChart({ expenses, budget, categories }) {
  const spendingByCategory = categories.reduce((acc, category) => {
    acc[category] = expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
    return acc;
  }, {});

  const totalSpent = Object.values(spendingByCategory).reduce(
    (total, amount) => total + amount,
    0
  );

  const surplus = budget - totalSpent;

  const chartData = {
    labels: [...categories, "Surplus"],
    datasets: [
      {
        data: [...Object.values(spendingByCategory), surplus > 0 ? surplus : 0],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E74C3C",
          "#3498DB",
          "#F1C40F",
          "#1ABC9C",
          "#9B59B6",
          "#E67E22",
          "#2ECC71",
          "#34495E",
          "#D35400",
          "#8E44AD"
        ],
        hoverBackgroundColor: [
          "#FF6384AA",
          "#36A2EBAA",
          "#FFCE56AA",
          "#4BC0C0AA",
          "#9966FFAA",
          "#FF9F40AA",
          "#E74C3CAA",
          "#3498DBAA",
          "#F1C40FAA",
          "#1ABC9CAA",
          "#9B59B6AA",
          "#E67E22AA",
          "#2ECC71AA",
          "#34495EAA",
          "#D35400AA",
          "#8E44ADAA"
        ],
        
        hoverOffset: 20,
      },
    ],
  };

  return (
    <div>
      <h4 className="text-center mb-3">Spending by Category</h4>
      <Pie data={chartData} />
    </div>
  );
}
