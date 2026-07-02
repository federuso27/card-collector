import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { franchiseMeta, RARITY_COLORS } from "../utils/franchise";
import ProductThumb from "../components/common/ProductThumb";

export default function CardDetail() {
  const { id } = useParams();
  const { getCardById } = useData();
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart } = useCart();

  const card = getCardById(id);
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");

  if (!card) {
    return (
      <div className="detail-page">
        <p>La carta que buscás no existe.</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  const meta = franchiseMeta(card.franchise);
  const canBuy = isAuthenticated && !isAdmin;

  function handleAdd() {
    addToCart({
      type: "card",
      id: card.id,
      name: card.name,
      price: card.price,
      stock: card.stock,
      quantity,
    });
    setMsg(`${quantity} x ${card.name} agregado al carrito.`);
  }

  return (
    <div className="detail-page">
      <ProductThumb product={card} className="detail-thumb" />

      <div className="detail-info">
        <span className="badge" style={{ backgroundColor: RARITY_COLORS[card.rarity] ?? "#666" }}>
          {card.rarity}
        </span>
        <h1>{card.name}</h1>
        <p className="product-franchise">{meta.label}</p>
        <p className="detail-description">{card.description}</p>
        <p className="detail-price">${card.price.toLocaleString("es-AR")}</p>
        <p className={`product-stock ${card.stock === 0 ? "out" : ""}`}>
          {card.stock > 0 ? `Stock disponible: ${card.stock}` : "Sin stock"}
        </p>

        {canBuy && card.stock > 0 && (
          <div className="detail-buy">
            <label>
              Cantidad
              <input
                type="number"
                min="1"
                max={card.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(card.stock, Math.max(1, Number(e.target.value))))}
              />
            </label>
            <button className="btn btn-primary" onClick={handleAdd}>
              Agregar al carrito
            </button>
            {msg && <p className="toast">{msg}</p>}
          </div>
        )}

        {!isAuthenticated && (
          <p className="empty-state">
            <Link to="/login">Iniciá sesión</Link> como cliente para comprar esta carta.
          </p>
        )}
      </div>
    </div>
  );
}
