
interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
  }
  interface Props {
    expenses: Expense[];
    onDelete: (id: number) => void;
  }
  
  function ExpenseList({ expenses, onDelete }: Props) {
    if (expenses.length === 0) return <p>You have No expense</p>;
    return (
      <>
      <div className="flex items-center justify-center ">
      <table className="mt-10 border-2 border-yellow">
        <thead>
          <tr className="bg-yellow p-4">
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button onClick={() => onDelete(expense.id)} className="bg-red px-3 rounded text-white font-bold">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{expenses.reduce((acc, expense) => acc + expense.amount, 0)}</td>
          </tr>
        </tfoot>
      </table>
      </div>
      </>
    );
  }
  
  export default ExpenseList;
  