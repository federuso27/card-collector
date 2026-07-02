import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function MyOrders() {
  const { user } = useAuth();
  const { getOrdersByUsername } = useData();

  const orders = [...getOrdersByUsername(user.username)].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="orders-page">
      <h1>Mis pedidos</h1>

      {orders.length === 0 ? (
        <p className="empty-state">
          Todavía no hiciste ninguna compra. <Link to="/catalogo">Ir al catálogo</Link>
        </p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article key={order.id} className="order-card">
              <header>
                <h2>Pedido #{order.id}</h2>
                <span>{new Date(order.date).toLocaleString("es-AR")}</span>
              </header>
              <ul>
                {order.items.map((item) => (
                  <li key={`${item.type}-${item.id}`}>
                    {item.quantity} x {item.name}{" "}
                    <span className="pill">{item.type === "card" ? "Carta" : "Sobre"}</span> — $
                    {(item.price * item.quantity).toLocaleString("es-AR")}
                  </li>
                ))}
              </ul>
              <footer>
                Total: <strong>${order.total.toLocaleString("es-AR")}</strong>
              </footer>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
