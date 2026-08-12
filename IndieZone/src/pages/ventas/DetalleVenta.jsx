import { useState } from "react";
import Alerta from "../../components/utils/Alerta";
import "./detalleVenta.css";

function DetalleVenta({ setPagina }) {
  const [detalle, setDetalle] = useState({
    id_producto: "",
    cantidad: "",
    precio_unitario: "",
    subtotal: ""
  });

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Datos temporales
  const productos = [
    {
      id_producto: 1,
      nombre_producto: "Hollow Knight",
      precio: "40.90"
    },
    {
      id_producto: 2,
      nombre_producto: "Celeste",
      precio: "50.90"
    },
    {
      id_producto: 3,
      nombre_producto: "Stardew Valley",
      precio: "30.50"
    }
  ];

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
      id_producto: 3,
      nombre_producto: "Stardew Valley",
      cantidad: 1,
      precio_unitario: "39.10",
      subtotal: "39.10"
    }
  ];

  const cambiarDato = (e) => {
    setDetalle({
      ...detalle,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setDetalle({
      id_producto: "",
      cantidad: "",
      precio_unitario: "",
      subtotal: ""
    });

    setAlerta({
      tipo: "",
      mensaje: ""
    });
  };

  const guardarDetalle = (e) => {
    e.preventDefault();

    // Luego aquí irá el POST al backend
    console.log(detalle);

    setAlerta({
      tipo: "success",
      mensaje: "Detalle preparado correctamente."
    });
  };

  return (
    <div className="container-fluid p-0">

      {/* Título */}
      <div className="row align-items-center g-3 mb-4">

        <div className="col">
          <h1 className="fw-bold display-6 mb-1">
            Detalle de Venta
          </h1>

          <p className="text-secondary fs-5 mb-0">
            Productos incluidos en la venta
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

      {/* Alerta */}
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        cerrar={() =>
          setAlerta({
            tipo: "",
            mensaje: ""
          })
        }
      />

      {/* Resumen */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm bg-primary-subtle rounded-4 h-100">
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
          <div className="card border-0 shadow-sm bg-info-subtle rounded-4 h-100">
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
          <div className="card border-0 shadow-sm bg-success-subtle rounded-4 h-100">
            <div className="card-body d-flex align-items-center gap-3">

              <span className="fs-2">
                💰
              </span>

              <div>
                <small className="text-secondary">
                  Total
                </small>

                <h3 className="fw-bold mb-0">
                  S/. 120.90
                </h3>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div className="row g-4">

        {/* Formulario */}
        <div className="col-12 col-lg-4">

          <div className="card detalle-card border-0 shadow-sm rounded-4">

            <div className="card-header bg-warning-subtle border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="detalle-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🎮
                  </span>
                </div>

                <div>
                  <h4 className="fw-bold mb-1">
                    Agregar producto
                  </h4>

                  <small className="text-secondary">
                    Completa los datos del detalle
                  </small>
                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <form onSubmit={guardarDetalle}>

                {/* Producto */}
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
                    value={detalle.id_producto}
                    onChange={cambiarDato}
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

                {/* Cantidad */}
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
                    placeholder="Ej. 2"
                    min="1"
                    value={detalle.cantidad}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Precio */}
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
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={detalle.precio_unitario}
                      onChange={cambiarDato}
                      required
                    />

                  </div>

                </div>

                {/* Subtotal */}
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
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={detalle.subtotal}
                      onChange={cambiarDato}
                      required
                    />

                  </div>

                </div>

                {/* Botones */}
                <div className="d-grid gap-2">

                  <button
                    type="submit"
                    className="btn btn-warning"
                  >
                    Agregar producto
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={limpiarFormulario}
                  >
                    Limpiar
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* Tabla */}
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
                        Detalle de productos registrados
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
                      <th>Producto</th>
                      <th className="text-center">
                        Cantidad
                      </th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                      <th className="text-center">
                        Acción
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {detalles.map((item) => (

                      <tr
                        key={`${item.id_venta}-${item.id_producto}`}
                      >

                        <td>
                          <div className="fw-semibold">
                            {item.nombre_producto}
                          </div>

                          <small className="text-secondary">
                            Producto #{item.id_producto}
                          </small>
                        </td>

                        <td className="text-center">
                          {item.cantidad}
                        </td>

                        <td>
                          S/. {item.precio_unitario}
                        </td>

                        <td className="fw-semibold text-success">
                          S/. {item.subtotal}
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

            {/* Total */}
            <div className="card-footer bg-white border-0 p-4">

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
  );
}
export default DetalleVenta;