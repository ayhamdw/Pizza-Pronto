import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { numOfPizzas, priceOfPizzas } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
function CartOverview() {
  const num = useSelector(numOfPizzas);
  const price = useSelector(priceOfPizzas);

  if (!num) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-2 font-semibold text-stone-300">
        <span> {num} pizzas</span>
        <span>{formatCurrency(price)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
