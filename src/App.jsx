import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Catalog from "./pages/Catalog";
import CardDetail from "./pages/CardDetail";
import PackDetail from "./pages/PackDetail";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import NotFound from "./pages/NotFound";

import AdminCards from "./pages/admin/AdminCards";
import AdminCardForm from "./pages/admin/AdminCardForm";
import AdminPacks from "./pages/admin/AdminPacks";
import AdminPackForm from "./pages/admin/AdminPackForm";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="catalogo/cartas/:id" element={<CardDetail />} />
        <Route path="catalogo/sobres/:id" element={<PackDetail />} />

        <Route
          path="carrito"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="mis-pedidos"
          element={
            <ProtectedRoute allowedRoles={["cliente"]}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="admin/cartas"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCards />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/cartas/nueva"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCardForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/cartas/:id/editar"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCardForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/sobres"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPacks />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/sobres/nuevo"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPackForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/sobres/:id/editar"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPackForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/pedidos"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
