import { Link } from "react-router-dom";
import { franchiseMeta } from "../../utils/franchise";
import ProductThumb from "./ProductThumb";

export default function PackItem({ pack, footer }) {
  const meta = franchiseMeta(pack.franchise);

  return (
    <article className="product-card">
      <ProductThumb product={pack} to={`/catalogo/sobres/${pack.id}`} />
      <div className="product-info">
        <div className="product-info-top">
          <h3>
            <Link to={`/catalogo/sobres/${pack.id}`}>{pack.name}</Link>
          </h3>
          <span className="badge badge-pack">Sobre x{pack.cardCount}</span>
        </div>
        <p className="product-franchise">{meta.label}</p>
        <p className="product-price">${pack.price.toLocaleString("es-AR")}</p>
        <p className={`product-stock ${pack.stock === 0 ? "out" : ""}`}>
          {pack.stock > 0 ? `Stock: ${pack.stock}` : "Sin stock"}
        </p>
        {footer && <div className="product-footer">{footer}</div>}
      </div>
    </article>
  );
}
