import { formatCurrency } from "../../utils/helpers";
import { motion } from "framer-motion";
import { FaPizzaSlice } from "react-icons/fa";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-amber-100 py-4 last:border-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-amber-100 p-2 text-amber-800">
            <FaPizzaSlice className="text-sm" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <p className="font-bold text-stone-800">
                <span className="text-amber-600">{quantity}&times;</span> {name}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-1"
            >
              {isLoadingIngredients ? (
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        delay: i * 0.2,
                      }}
                      className="inline-block h-2 w-12 rounded-full bg-amber-200"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-stone-600">
                  {ingredients.join(", ")}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <motion.p
          whileHover={{ scale: 1.05 }}
          className="rounded-md bg-amber-50 px-2 py-1 text-lg font-bold text-amber-700"
        >
          {formatCurrency(totalPrice)}
        </motion.p>
      </div>
    </motion.li>
  );
}

export default OrderItem;
