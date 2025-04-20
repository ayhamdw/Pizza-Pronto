import React from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = "loading" === navigation.state;
  // const isLoading = true;

  return (
    <div className="gap- grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="my-10 overflow-scroll">
        <main className="mx-auto max-w-2xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
