import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`, { replace: true });
    setQuery("");
  }

  const clearInput = () => {
    setQuery("");
    setIsFocused(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="relative"
    >
      <motion.div
        animate={{
          width: isFocused ? "280px" : "180px",
          boxShadow: isFocused ? "0 0 0 3px rgba(253, 224, 71, 0.5)" : "none",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative"
      >
        <input
          placeholder="Search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !query && setIsFocused(false)}
          className={`w-full rounded-full bg-amber-100 px-10 py-3 text-sm transition-all duration-300 placeholder:text-amber-500 focus:bg-amber-50 focus:outline-none`}
        />

        <motion.div
          className="absolute top-1/2 left-3 -translate-y-1/2 text-amber-600"
          animate={{ scale: isFocused ? 1.1 : 1 }}
        >
          <FaSearch />
        </motion.div>

        {query && (
          <motion.button
            type="button"
            onClick={clearInput}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-amber-600"
          >
            <FaTimes />
          </motion.button>
        )}
      </motion.div>

      {isFocused && query && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 w-full text-center"
        >
          <span className="inline-block rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
            Press Enter to search
          </span>
        </motion.div>
      )}
    </motion.form>
  );
}

export default SearchOrder;
