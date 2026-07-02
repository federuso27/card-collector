import { useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CardItem from "../components/common/CardItem";
import PackItem from "../components/common/PackItem";
import FranchiseFilter from "../components/common/FranchiseFilter";

const TYPES = [
  { value: "all", label: "Todo" },
  { value: "cards", label: "Cartas" },
  { value: "packs", label: "Sobres" },
];

export default function Catalog() {
  const { cards, packs } = useData();
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToCart } = useCart();

  const [franchise, setFranchise] = useState("all");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [addedMsg, setAddedMsg] = useState("");

  const canBuy = isAuthenticated && !isAdmin;

  const filteredCards = useMemo(
    () =>
      cards.filter(
        (c) =>
          (franchise === "all" || c.franchise === franchise) &&
          c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [cards, franchise, search]
  );

  const filteredPacks = useMemo(
    () =>
      packs.filter(
        (p) =>
          (franchise === "all" || p.franchise === franchise) &&
          p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [packs, franchise, search]
  );

  function handleAdd(type, product) {
    addToCart({
      type,
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      quantity: 1,
    });
    setAddedMsg(`${product.name} agregado al carrito.`);
    setTimeout(() => setAddedMsg(""), 2000);
  }

  return (
    <div className="catalog">
      <h1>Catálogo</h1>

      <div className="catalog-filters">
        <input
          type="search"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="type-tabs">
          {TYPES.map((t) => (
            <button
              key={t.value}
              className={type === t.value ? "chip active" : "chip"}
              onClick={() => setType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <FranchiseFilter value={franchise} onChange={setFranchise} />

      {addedMsg && <p className="toast">{addedMsg}</p>}

      {(type === "all" || type === "cards") && (
        <section>
          <h2>Cartas</h2>
          {filteredCards.length === 0 ? (
            <p className="empty-state">No hay cartas que coincidan con la búsqueda.</p>
          ) : (
            <div className="product-grid">
              {filteredCards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  footer={
                    canBuy ? (
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={card.stock === 0}
                        onClick={() => handleAdd("card", card)}
                      >
                        {card.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                      </button>
                    ) : null
                  }
                />
              ))}
            </div>
          )}
        </section>
      )}

      {(type === "all" || type === "packs") && (
        <section>
          <h2>Sobres</h2>
          {filteredPacks.length === 0 ? (
            <p className="empty-state">No hay sobres que coincidan con la búsqueda.</p>
          ) : (
            <div className="product-grid">
              {filteredPacks.map((pack) => (
                <PackItem
                  key={pack.id}
                  pack={pack}
                  footer={
                    canBuy ? (
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={pack.stock === 0}
                        onClick={() => handleAdd("pack", pack)}
                      >
                        {pack.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                      </button>
                    ) : null
                  }
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
