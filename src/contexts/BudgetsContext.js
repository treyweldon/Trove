import React, { useContext } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../hooks/useLocalStorage"

const BudgetsContext = React.createContext()

export const ANNUAL_BUDGET_ID = "Uncategorized"

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [expenses, setExpenses] = useLocalStorage("expenses", [])

  function getBudgetExpenses(budgetId) {
    return expenses.filter(expense => expense.budgetId === budgetId)
  }
  function addExpense({ description, amount, category, budgetId }) {
    setExpenses(prevExpenses => {
      return [...prevExpenses, { id: uuidV4(), description, amount, category, budgetId }]
    })
  }
  function addBudget({ month, max }) {
    setBudgets(prevBudgets => {
      if (prevBudgets.find(budget => budget.month === month)) {
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), month, max }]
    })
  }
  function deleteBudget({ id }) {
    // setExpenses(prevExpenses => {
    //   return prevExpenses.map(expense => {
    //     if (expense.budgetId !== id) return expense
    //     return { ...expense, budgetId: ANNUAL_BUDGET_ID }
    //   })
    // })
    setExpenses(prevExpenses => {
        return prevExpenses.filter(expense => expense.budgetId !== id)
      })
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.id !== id)
    })
  }
  function deleteExpense({ id }) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
    })
  }
  function editBudget(id, newMax) {
    setBudgets(prevBudgets =>
      prevBudgets.map(budget =>
        budget.id === id ? { ...budget, max: newMax } : budget
      )
    );
  }
  

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        editBudget
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}