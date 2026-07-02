import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const { items } = useCart();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const cartCount =
    isAuthenticated && !isAdmin ? items.reduce((sum, i) => sum + i.quantity, 0) : 0;

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        Card Collector
      </Link>
      <nav className="navbar-links">
        <Link to="/catalogo">Catálogo</Link>

        {isAuthenticated && !isAdmin && (
          <>
            <Link to="/carrito">Carrito{cartCount > 0 ? ` (${cartCount})` : ""}</Link>
            <Link to="/mis-pedidos">Mis pedidos</Link>
          </>
        )}

        {isAdmin && (
          <>
            <Link to="/admin/cartas">Admin Cartas</Link>
            <Link to="/admin/sobres">Admin Sobres</Link>
            <Link to="/admin/pedidos">Pedidos</Link>
          </>
        )}

        {isAuthenticated ? (
          <div className="navbar-user">
            <span>
              {user.name} <em>({user.role})</em>
            </span>
            <button onClick={handleLogout} className="btn btn-ghost">
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Iniciar sesión
          </Link>
        )}
      </nav>
    </header>
  );
}
