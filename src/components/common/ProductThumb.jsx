import { useState } from "react";
import { Link } from "react-router-dom";
import { franchiseMeta } from "../../utils/franchise";

export default function ProductThumb({ product, to, className = "" }) {
  const [imgError, setImgError] = useState(false);
  const meta = franchiseMeta(product.franchise);
  const hasImage = Boolean(product.image) && !imgError;

  const content = hasImage ? (
    <img
      src={product.image}
      alt={product.name}
      className="product-thumb-img"
      onError={() => setImgError(true)}
    />
  ) : (
    <span className="product-thumb-name">{product.name}</span>
  );

  const style = hasImage ? undefined : { background: meta.gradient };
  const classes = `product-thumb ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <div className={classes} style={style}>
      {content}
    </div>
  );
}
