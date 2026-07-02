import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { franchiseMeta } from "../../utils/franchise";

export default function AdminCards() {
  const { cards, deleteCard } = useData();
  const [toDelete, setToDelete] = useState(null);

  function confirmDelete() {
    deleteCard(toDelete.id);
    setToDelete(null);
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Administrar cartas</h1>
        <Link to="/admin/cartas/nueva" className="btn btn-primary">
          + Nueva carta
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Franquicia</th>
            <th>Rareza</th>
            <th>Precio</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.name}</td>
              <td>{franchiseMeta(card.franchise).label}</td>
              <td>{card.rarity}</td>
              <td>${card.price.toLocaleString("es-AR")}</td>
              <td>{card.stock}</td>
              <td className="admin-table-actions">
                <Link to={`/catalogo/cartas/${card.id}`} className="btn btn-ghost btn-sm">
                  Ver
                </Link>
                <Link to={`/admin/cartas/${card.id}/editar`} className="btn btn-ghost btn-sm">
                  Editar
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => setToDelete(card)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar carta"
        message={`¿Seguro que querés eliminar "${toDelete?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
