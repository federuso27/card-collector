import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const { createOrder, getCardById, getPackById } = useData();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function currentStock(item) {
    const product = item.type === "card" ? getCardById(item.id) : getPackById(item.id);
    return product ? product.stock : 0;
  }

  function handleCheckout() {
    setError("");
    if (items.length === 0) {
      setError("El carrito está vacío.");
      return;
    }
    const outOfStock = items.find((item) => item.quantity > currentStock(item));
    if (outOfStock) {
      setError(`No hay stock suficiente de "${outOfStock.name}".`);
      return;
    }

    createOrder(user.username, items);
    clearCart();
    navigate("/mis-pedidos");
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Tu carrito</h1>
        <p className="empty-state">
          Todavía no agregaste nada. <Link to="/catalogo">Ir al catálogo</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Tu carrito</h1>

      {error && <p className="form-error">{error}</p>}

      <table className="cart-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={`${item.type}-${item.id}`}>
              <td>{item.name} <span className="pill">{item.type === "card" ? "Carta" : "Sobre"}</span></td>
              <td>${item.price.toLocaleString("es-AR")}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  max={currentStock(item)}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.type,
                      item.id,
                      Math.min(currentStock(item), Math.max(1, Number(e.target.value)))
                    )
                  }
                />
              </td>
              <td>${(item.price * item.quantity).toLocaleString("es-AR")}</td>
              <td>
                <button className="btn btn-ghost btn-sm" onClick={() => removeFromCart(item.type, item.id)}>
                  Quitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-summary">
        <p>Total: <strong>${total.toLocaleString("es-AR")}</strong></p>
        <div className="cart-actions">
          <button className="btn btn-ghost" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}
