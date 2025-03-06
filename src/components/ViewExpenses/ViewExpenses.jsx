import { Modal, Button, Stack } from "react-bootstrap";
import {
  ANNUAL_BUDGET_ID,
  useBudgets,
} from "../../contexts/BudgetsContext";
import { currencyFormatter } from "../../utilities/utils";
import MonthChart from "../MonthChart/MonthChart";

export default function ViewExpenses({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetExpenses(budgetId);
  const budget =
    ANNUAL_BUDGET_ID === budgetId
      ? { month: "Uncategorized", id: ANNUAL_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  const budgetAmount = budget?.max || 0;

  const categories = [
    ...new Set(expenses.map((expense) => expense.category)),
  ];

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.month}</div>
            {budgetId !== ANNUAL_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <MonthChart
          expenses={expenses}
          budget={budgetAmount}
          categories={categories}
        />
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto">
                <div className="fs-4">{expense.description}</div>
                <div className="text-muted">{expense.category}</div>
              </div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>

      </Modal.Body>
    </Modal>
  );
}
