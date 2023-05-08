import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

import { ContentLoader } from "./components/UI";

import "./scss/app.scss";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const SingleProduct = lazy(
  () => import(/* webpackChunkName: "SingleProduct" */ "./pages/SingleProduct")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

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
