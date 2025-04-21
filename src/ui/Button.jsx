import React from "react";
import { Link } from "react-router-dom";

function Button({ children, to, type = "primary", onClick }) {
  const base =
    "inline-flex items-center justify-center text-sm rounded-full cursor-pointer font-semibold uppercase tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const styles = {
    primary:
      base +
      " bg-gradient-to-r from-yellow-400 to-orange-400 text-stone-900 shadow-md hover:scale-105 hover:from-yellow-300 hover:to-orange-300 focus:ring-yellow-300 px-5 py-3 md:px-6 md:py-4",

    small:
      base +
      " bg-yellow-400 text-stone-900 shadow hover:bg-yellow-300 hover:scale-105 focus:ring-yellow-300 px-4 py-2 md:px-5 md:py-2.5 text-xs",

    round:
      base +
      " bg-yellow-500 text-white shadow hover:bg-yellow-400 hover:scale-110 focus:ring-yellow-300 px-3 py-1.5 md:px-4 md:py-2 text-xs",

    secondary:
      base +
      " bg-white/10 border border-stone-300 text-stone-300 backdrop-blur-md hover:bg-white/20 hover:text-white hover:scale-105 focus:ring-stone-200 px-5 py-3 md:px-6 md:py-4",
  };

  const content = <span className={styles[type]}>{children}</span>;

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
