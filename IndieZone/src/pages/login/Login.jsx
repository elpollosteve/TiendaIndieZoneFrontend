import { useState } from "react";
import "./login.css";

function Login({ setSesionIniciada }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const USUARIO_VALIDO = "admin";
  const CONTRASENA_VALIDA = "admin123";

  const iniciarSesion = (e) => {
    e.preventDefault();

    if (
      usuario === USUARIO_VALIDO &&
      contrasena === CONTRASENA_VALIDA
    ) {
      setMensaje("");
      setSesionIniciada(true);
    } else {
      setMensaje("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

            <div className="card login-card border-0 shadow rounded-4">

              <div className="card-body p-4 p-md-5">

                {/* Logo */}
                <div className="text-center mb-4">

                  <div className="login-logo bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3">

                    <img
                      src="/logo_pagina.png"
                      alt="Logo IndieZone"
                      className="img-fluid"
                    />

                  </div>

                  <h1 className="fw-bold mb-1">
                    Indie
                    <span className="text-primary">
                      Zone
                    </span>
                  </h1>

                  <p className="text-secondary mb-0">
                    Sistema de gestión de tienda
                  </p>

                </div>

                {/* Error */}
                {mensaje && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {mensaje}
                  </div>
                )}

                <form onSubmit={iniciarSesion}>

                  {/* Usuario */}
                  <div className="mb-3">

                    <label
                      htmlFor="usuario"
                      className="form-label fw-semibold"
                    >
                      Usuario
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        👤
                      </span>

                      <input
                        type="text"
                        id="usuario"
                        className="form-control"
                        placeholder="Escribe tu usuario"
                        value={usuario}
                        onChange={(e) =>
                          setUsuario(e.target.value)
                        }
                        required
                      />

                    </div>

                  </div>

                  {/* Contraseña */}
                  <div className="mb-4">

                    <label
                      htmlFor="contrasena"
                      className="form-label fw-semibold"
                    >
                      Contraseña
                    </label>

                    <div className="input-group">

                      <span className="input-group-text">
                        🔒
                      </span>

                      <input
                        type="password"
                        id="contrasena"
                        className="form-control"
                        placeholder="Escribe tu contraseña"
                        value={contrasena}
                        onChange={(e) =>
                          setContrasena(e.target.value)
                        }
                        required
                      />

                    </div>

                  </div>

                  <div className="d-grid">

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                    >
                      Iniciar sesión
                    </button>

                  </div>

                </form>

                <div className="text-center mt-4">

                  <small className="text-secondary">
                    IndieZone © 2026
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;