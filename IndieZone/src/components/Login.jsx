import { useState } from "react";

function Login({ setSesionIniciada }) {

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [recordarme, setRecordarme] = useState(false);

  const [mensaje, setMensaje] = useState("");


  // =========================================================
  // INICIAR SESIÓN
  // Por ahora solo permite ingresar al sistema.
  // Luego se conectará con el backend.
  // =========================================================

  const iniciarSesion = (e) => {
    e.preventDefault();

    if (!correo || !contrasena) {
      setMensaje(
        "Completa el correo electrónico y la contraseña."
      );

      return;
    }

    setMensaje("");

    setSesionIniciada(true);
  };


  return (
    <div className="min-vh-100 bg-body-tertiary d-flex align-items-center justify-content-center">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

            <div className="card border-0 shadow rounded-4">

              <div className="card-body p-4 p-md-5">


                {/* ===========================================
                    LOGO
                =========================================== */}

                <div className="text-center mb-4">

                  <div
                    className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center p-3 mb-3"
                  >
                    <span className="fs-1 lh-1">
                      🎮
                    </span>
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


                {/* ===========================================
                    MENSAJE
                =========================================== */}

                {mensaje && (

                  <div
                    className="alert alert-warning"
                    role="alert"
                  >
                    {mensaje}
                  </div>

                )}


                {/* ===========================================
                    FORMULARIO
                =========================================== */}

                <form onSubmit={iniciarSesion}>


                  {/* CORREO */}

                  <div className="mb-3">

                    <label
                      htmlFor="correo"
                      className="form-label fw-semibold"
                    >
                      Correo electrónico
                    </label>


                    <div className="input-group">

                      <span className="input-group-text">
                        ✉️
                      </span>


                      <input
                        type="email"
                        className="form-control"
                        id="correo"
                        placeholder="admin@indiezone.com"
                        value={correo}
                        onChange={(e) =>
                          setCorreo(e.target.value)
                        }
                        required
                      />

                    </div>

                  </div>


                  {/* CONTRASEÑA */}

                  <div className="mb-3">

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
                        className="form-control"
                        id="contrasena"
                        placeholder="Escribe tu contraseña"
                        value={contrasena}
                        onChange={(e) =>
                          setContrasena(e.target.value)
                        }
                        required
                      />

                    </div>

                  </div>


                  {/* RECORDAR */}

                  <div className="form-check mb-4">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="recordarme"
                      checked={recordarme}
                      onChange={(e) =>
                        setRecordarme(e.target.checked)
                      }
                    />


                    <label
                      className="form-check-label"
                      htmlFor="recordarme"
                    >
                      Recordarme
                    </label>

                  </div>


                  {/* BOTÓN */}

                  <div className="d-grid">

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                    >
                      Iniciar sesión
                    </button>

                  </div>

                </form>


                {/* ===========================================
                    PIE
                =========================================== */}

                <div className="text-center mt-4">

                  <small className="text-secondary">
                    🎮 IndieZone
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