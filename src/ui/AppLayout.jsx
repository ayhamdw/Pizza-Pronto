import React from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = "loading" === navigation.state;

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <h1>Content </h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
