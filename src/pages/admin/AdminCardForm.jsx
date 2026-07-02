import { useNavigate, useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";
import CardForm from "../../components/admin/CardForm";

export default function AdminCardForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCardById, addCard, updateCard } = useData();

  const isEditing = Boolean(id);
  const existing = isEditing ? getCardById(id) : null;

  if (isEditing && !existing) {
    return <p>La carta que querés editar no existe.</p>;
  }

  function handleSubmit(values) {
    if (isEditing) {
      updateCard(existing.id, values);
    } else {
      addCard(values);
    }
    navigate("/admin/cartas");
  }

  return (
    <div className="admin-page">
      <h1>{isEditing ? `Editar carta: ${existing.name}` : "Nueva carta"}</h1>
      <CardForm
        initialValues={existing ?? undefined}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? "Guardar cambios" : "Crear carta"}
      />
    </div>
  );
}
