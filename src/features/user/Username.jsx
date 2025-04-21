import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2"
    >
      <motion.div
        whileHover={{ rotate: 15 }}
        className="text-lg text-amber-600"
      >
        <FaUserCircle />
      </motion.div>
      <motion.span
        className="hidden rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-stone-700 md:block"
        whileHover={{ backgroundColor: "#FEF3C7" }}
      >
        {username}
      </motion.span>
    </motion.div>
  );
}

export default Username;
