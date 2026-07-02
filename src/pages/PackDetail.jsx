import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { franchiseMeta } from "../utils/franchise";
import ProductThumb from "../components/common/ProductThumb";

export default function PackDetail() {
  const { id } = useParams();
  const { getPackById } = useData();
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart } = useCart();

  const pack = getPackById(id);
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState("");

  if (!pack) {
    return (
      <div className="detail-page">
        <p>El sobre que buscás no existe.</p>
        <Link to="/catalogo">Volver al catálogo</Link>
      </div>
    );
  }

  const meta = franchiseMeta(pack.franchise);
  const canBuy = isAuthenticated && !isAdmin;

  function handleAdd() {
    addToCart({
      type: "pack",
      id: pack.id,
      name: pack.name,
      price: pack.price,
      stock: pack.stock,
      quantity,
    });
    setMsg(`${quantity} x ${pack.name} agregado al carrito.`);
  }

  return (
    <div className="detail-page">
      <ProductThumb product={pack} className="detail-thumb" />

      <div className="detail-info">
        <span className="badge badge-pack">Sobre x{pack.cardCount}</span>
        <h1>{pack.name}</h1>
        <p className="product-franchise">{meta.label}</p>
        <p className="detail-description">{pack.description}</p>
        <p className="detail-price">${pack.price.toLocaleString("es-AR")}</p>
        <p className={`product-stock ${pack.stock === 0 ? "out" : ""}`}>
          {pack.stock > 0 ? `Stock disponible: ${pack.stock}` : "Sin stock"}
        </p>

        {canBuy && pack.stock > 0 && (
          <div className="detail-buy">
            <label>
              Cantidad
              <input
                type="number"
                min="1"
                max={pack.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(pack.stock, Math.max(1, Number(e.target.value))))}
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
            <Link to="/login">Iniciá sesión</Link> como cliente para comprar este sobre.
          </p>
        )}
      </div>
    </div>
  );
}
