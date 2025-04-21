import React from "react";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import { motion } from "framer-motion";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          type="round"
          onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
          className="bg-red-100 text-red-600 hover:bg-red-200"
        >
          -
        </Button>
      </motion.div>

      <motion.span
        key={currentQuantity}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="w-6 text-center font-bold"
      >
        {currentQuantity}
      </motion.span>

      <motion.div whileTap={{ scale: 0.9 }}>
        <Button
          type="round"
          onClick={() => dispatch(increaseItemQuantity(pizzaId))}
          className="bg-green-100 text-green-600 hover:bg-green-200"
        >
          +
        </Button>
      </motion.div>
    </div>
  );
}

export default UpdateItemQuantity;
