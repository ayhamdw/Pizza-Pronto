import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { motion } from "framer-motion";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/70 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-2xl ${
        soldOut ? "opacity-70 grayscale" : ""
      }`}
    >
      {/* Image Section */}
      <div className="relative pt-[75%]">
        <img
          src={imageUrl}
          alt={name}
          className="absolute top-0 left-0 h-full w-full object-cover"
          loading="lazy"
        />
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-full bg-white/90 px-4 py-1 text-sm font-bold text-red-600 uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div className="flex flex-grow flex-col space-y-3 p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {name}
          </h3>
          {!soldOut && (
            <span className="rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 px-3 py-1 text-xs font-semibold text-black shadow-md">
              {formatCurrency(unitPrice)}
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-sm text-gray-700 italic">
          {ingredients.join(", ")}
        </p>

        {/* Cart Actions */}
        <div className="mt-auto">
          {!soldOut && !isInCart ? (
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                onClick={handleAddToCart}
                className="w-full rounded-lg bg-yellow-500 py-2 font-semibold text-white hover:bg-yellow-600"
              >
                + Add to Cart
              </Button>
            </motion.div>
          ) : isInCart ? (
            <div className="flex flex-col items-center justify-between space-y-3 rounded-xl bg-yellow-100/60 p-3 shadow-inner">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export default MenuItem;
