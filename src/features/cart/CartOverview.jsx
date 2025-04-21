import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaPizzaSlice } from "react-icons/fa";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const num = useSelector(getTotalCartQuantity);
  const price = useSelector(getTotalCartPrice);

  if (!num) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed right-0 bottom-0 left-0 z-50 bg-gradient-to-r from-red-600 to-amber-600 px-6 py-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <FaShoppingCart className="text-2xl text-white" />
            <motion.span
              key={num}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-red-600"
            >
              {num}
            </motion.span>
          </div>
          <p className="font-bold text-white">
            {num} {num === 1 ? "pizza" : "pizzas"} • {formatCurrency(price)}
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-red-600 shadow-md hover:bg-amber-50"
          >
            View Cart
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaPizzaSlice />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CartOverview;
