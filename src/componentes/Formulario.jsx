import "./Formulario.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Formulario({ setUser }) {
  const [Usuario, SetUsuario] = useState("");
  const [password, Setpassword] = useState("");
  const [error, Seterror] = useState(false);
  const [error2, Seterror2] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7270/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: 0,
          email: "string",
          firstName: "string",
          lastName: "string",
          userName: Usuario,
          password: password,
          roles: "string",
        }),
      });

      if (response.status === 401) {
        Seterror2(true);
        return;
      }

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      navigate("/componentes/Home");
    } catch (error) {
      console.error("Error en fetch:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Usuario === "" || password === "") {
      Seterror(true);
      return;
    }
    Seterror(false);
    Seterror2(false);
    fetchData();
    setUser([Usuario, password]);
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ minWidth: "350px", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input
              type="text"
              id="usuario"
              className="form-control"
              placeholder="Ingrese su usuario"
              value={Usuario}
              onChange={(e) => SetUsuario(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => Setpassword(e.target.value)}
            />
          </div>

          {error && <div className="alert alert-warning p-2">Todos los campos son obligatorios</div>}
          {error2 && <div className="alert alert-danger p-2">Usuario no válido</div>}

          <div className="d-grid mt-3">
            <button className="btn btn-primary" type="submit">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Formulario;
