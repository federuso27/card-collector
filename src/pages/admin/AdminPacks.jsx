import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { franchiseMeta } from "../../utils/franchise";

export default function AdminPacks() {
  const { packs, deletePack } = useData();
  const [toDelete, setToDelete] = useState(null);

  function confirmDelete() {
    deletePack(toDelete.id);
    setToDelete(null);
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Administrar sobres</h1>
        <Link to="/admin/sobres/nuevo" className="btn btn-primary">
          + Nuevo sobre
        </Link>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Franquicia</th>
            <th>Cartas</th>
            <th>Precio</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {packs.map((pack) => (
            <tr key={pack.id}>
              <td>{pack.name}</td>
              <td>{franchiseMeta(pack.franchise).label}</td>
              <td>{pack.cardCount}</td>
              <td>${pack.price.toLocaleString("es-AR")}</td>
              <td>{pack.stock}</td>
              <td className="admin-table-actions">
                <Link to={`/catalogo/sobres/${pack.id}`} className="btn btn-ghost btn-sm">
                  Ver
                </Link>
                <Link to={`/admin/sobres/${pack.id}/editar`} className="btn btn-ghost btn-sm">
                  Editar
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => setToDelete(pack)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={!!toDelete}
        title="Eliminar sobre"
        message={`¿Seguro que querés eliminar "${toDelete?.name}"? Esta acción no se puede deshacer.`}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
