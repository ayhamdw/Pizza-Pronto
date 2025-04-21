import { useFetcher, useLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMotorcycle,
  FaClock,
  FaPizzaSlice,
  FaMoneyBillWave,
} from "react-icons/fa";
import OrderItem from "./OrderItem";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const totalPrice = orderPrice + priorityPrice;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <motion.div
        className="mb-8 flex flex-wrap items-center justify-between gap-4"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <motion.h2
          className="flex items-center gap-2 text-2xl font-bold text-stone-800"
          whileHover={{ scale: 1.02 }}
        >
          <FaPizzaSlice className="text-red-500" />
          Order #{id}
          <FaPizzaSlice className="text-amber-500" />
        </motion.h2>

        <div className="flex gap-2">
          {priority && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-4 py-1 text-sm font-bold text-white"
            >
              <FaClock className="text-white" /> PRIORITY
            </motion.span>
          )}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 px-4 py-1 text-sm font-bold text-white"
          >
            <FaMotorcycle className="text-white" /> {status.toUpperCase()}
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`mb-8 rounded-xl border-l-4 p-6 shadow-sm ${
          deliveryIn >= 0
            ? "border-green-400 bg-gradient-to-r from-amber-50 to-green-50"
            : "border-red-400 bg-gradient-to-r from-amber-50 to-red-50"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full p-3 ${
                deliveryIn >= 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <FaMotorcycle className="text-xl" />
            </div>
            <p className="text-lg font-medium text-stone-800">
              {deliveryIn >= 0
                ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left! 😃`
                : "Order should have arrived"}
            </p>
          </div>
          <p className="text-sm text-stone-600 sm:text-right">
            Estimated delivery: {formatDate(estimatedDelivery)}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 overflow-hidden rounded-xl border border-stone-100 bg-white shadow-sm"
      >
        <h3 className="border-b border-amber-100 bg-amber-50 px-6 py-4 text-lg font-semibold text-stone-800">
          Your Pizza Order
        </h3>
        <ul className="divide-y divide-stone-100">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.li
                key={item.pizzaId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <OrderItem
                  item={item}
                  isLoadingIngredients={fetcher.state === "loading"}
                  ingredients={
                    fetcher?.data?.find((el) => el.id === item.pizzaId)
                      ?.ingredients ?? []
                  }
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50 to-red-50 p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-stone-800">
          <FaMoneyBillWave className="text-amber-600" />
          Order Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-stone-600">Pizza Total:</span>
            <span className="font-medium">{formatCurrency(orderPrice)}</span>
          </div>
          {priority && (
            <div className="flex justify-between">
              <span className="text-stone-600">Priority Fee:</span>
              <span className="font-medium">
                {formatCurrency(priorityPrice)}
              </span>
            </div>
          )}
          <div className="flex justify-between border-t border-stone-200 pt-3">
            <span className="font-bold text-stone-800">Total:</span>
            <span className="text-lg font-bold text-red-600">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
