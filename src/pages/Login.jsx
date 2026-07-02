import { useState } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/cartas" : "/catalogo"} replace />;
  }

  function validate() {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "El usuario es obligatorio.";
    if (!form.password.trim()) newErrors.password = "La contraseña es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    if (!validate()) return;

    const result = login(form.username, form.password);
    if (!result.success) {
      setFormError(result.error);
      return;
    }
    const redirectTo = location.state?.from ?? "/catalogo";
    navigate(redirectTo, { replace: true });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1>Iniciar sesión</h1>

        {formError && <p className="form-error">{formError}</p>}

        <label>
          Usuario
          <input name="username" value={form.username} onChange={handleChange} autoComplete="username" />
          {errors.username && <span className="field-error">{errors.username}</span>}
        </label>

        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <span className="field-error">{errors.password}</span>}
        </label>

        <button type="submit" className="btn btn-primary">
          Ingresar
        </button>

        <p className="auth-hint">
          Sin cuenta todavía podés{" "}
          <Link to="/catalogo">ver el catálogo</Link>.
        </p>

        <div className="demo-users">
          <p>Usuarios de prueba:</p>
          <ul>
            <li>Admin: <code>admin</code> / <code>admin123</code></li>
            <li>Cliente: <code>cliente</code> / <code>cliente123</code></li>
          </ul>
        </div>
      </form>
    </div>
  );
}
