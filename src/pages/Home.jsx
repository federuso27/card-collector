import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import CardItem from "../components/common/CardItem";
import PackItem from "../components/common/PackItem";

export default function Home() {
  const { cards, packs } = useData();

  const featuredCards = [...cards].sort((a, b) => b.price - a.price).slice(0, 4);
  const featuredPacks = [...packs].sort((a, b) => b.price - a.price).slice(0, 3);

  return (
    <div className="home">
      <section className="hero">
        <h1>Card Collector</h1>
        <p>
          Comprá cartas individuales y sobres de Pokémon, Yu-Gi-Oh! y Magic: The Gathering
          para tu colección. Explorá el catálogo, armá tu carrito y hacé crecer tu mazo.
        </p>
        <div className="hero-actions">
          <Link to="/catalogo" className="btn btn-primary">
            Ver catálogo
          </Link>
          <Link to="/login" className="btn btn-ghost">
            Iniciar sesión
          </Link>
        </div>
      </section>

      <section>
        <h2>Cartas destacadas</h2>
        <div className="product-grid">
          {featuredCards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section>
        <h2>Sobres destacados</h2>
        <div className="product-grid">
          {featuredPacks.map((pack) => (
            <PackItem key={pack.id} pack={pack} />
          ))}
        </div>
      </section>
    </div>
  );
}
