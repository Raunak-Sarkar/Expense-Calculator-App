import categories from "./categories";

interface Props {
  onSelect: (category: string) => void;
}

function ExpenseFilter({ onSelect }: Props) {
  return (
    <>
    <div className="flex items-center justify-center space-x-3 ">
    <h3 className="font-bold mt-3">Filter by Category</h3>
    <select id="select" onChange={(e) => onSelect(e.target.value)} className="mt-5 bg-red">
      <option value=""></option>
      {categories.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    </div>
    </>
  );
}

export default ExpenseFilter;