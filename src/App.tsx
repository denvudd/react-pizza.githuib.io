import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

import ContentLoader from "./components/UI/ContentLoader/ContentLoader";

import "./scss/app.scss";

const Cart = lazy(() => import("./pages/Cart"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<ContentLoader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="product/:id"
          element={
            <Suspense fallback={<ContentLoader />}>
              <SingleProduct />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<ContentLoader />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
