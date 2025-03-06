import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudget from "../../components/AddBudget/AddBudget";
import EditBudget from "../../components/EditBudget/EditBudget";
import AddExpense from "../../components/AddExpense/AddExpense";
import ViewExpenses from "../../components/ViewExpenses/ViewExpenses";
import BudgetCard from "../../components/BudgetCard/BudgetCard";
import AnnualCard from "../../components/AnnualCard/AnnualCard";
import { useState } from "react";
import { ANNUAL_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext";

export default function App() {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState();
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();
  const [editBudget, setEditBudget] = useState(null);
  const { budgets, getBudgetExpenses } = useBudgets();

  const calendarMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const sortedBudgets = [...budgets].sort(
    (a, b) =>
      calendarMonths.indexOf(a.month) - calendarMonths.indexOf(b.month)
  );

  function openAddExpense(budgetId) {
    setShowAddExpense(true);
    setAddExpenseBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudget(true)}>
            New Budget
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {sortedBudgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                month={budget.month}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpense(budget.id)}
                onViewExpensesClick={() => setViewExpensesBudgetId(budget.id)}
                onEditClick={() => setEditBudget(budget)}
              />

                );
              })}
              <AnnualCard
                onAddExpenseClick={openAddExpense}
                onViewExpensesClick={() =>
                  setViewExpensesBudgetId(ANNUAL_BUDGET_ID)
                }
              />
            </div>
      </Container>
      <AddBudget
        show={showAddBudget}
        handleClose={() => setShowAddBudget(false)}
      />
      <AddExpense
        show={showAddExpense}
        defaultBudgetId={addExpenseBudgetId}
        handleClose={() => setShowAddExpense(false)}
      />
      <ViewExpenses
        budgetId={viewExpensesBudgetId}
        handleClose={() => setViewExpensesBudgetId()}
      />
      <EditBudget
  show={!!editBudget}
  handleClose={() => setEditBudget(null)}
  budget={editBudget}
/>

    </>
  );
}
