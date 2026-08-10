function Reportes() {

  // =========================================================
  // DATOS TEMPORALES
  // Más adelante vendrán desde el backend
  // =========================================================

  const productosVendidos = [

    {
      nombre_producto: "Hollow Knight",
      cantidad: 18,
      total: "736.20"
    },

    {
      nombre_producto: "Celeste",
      cantidad: 14,
      total: "712.60"
    },

    {
      nombre_producto: "Stardew Valley",
      cantidad: 10,
      total: "305.00"
    },

    {
      nombre_producto: "Undertale",
      cantidad: 8,
      total: "160.00"
    }

  ];


  return (

    <div className="container-fluid p-0">


      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="mb-4">

        <h1 className="fw-bold display-6 mb-1">
          Reportes
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Consulta el resumen general de IndieZone
        </p>

      </div>


      {/* =====================================================
          TARJETAS
      ===================================================== */}

      <div className="row g-4 mb-4">


        {/* PRODUCTOS */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-primary-subtle h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  🎮
                </span>

                <div>

                  <h2 className="fw-bold mb-0">
                    28
                  </h2>

                  <div className="fw-semibold">
                    Productos
                  </div>

                  <small className="text-secondary">
                    Registrados
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* CLIENTES */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-info-subtle h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  👥
                </span>

                <div>

                  <h2 className="fw-bold mb-0">
                    42
                  </h2>

                  <div className="fw-semibold">
                    Clientes
                  </div>

                  <small className="text-secondary">
                    Registrados
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* VENTAS */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-success-subtle h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  🛒
                </span>

                <div>

                  <h2 className="fw-bold mb-0">
                    156
                  </h2>

                  <div className="fw-semibold">
                    Ventas
                  </div>

                  <small className="text-secondary">
                    Realizadas
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* INGRESOS */}

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-warning-subtle h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  💰
                </span>

                <div>

                  <h2 className="fw-bold mb-0">
                    S/. 850
                  </h2>

                  <div className="fw-semibold">
                    Ingresos
                  </div>

                  <small className="text-secondary">
                    Total registrado
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          SEGUNDA FILA
      ===================================================== */}

      <div className="row g-4">


        {/* ===================================================
            RESUMEN
        =================================================== */}

        <div className="col-12 col-lg-5">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-3">
                  📊
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Resumen general
                  </h4>

                  <small className="text-secondary">
                    Estado actual del sistema
                  </small>

                </div>

              </div>

            </div>


            <div className="card-body pt-0">

              <div className="list-group list-group-flush">


                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">

                  <span>
                    Categorías registradas
                  </span>

                  <span className="badge text-bg-primary rounded-pill">
                    3
                  </span>

                </div>


                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">

                  <span>
                    Ofertas disponibles
                  </span>

                  <span className="badge text-bg-success rounded-pill">
                    2
                  </span>

                </div>


                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">

                  <span>
                    Productos registrados
                  </span>

                  <span className="badge text-bg-info rounded-pill">
                    28
                  </span>

                </div>


                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">

                  <span>
                    Clientes registrados
                  </span>

                  <span className="badge text-bg-secondary rounded-pill">
                    42
                  </span>

                </div>


                <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">

                  <span>
                    Ventas realizadas
                  </span>

                  <span className="badge text-bg-warning rounded-pill">
                    156
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            PRODUCTOS MÁS VENDIDOS
        =================================================== */}

        <div className="col-12 col-lg-7">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-3">
                  🏆
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Productos más vendidos
                  </h4>

                  <small className="text-secondary">
                    Resumen de ventas por producto
                  </small>

                </div>

              </div>

            </div>


            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>

                      <th>Producto</th>

                      <th className="text-center">
                        Cantidad
                      </th>

                      <th className="text-end">
                        Total
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {productosVendidos.map(
                      (producto, index) => (

                        <tr key={producto.nombre_producto}>

                          <td>

                            <div className="d-flex align-items-center gap-2">

                              <span className="badge text-bg-light">

                                #{index + 1}

                              </span>

                              <span className="fw-semibold">

                                {producto.nombre_producto}

                              </span>

                            </div>

                          </td>


                          <td className="text-center">

                            {producto.cantidad}

                          </td>


                          <td className="text-end fw-semibold text-success">

                            S/. {producto.total}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reportes;