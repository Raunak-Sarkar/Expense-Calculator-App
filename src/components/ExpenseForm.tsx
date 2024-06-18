import { z } from "zod";
import categories from "./categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be atleast 3 characters" })
    .max(100),
  amount: z.number({ invalid_type_error: "Minimum amount be 1" }).min(1),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required" }),
  }),
});
type FormData = z.infer<typeof schema>;
interface Props {
  onSubmit: (data: FormData) => void;
}

function ExpenseForm({ onSubmit }: Props) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  return (
    <>
      {/* form Container */}
      <h1 className=" text-center  text-2xl font-bold text-voilet">
        Expense Calculator
      </h1>
      <div className="container mx-auto flex h-[450px] max-w-3xl flex-col items-center justify-center bg-blue">
        <h1 className="text-center text-2xl font-bold  text-yellow ">
          Expense Form
        </h1>
        <div className="card   w-[400px] rounded-lg bg-white shadow-[black_20px_30px]">
          <form
            className=" mt-3 flex flex-col space-y-3 p-3"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
            })}
          >
            <span className="font-bold">Description</span>
            <input
              type="text"
              {...register("description")}
              className="shadow-[black_5px_5px] outline placeholder:px-3"
              placeholder="Enter description"
            />
            {errors.description && <span>{errors.description.message}</span>}
            <span className="font-bold">Amount</span>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className="shadow-[black_5px_5px] outline placeholder:px-3 "
              placeholder="Enter amount"
            />
            {errors.amount && <p>{errors.amount.message}</p>}

            <span className="font-bold">Categories</span>
            <select
              id="category"
              className="shadow-[black_5px_5px] outline"
              {...register("category")}
            >
              <option value=""></option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p>{errors.category.message}</p>}

            <div className="pt-4 text-center">
              <button
                type="submit"
                className="rounded-full bg-red px-10 font-bold text-black shadow-[black_5px_5px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ExpenseForm;