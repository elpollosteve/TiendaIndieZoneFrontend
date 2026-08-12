import "./reportes.css";

function Reportes() {

  // Datos temporales
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

      {/* Título */}
      <div className="mb-4">
        <h1 className="fw-bold display-6 mb-1">
          Reportes
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Resumen general de IndieZone
        </p>
      </div>

      {/* Resumen */}
      <div className="row g-4 mb-4">

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card reporte-card border-0 shadow-sm bg-primary-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🎮
                  </span>
                </div>

                <div>
                  <h2 className="fw-bold mb-0">
                    28
                  </h2>

                  <span className="fw-semibold">
                    Productos
                  </span>

                  <small className="d-block text-secondary">
                    Registrados
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card reporte-card border-0 shadow-sm bg-info-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    👥
                  </span>
                </div>

                <div>
                  <h2 className="fw-bold mb-0">
                    42
                  </h2>

                  <span className="fw-semibold">
                    Clientes
                  </span>

                  <small className="d-block text-secondary">
                    Registrados
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card reporte-card border-0 shadow-sm bg-success-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🛒
                  </span>
                </div>

                <div>
                  <h2 className="fw-bold mb-0">
                    156
                  </h2>

                  <span className="fw-semibold">
                    Ventas
                  </span>

                  <small className="d-block text-secondary">
                    Realizadas
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card reporte-card border-0 shadow-sm bg-warning-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    💰
                  </span>
                </div>

                <div>
                  <h2 className="fw-bold mb-0">
                    S/. 850
                  </h2>

                  <span className="fw-semibold">
                    Ingresos
                  </span>

                  <small className="d-block text-secondary">
                    Total registrado
                  </small>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="row g-4">

        {/* Resumen general */}
        <div className="col-12 col-lg-5">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
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

        {/* Productos más vendidos */}
        <div className="col-12 col-lg-7">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  🏆
                </span>

                <div>
                  <h4 className="fw-bold mb-1">
                    Productos más vendidos
                  </h4>

                  <small className="text-secondary">
                    Productos con mayor cantidad de ventas
                  </small>
                </div>

              </div>

            </div>

            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>
                      <th>Posición</th>
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

                    {productosVendidos.map((producto, index) => (

                      <tr key={producto.nombre_producto}>

                        <td>
                          <span className="badge text-bg-light">
                            #{index + 1}
                          </span>
                        </td>

                        <td className="fw-semibold">
                          {producto.nombre_producto}
                        </td>

                        <td className="text-center">
                          {producto.cantidad}
                        </td>

                        <td className="text-end fw-semibold text-success">
                          S/. {producto.total}
                        </td>

                      </tr>

                    ))}

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