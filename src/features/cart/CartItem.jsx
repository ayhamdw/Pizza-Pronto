import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaPizzaSlice } from "react-icons/fa";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="border-b border-amber-100 py-4 last:border-0"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="rounded-full bg-amber-100 p-2 text-amber-600"
          >
            <FaPizzaSlice />
          </motion.div>
          <div>
            <p className="font-medium text-stone-800">
              <span className="font-bold text-amber-600">
                {quantity}&times;
              </span>{" "}
              {name}
            </p>
            <p className="text-sm text-stone-500">
              {formatCurrency(totalPrice / quantity)} each
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.p
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-amber-50 px-3 py-1 font-bold text-amber-700"
          >
            {formatCurrency(totalPrice)}
          </motion.p>

          <div className="flex items-center gap-2">
            <UpdateItemQuantity
              pizzaId={pizzaId}
              currentQuantity={currentQuantity}
            />
            <DeleteItem pizzaId={pizzaId} />
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default CartItem;
