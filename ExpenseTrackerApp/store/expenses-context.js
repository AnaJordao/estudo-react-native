import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "Some bananas",
    amount: 100.99,
    date: new Date("2020-01-20"),
  },
  {
    id: "e3",
    description: "A book",
    amount: 5.99,
    date: new Date("2019-12-01"),
  },
  {
    id: "e4",
    description: "A new desk",
    amount: 450,
    date: new Date("2022-04-12"),
  },
  {
    id: "e5",
    description: "A new laptop",
    amount: 1500,
    date: new Date("2024-03-02"),
  },
  {
    id: "e6",
    description: "A new phone",
    amount: 800,
    date: new Date("2023-02-02"),
  },
  {
    id: "e7",
    description: "A new shirt",
    amount: 30,
    date: new Date("2023-02-02"),
  },
  {
    id: "e8",
    description: "A new hat",
    amount: 20,
    date: new Date("2023-02-02"),
  },
  {
    id: "e9",
    description: "A new pair of socks",
    amount: 10,
    date: new Date("2023-02-02"),
  },
  {
    id: "e10",
    description: "A new pair of gloves",
    amount: 15,
    date: new Date("2023-02-02"),
  },
  {
    id: "e11",
    description: "A new pair of shoes",
    amount: 60,
    date: new Date("2023-02-02"),
  },
  {
    id: "e12",
    description: "A new pair of pants",
    amount: 50,
    date: new Date("2023-02-02"),
  },
  {
    id: "e13",
    description: "A new pair of shorts",
    amount: 40,
    date: new Date("2023-02-02"),
  },
  {
    id: "e14",
    description: "A new pair of sunglasses",
    amount: 25,
    date: new Date("2023-02-02"),
  },
  {
    id: "e15",
    description: "A new pair of earrings",
    amount: 35,
    date: new Date("2023-02-02"),
  },
  {
    id: "e16",
    description: "A new pair of shoes",
    amount: 60,
    date: new Date("2023-02-02"),
  },
  {
    id: "e17",
    description: "A new pair of pants",
    amount: 50,
    date: new Date("2024-05-01"),
  },
  {
    id: "e18",
    description: "A new pair of shorts",
    amount: 40,
    date: new Date("2024-05-05"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: ({ id }) => {},
  deleteExpense: ({ id }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpenses = state[updatableExpenseIndex];
      const udatedItem = { ...updatableExpenses, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = udatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
