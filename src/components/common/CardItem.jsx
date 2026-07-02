import { Link } from "react-router-dom";
import { franchiseMeta, RARITY_COLORS } from "../../utils/franchise";
import ProductThumb from "./ProductThumb";

export default function CardItem({ card, footer }) {
  const meta = franchiseMeta(card.franchise);

  return (
    <article className="product-card">
      <ProductThumb product={card} to={`/catalogo/cartas/${card.id}`} />
      <div className="product-info">
        <div className="product-info-top">
          <h3>
            <Link to={`/catalogo/cartas/${card.id}`}>{card.name}</Link>
          </h3>
          <span className="badge" style={{ backgroundColor: RARITY_COLORS[card.rarity] ?? "#666" }}>
            {card.rarity}
          </span>
        </div>
        <p className="product-franchise">{meta.label}</p>
        <p className="product-price">${card.price.toLocaleString("es-AR")}</p>
        <p className={`product-stock ${card.stock === 0 ? "out" : ""}`}>
          {card.stock > 0 ? `Stock: ${card.stock}` : "Sin stock"}
        </p>
        {footer && <div className="product-footer">{footer}</div>}
      </div>
    </article>
  );
}
