import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaClock,
  FaPizzaSlice,
} from "react-icons/fa";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="mb-8 flex items-center gap-3 text-3xl font-bold text-stone-800"
      >
        <FaPizzaSlice className="text-red-500" />
        Ready to order? Let's go!
        <FaPizzaSlice className="text-amber-500" />
      </motion.h2>

      <Form method="POST" className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm"
        >
          <label className="mb-3 flex items-center gap-2 font-medium text-stone-700">
            <FaUser className="text-amber-600" />
            Your Name
          </label>
          <input
            className="w-full rounded-lg border border-amber-200 px-4 py-3 transition-all outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-amber-100 bg-white p-6 shadow-sm"
        >
          <label className="mb-3 flex items-center gap-2 font-medium text-stone-700">
            <FaPhone className="text-amber-600" />
            Phone Number
          </label>
          <input
            className="w-full rounded-lg border border-amber-200 px-4 py-3 transition-all outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
            type="tel"
            name="phone"
            required
            placeholder="+1 234 567 8900"
          />
          <AnimatePresence>
            {formErrors?.phone && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700"
              >
                {formErrors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-xl border border-amber-100 bg-white p-6 shadow-sm"
        >
          <label className="mb-3 flex items-center gap-2 font-medium text-stone-700">
            <FaMapMarkerAlt className="text-amber-600" />
            Delivery Address
          </label>
          <input
            className="w-full rounded-lg border border-amber-200 px-4 py-3 pr-20 transition-all outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
            type="text"
            name="address"
            disabled={isLoadingAddress}
            defaultValue={address}
            required
            placeholder="123 Pizza Street"
          />
          {!position.latitude && !position.longitude && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-[4.5rem] right-6 sm:top-[3.5rem]"
            >
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                className="flex items-center gap-1"
              >
                <FaMapMarkerAlt className="text-sm" />
                {isLoadingAddress ? "Locating..." : "Use My Location"}
              </Button>
            </motion.div>
          )}

          <AnimatePresence>
            {addressStatus === "error" && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 rounded-md bg-red-100 p-2 text-sm text-red-700"
              >
                {errorAddress}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-4 rounded-xl border border-amber-100 bg-white p-6 shadow-sm"
        >
          <div className="flex h-6 items-center">
            <input
              className="h-6 w-6 cursor-pointer accent-red-500 focus:ring focus:ring-red-300 focus:ring-offset-2 focus:outline-none"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
          </div>
          <div>
            <label
              htmlFor="priority"
              className="flex cursor-pointer items-center gap-2 font-medium text-stone-700"
            >
              <FaClock className="text-red-500" />
              Priority Delivery (+20%)
            </label>
            <p className="mt-1 text-sm text-stone-500">
              Get your pizza faster! Additional {formatCurrency(priorityPrice)}{" "}
              fee.
            </p>
          </div>
        </motion.div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pt-4"
        >
          <Button
            disabled={isSubmitting || isLoadingAddress}
            type="primary"
            className="flex w-full items-center justify-center gap-2 py-4 text-lg"
          >
            {isSubmitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block"
                >
                  🍕
                </motion.span>
                Placing Order...
              </>
            ) : (
              <>
                Order Now for {formatCurrency(totalPrice)}
                <FaPizzaSlice />
              </>
            )}
          </Button>
        </motion.div>
      </Form>
    </motion.div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please provide a valid phone number so we can contact you about your delivery";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
