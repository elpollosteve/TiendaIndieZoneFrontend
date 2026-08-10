function Navbar({
  pagina,
  setPagina,
  setSesionIniciada
}) {

  // ==========================================
  // CAMBIAR DE PÁGINA
  // ==========================================
  const cambiarPagina = (nuevaPagina) => {
    setPagina(nuevaPagina);
  };

  // ==========================================
  // CERRAR SESIÓN
  // ==========================================
  const cerrarSesion = () => {
    setPagina("dashboard");
    setSesionIniciada(false);
  };
  return (

    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">

      <div className="container-fluid px-3 px-lg-5 py-2">


        {/* =====================================
            LOGO
        ===================================== */}
        <button
          type="button"
          className="navbar-brand btn border-0 d-flex align-items-center gap-2 me-4"
          onClick={() => cambiarPagina("dashboard")}
        >
          <span className="fs-2">
            🎮
          </span>
          <span className="fs-4 fw-bold text-dark">
            Indie
            <span className="text-primary">
              Zone
            </span>
          </span>

        </button>

        {/* =====================================
            BOTÓN HAMBURGUESA
        ===================================== */}
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

        {/* =====================================
            CONTENIDO DEL MENÚ
        ===================================== */}

        <div
          className="collapse navbar-collapse"
          id="menuIndieZone"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-1">
            {/* DASHBOARD */}
            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "dashboard"
                    ? "btn btn-primary px-3 py-2 fw-semibold"
                    : "btn btn-light px-3 py-2"
                }
                onClick={() => cambiarPagina("dashboard")}
              >
                🏠 Dashboard
              </button>

            </li>
            {/* PRODUCTO */}

            <li className="nav-item">

              <button
                type="button"
                className={
                  pagina === "producto"
                    ? "btn btn-primary px-3 py-2 fw-semibold"
                    : "btn btn-light px-3 py-2"
                }
                onClick={() => cambiarPagina("producto")}
              >
                📦 Producto
              </button>

            </li>
            {/* CATEGORÍA */}

            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "categoria"
                    ? "btn btn-primary px-3 py-2 fw-semibold"
                    : "btn btn-light px-3 py-2"
                }
                onClick={() => cambiarPagina("categoria")}
              >
                🏷️ Categoría
              </button>

            </li>

            {/* OFERTA */}
            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "oferta"
                    ? "btn btn-primary px-3 py-2 fw-semibold"
                    : "btn btn-light px-3 py-2"
                }
                onClick={() => cambiarPagina("oferta")}
              >
                💲 Oferta
              </button>

            </li>

            {/* VENTAS */}
            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "ventas"
                    ? "btn btn-primary px-3 py-2 fw-semibold"
                    : "btn btn-light px-3 py-2"
                }
                onClick={() => cambiarPagina("ventas")}
              >
                🛒 Ventas
              </button>
            </li>

            {/* CLIENTE */}
            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "cliente"
                    ? "btn btn-primary px-3 py-2 fw-semibold"
                    : "btn btn-light px-3 py-2"
                }
                onClick={() => cambiarPagina("cliente")}
              >
                👤 Cliente
              </button>

            </li>

            {/* REPORTES */}
            <li className="nav-item">
              <button
                type="button"
                className={
                  pagina === "reportes"
                    ? "btn btn-primary px-3 py-2 fw-semibold"
                    : "btn btn-light px-3 py-2"
                }
                onClick={() => cambiarPagina("reportes")}
              >
                📊 Reportes
              </button>
            </li>
          </ul>

          {/* =====================================
              CERRAR SESIÓN
          ===================================== */}
          <div className="d-grid d-lg-block mt-3 mt-lg-0">
            <button
              type="button"
              className="btn btn-outline-danger px-3 py-2"
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