import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import { motion, AnimatePresence } from "framer-motion";
import { FaPizzaSlice, FaTrash, FaArrowLeft } from "react-icons/fa";
import { formatCurrency } from "../../utils/helpers";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function handleClear() {
    dispatch(clearCart());
  }

  if (cart.length === 0) return <EmptyCart />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8"
    >
      <LinkButton
        to="/menu"
        className="flex items-center gap-2 text-amber-700 transition-colors hover:text-amber-900"
      >
        <FaArrowLeft className="inline" /> Back To Menu
      </LinkButton>

      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 flex items-center gap-3 text-3xl font-bold text-stone-800"
      >
        <FaPizzaSlice className="animate-bounce text-red-500" />
        Your Pizza Cart, {username}
        <FaPizzaSlice
          className="animate-bounce text-amber-500"
          style={{ animationDelay: "0.2s" }}
        />
      </motion.h2>

      <motion.ul
        className="mt-6 divide-y divide-stone-200/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence>
          {cart.map((item) => (
            <motion.li
              key={item.pizzaId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CartItem item={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <motion.div
        className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50 to-red-50 p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="space-y-1">
          <p className="text-lg font-medium text-stone-700">
            Total Items:{" "}
            <span className="text-amber-600">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </p>
          <p className="text-xl font-bold text-stone-800">
            Total Price:{" "}
            <span className="text-red-600">
              {formatCurrency(
                cart.reduce((sum, item) => sum + item.totalPrice, 0),
              )}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            to="/order/new"
            type="primary"
            className="flex items-center gap-2"
          >
            Order Now <FaPizzaSlice className="inline" />
          </Button>
          <Button
            type="secondary"
            onClick={handleClear}
            className="flex items-center gap-2 border-red-300 bg-white text-red-600 hover:bg-red-50"
          >
            <FaTrash className="inline" /> Clear Cart
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Cart;
