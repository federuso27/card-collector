import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FRANCHISES, RARITY_COLORS } from "../../utils/franchise";

const RARITIES = Object.keys(RARITY_COLORS);

const EMPTY = {
  name: "",
  franchise: FRANCHISES[0].value,
  rarity: RARITIES[0],
  price: "",
  stock: "",
  description: "",
  image: "",
};

export default function CardForm({ initialValues, onSubmit, submitLabel }) {
  const [form, setForm] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validate() {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.franchise) newErrors.franchise = "Elegí una franquicia.";
    if (!form.rarity) newErrors.rarity = "Elegí una rareza.";
    if (form.price === "" || Number(form.price) <= 0) newErrors.price = "El precio debe ser mayor a 0.";
    if (form.stock === "" || Number(form.stock) < 0 || !Number.isInteger(Number(form.stock)))
      newErrors.stock = "El stock debe ser un número entero mayor o igual a 0.";
    if (!form.description.trim() || form.description.trim().length < 10)
      newErrors.description = "La descripción debe tener al menos 10 caracteres.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit} noValidate>
      <label>
        Nombre
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <label>
        Franquicia
        <select name="franchise" value={form.franchise} onChange={handleChange}>
          {FRANCHISES.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        {errors.franchise && <span className="field-error">{errors.franchise}</span>}
      </label>

      <label>
        Rareza
        <select name="rarity" value={form.rarity} onChange={handleChange}>
          {RARITIES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {errors.rarity && <span className="field-error">{errors.rarity}</span>}
      </label>

      <label>
        Precio
        <input type="number" name="price" min="0" step="1" value={form.price} onChange={handleChange} />
        {errors.price && <span className="field-error">{errors.price}</span>}
      </label>

      <label>
        Stock
        <input type="number" name="stock" min="0" step="1" value={form.stock} onChange={handleChange} />
        {errors.stock && <span className="field-error">{errors.stock}</span>}
      </label>

      <label>
        Descripción
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </label>

      <label>
        Imagen (ruta local u URL, opcional)
        <input
          name="image"
          placeholder="/images/cartas-tcg/pokemon/nombre-carta.jpg"
          value={form.image}
          onChange={handleChange}
        />
      </label>

      <div className="admin-form-actions">
        <button type="button" className="btn btn-ghost" onClick={() => navigate("/admin/cartas")}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
