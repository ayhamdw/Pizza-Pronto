import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { motion } from "framer-motion";

function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-red-600 to-amber-500 px-6 py-4 shadow-lg"
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <Link
          to="/"
          className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight text-white"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block text-3xl"
          >
            🍕
          </motion.span>
          <span className="bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
            Pizza Pronto
          </span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="ml-1 inline-block text-3xl"
          >
            🔥
          </motion.span>
        </Link>
      </motion.div>

      <div className="flex items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="overflow-hidden rounded-full bg-white/20 backdrop-blur-sm"
        >
          <SearchOrder />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Username />
        </motion.div>
      </div>
    </motion.header>
  );
}

export default Header;
