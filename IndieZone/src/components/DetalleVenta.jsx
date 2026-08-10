function DetalleVenta({ setPagina }) {

  // =========================================================
  // DATOS TEMPORALES
  // Luego vendrán desde FastAPI
  // =========================================================

  const productos = [
    {
      id_producto: 1,
      nombre_producto: "Hollow Knight"
    },
    {
      id_producto: 2,
      nombre_producto: "Celeste"
    },
    {
      id_producto: 3,
      nombre_producto: "Stardew Valley"
    }
  ];


  // =========================================================
  // DETALLE TEMPORAL
  // Campos iguales a la tabla detalle_venta
  // =========================================================

  const detalles = [
    {
      id_venta: 10,
      id_producto: 1,
      nombre_producto: "Hollow Knight",
      cantidad: 2,
      precio_unitario: "40.90",
      subtotal: "81.80"
    },
    {
      id_venta: 10,
      id_producto: 2,
      nombre_producto: "Celeste",
      cantidad: 1,
      precio_unitario: "39.10",
      subtotal: "39.10"
    }
  ];


  return (
    <div className="container-fluid p-0">

      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="row align-items-center g-3 mb-4">

        <div className="col">

          <h1 className="fw-bold display-6 mb-1">
            Detalle de Venta
          </h1>

          <p className="text-secondary fs-5 mb-0">
            Productos asociados a la venta
          </p>

        </div>


        <div className="col-12 col-sm-auto">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setPagina("ventas")}
          >
            ← Volver a Ventas
          </button>

        </div>

      </div>


      {/* =====================================================
          RESUMEN DE LA VENTA
      ===================================================== */}

      <div className="row g-3 mb-4">

        <div className="col-12 col-md-4">

          <div className="card border-0 shadow-sm bg-primary-subtle h-100">

            <div className="card-body d-flex align-items-center gap-3">

              <span className="fs-2">
                🧾
              </span>

              <div>

                <small className="text-secondary">
                  Venta
                </small>

                <h3 className="fw-bold mb-0">
                  #10
                </h3>

              </div>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-4">

          <div className="card border-0 shadow-sm bg-info-subtle h-100">

            <div className="card-body d-flex align-items-center gap-3">

              <span className="fs-2">
                👤
              </span>

              <div>

                <small className="text-secondary">
                  Cliente
                </small>

                <h5 className="fw-bold mb-0">
                  Carlos Ramírez
                </h5>

              </div>

            </div>

          </div>

        </div>


        <div className="col-12 col-md-4">

          <div className="card border-0 shadow-sm bg-success-subtle h-100">

            <div className="card-body d-flex align-items-center gap-3">

              <span className="fs-2">
                💰
              </span>

              <div>

                <small className="text-secondary">
                  Total de venta
                </small>

                <h3 className="fw-bold mb-0">
                  S/. 120.90
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div className="row g-4">

        {/* ===================================================
            AGREGAR PRODUCTO A LA VENTA
        =================================================== */}

        <div className="col-12 col-lg-4">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-header bg-warning-subtle border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  🎮
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Agregar producto
                  </h4>

                  <small className="text-secondary">
                    Añade un producto a la venta
                  </small>

                </div>

              </div>

            </div>


            <div className="card-body p-4">

              <form>

                {/* PRODUCTO */}

                <div className="mb-3">

                  <label
                    htmlFor="id_producto"
                    className="form-label fw-semibold"
                  >
                    Producto *
                  </label>

                  <select
                    className="form-select"
                    id="id_producto"
                    name="id_producto"
                    required
                  >

                    <option value="">
                      Seleccionar producto
                    </option>

                    {productos.map((producto) => (

                      <option
                        key={producto.id_producto}
                        value={producto.id_producto}
                      >
                        {producto.nombre_producto}
                      </option>

                    ))}

                  </select>

                </div>


                {/* CANTIDAD */}

                <div className="mb-3">

                  <label
                    htmlFor="cantidad"
                    className="form-label fw-semibold"
                  >
                    Cantidad *
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    id="cantidad"
                    name="cantidad"
                    min="1"
                    placeholder="Ej. 2"
                    required
                  />

                </div>


                {/* PRECIO UNITARIO */}

                <div className="mb-3">

                  <label
                    htmlFor="precio_unitario"
                    className="form-label fw-semibold"
                  >
                    Precio unitario *
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      S/.
                    </span>

                    <input
                      type="number"
                      className="form-control"
                      id="precio_unitario"
                      name="precio_unitario"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />

                  </div>

                </div>


                {/* SUBTOTAL */}

                <div className="mb-4">

                  <label
                    htmlFor="subtotal"
                    className="form-label fw-semibold"
                  >
                    Subtotal *
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      S/.
                    </span>

                    <input
                      type="number"
                      className="form-control"
                      id="subtotal"
                      name="subtotal"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />

                  </div>

                  <div className="form-text">
                    Luego podremos calcularlo automáticamente.
                  </div>

                </div>


                <div className="d-grid">

                  <button
                    type="submit"
                    className="btn btn-warning"
                  >
                    + Agregar producto
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>


        {/* ===================================================
            TABLA DETALLE DE VENTA
        =================================================== */}

        <div className="col-12 col-lg-8">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-header bg-white border-0 p-4">

              <div className="row align-items-center g-3">

                <div className="col">

                  <div className="d-flex align-items-center gap-3">

                    <span className="fs-2">
                      📦
                    </span>

                    <div>

                      <h4 className="fw-bold mb-1">
                        Productos de la venta
                      </h4>

                      <small className="text-secondary">
                        Detalle de los productos registrados
                      </small>

                    </div>

                  </div>

                </div>


                <div className="col-12 col-sm-auto">

                  <span className="badge bg-primary-subtle text-primary fs-6">

                    {detalles.length} productos

                  </span>

                </div>

              </div>

            </div>


            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>

                      <th>
                        Producto
                      </th>

                      <th className="text-center">
                        Cantidad
                      </th>

                      <th>
                        Precio unitario
                      </th>

                      <th>
                        Subtotal
                      </th>

                      <th className="text-center">
                        Acción
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {detalles.map((detalle) => (

                      <tr
                        key={`${detalle.id_venta}-${detalle.id_producto}`}
                      >

                        <td>

                          <div className="fw-semibold">
                            {detalle.nombre_producto}
                          </div>

                          <small className="text-secondary">
                            Producto #{detalle.id_producto}
                          </small>

                        </td>


                        <td className="text-center">

                          <span className="badge text-bg-light fs-6">

                            {detalle.cantidad}

                          </span>

                        </td>


                        <td>

                          S/. {detalle.precio_unitario}

                        </td>


                        <td className="fw-bold text-success">

                          S/. {detalle.subtotal}

                        </td>


                        <td className="text-center">

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                          >
                            🗑️ Eliminar
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>


            {/* TOTAL */}

            <div className="card-footer bg-white border-0 p-4">

              <div className="d-flex justify-content-end">

                <div className="text-end">

                  <small className="text-secondary d-block">
                    Total de la venta
                  </small>

                  <span className="fs-3 fw-bold text-success">
                    S/. 120.90
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DetalleVenta;