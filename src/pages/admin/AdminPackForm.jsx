import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import PackForm from "../../components/admin/PackForm";

export default function AdminPackForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPackById, addPack, updatePack } = useData();

  const isEditing = Boolean(id);
  const existing = isEditing ? getPackById(id) : null;

  if (isEditing && !existing) {
    return <p>El sobre que querés editar no existe.</p>;
  }

  function handleSubmit(values) {
    if (isEditing) {
      updatePack(existing.id, values);
    } else {
      addPack(values);
    }
    navigate("/admin/sobres");
  }

  return (
    <div className="admin-page">
      <h1>{isEditing ? `Editar sobre: ${existing.name}` : "Nuevo sobre"}</h1>
      <PackForm
        initialValues={existing ?? undefined}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? "Guardar cambios" : "Crear sobre"}
      />
    </div>
  );
}
