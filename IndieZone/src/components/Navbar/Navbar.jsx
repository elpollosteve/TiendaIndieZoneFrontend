import "./navbar.css";

function Navbar({ pagina, setPagina, setSesionIniciada }) {
  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };
  const cerrarSesion = () => {
    setPagina("dashboard");
    setSesionIniciada(false);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid px-3 px-lg-5 py-2">

        {/* Logo */}
        <button
          type="button"
          className="navbar-brand btn border-0 d-flex align-items-center gap-2 me-4"
          onClick={() => cambiarPagina("dashboard")}
        >
          <img
            src="/logo_pagina.png"
            alt="Logo IndieZone"
            className="navbar-logo"
          />

          <span className="fs-4 fw-bold text-dark">
            Indie<span className="text-primary">Zone</span>
          </span>
        </button>

        {/* Menú hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuIndieZone"
          aria-controls="menuIndieZone"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Opciones */}
        <div
          className="collapse navbar-collapse"
          id="menuIndieZone"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "dashboard"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => cambiarPagina("dashboard")}
              >
                🏠 Dashboard
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "producto"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => cambiarPagina("producto")}
              >
                📦 Producto
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "categoria"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => cambiarPagina("categoria")}
              >
                🏷️ Categoría
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "oferta"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => cambiarPagina("oferta")}
              >
                💲 Oferta
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "ventas"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => cambiarPagina("ventas")}
              >
                🛒 Ventas
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "cliente"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => cambiarPagina("cliente")}
              >
                👤 Cliente
              </button>
            </li>

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "reportes"
                    ? "btn btn-primary"
                    : "btn btn-light"
                }
                onClick={() => cambiarPagina("reportes")}
              >
                📊 Reportes
              </button>
            </li>
          </ul>

          {/* Cerrar sesión */}
          <div className="d-grid d-lg-block mt-3 mt-lg-0">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={cerrarSesion}
            >
              ↪ Cerrar sesión
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
export default Navbar;