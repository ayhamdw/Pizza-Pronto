import React from "react";
import { Link } from "react-router-dom";

function Button({ children, to }) {
  const className =
    "focus: transition-color mt-4 inline-block cursor-pointer rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-800 uppercase ring-offset-2 duration-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:outline-none disabled:cursor-not-allowed";
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }
  return <button className={className}>{children}</button>;
}

export default Button;
