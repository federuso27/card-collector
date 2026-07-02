import { useData } from "../../context/DataContext";

export default function AdminOrders() {
  const { orders } = useData();
  const sorted = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="admin-page">
      <h1>Todos los pedidos</h1>

      {sorted.length === 0 ? (
        <p className="empty-state">Todavía no se registraron compras.</p>
      ) : (
        <div className="orders-list">
          {sorted.map((order) => (
            <article key={order.id} className="order-card">
              <header>
                <h2>Pedido #{order.id}</h2>
                <span>{new Date(order.date).toLocaleString("es-AR")}</span>
              </header>
              <p className="pill">Cliente: {order.username}</p>
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
