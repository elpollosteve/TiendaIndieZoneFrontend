import { useEffect, useState } from "react";
import api from "../../api/api";
import Alerta from "../../components/utils/Alerta";
import "./detalleVenta.css";

function DetalleVenta({
  setPagina,
  ventaSeleccionada
}) {
  const [detalle, setDetalle] = useState({
    id_producto: "",
    cantidad: "",
    precio_unitario: "",
    subtotal: ""
  });

  const [detalles, setDetalles] = useState([]);
  const [productos, setProductos] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Obtener datos
  const cargarDatos = async () => {
    if (!ventaSeleccionada) {
      setCargando(false);
      return;
    }

    setCargando(true);

    try {
      const [
        respuestaDetalles,
        respuestaProductos
      ] = await Promise.all([
        api.get("/detalle-ventas/"),
        api.get("/productos/")
      ]);

      const detallesVenta =
        respuestaDetalles.data.filter(
          (item) =>
            item.id_venta ===
            ventaSeleccionada.id_venta
        );

      setDetalles(detallesVenta);
      setProductos(respuestaProductos.data);

    } catch (error) {
      console.error(error);

      setDetalles([]);
      setProductos([]);

      setAlerta({
        tipo: "danger",
        mensaje: "No se pudo obtener el detalle de la venta."
      });

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [ventaSeleccionada]);

  // Cambiar campos
  const cambiarDato = (e) => {
    setDetalle({
      ...detalle,
      [e.target.name]: e.target.value
    });
  };

  // Seleccionar producto
  const cambiarProducto = (e) => {
    const idProducto = e.target.value;

    const producto = productos.find(
      (item) =>
        item.id_producto === Number(idProducto)
    );

    setDetalle({
      ...detalle,
      id_producto: idProducto,
      precio_unitario: producto
        ? Number(producto.precio).toFixed(2)
        : "",
      subtotal: ""
    });
  };

  // Cambiar cantidad
  const cambiarCantidad = (e) => {
    const cantidad = e.target.value;

    const precio = Number(
      detalle.precio_unitario
    );

    const subtotal =
      cantidad && precio
        ? (
            Number(cantidad) * precio
          ).toFixed(2)
        : "";

    setDetalle({
      ...detalle,
      cantidad: cantidad,
      subtotal: subtotal
    });
  };

  // Limpiar
  const limpiarFormulario = () => {
    setDetalle({
      id_producto: "",
      cantidad: "",
      precio_unitario: "",
      subtotal: ""
    });
  };

  // Error del backend
  const obtenerMensajeError = (error) => {
    const detalleError =
      error.response?.data?.detail;

    if (typeof detalleError === "string") {
      return detalleError;
    }

    if (
      Array.isArray(detalleError) &&
      detalleError.length > 0
    ) {
      return detalleError[0].msg.replace(
        "Value error, ",
        ""
      );
    }

    return "No se pudo completar la operación.";
  };

  // Guardar detalle
  const guardarDetalle = async (e) => {
    e.preventDefault();

    if (!ventaSeleccionada) {
      return;
    }

    const datos = {
      id_venta: ventaSeleccionada.id_venta,
      id_producto: Number(
        detalle.id_producto
      ),
      cantidad: Number(
        detalle.cantidad
      ),
      precio_unitario: Number(
        detalle.precio_unitario
      ),
      subtotal: Number(
        detalle.subtotal
      )
    };

    try {
      await api.post(
        "/detalle-ventas/",
        datos
      );

      setAlerta({
        tipo: "success",
        mensaje: "Producto agregado a la venta correctamente."
      });

      limpiarFormulario();
      await cargarDatos();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
  };

  // Nombre del producto
  const obtenerProducto = (idProducto) => {
    const producto = productos.find(
      (item) =>
        item.id_producto === idProducto
    );

    return producto
      ? producto.nombre_producto
      : "Producto no encontrado";
  };

  // Sin venta seleccionada
  if (!ventaSeleccionada) {
    return (
      <div className="container-fluid p-0">

        <div className="alert alert-warning">
          No hay una venta seleccionada.
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            setPagina("ventas")
          }
        >
          ← Volver a Ventas
        </button>

      </div>
    );
  }

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
            onClick={() =>
              setPagina("ventas")
            }
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
                  #{ventaSeleccionada.id_venta}
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
                  {ventaSeleccionada.nombre_cliente}
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
                  S/. {Number(
                    ventaSeleccionada.total_venta
                  ).toFixed(2)}
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

                  <label className="form-label fw-semibold">
                    Producto *
                  </label>

                  <select
                    className="form-select"
                    name="id_producto"
                    value={detalle.id_producto}
                    onChange={cambiarProducto}
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

                  <label className="form-label fw-semibold">
                    Cantidad *
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="cantidad"
                    placeholder="Ej. 2"
                    min="1"
                    value={detalle.cantidad}
                    onChange={cambiarCantidad}
                    required
                  />

                </div>

                {/* Precio */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Precio unitario
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      S/.
                    </span>

                    <input
                      type="number"
                      className="form-control"
                      name="precio_unitario"
                      value={detalle.precio_unitario}
                      onChange={cambiarDato}
                      readOnly
                    />

                  </div>

                </div>

                {/* Subtotal */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Subtotal
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      S/.
                    </span>

                    <input
                      type="number"
                      className="form-control"
                      name="subtotal"
                      value={detalle.subtotal}
                      onChange={cambiarDato}
                      readOnly
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

        {/* Lista */}
        <div className="col-12 col-lg-8">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-header bg-white border-0 p-4">

              <h4 className="fw-bold mb-1">
                Productos de la venta
              </h4>

              <small className="text-secondary">
                Total: {detalles.length}
              </small>

            </div>

            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                    </tr>

                  </thead>

                  <tbody>

                    {/* Cargando */}
                    {cargando && (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center text-secondary py-4"
                        >
                          Cargando detalle...
                        </td>

                      </tr>

                    )}

                    {/* Detalles */}
                    {!cargando &&
                      detalles.map((item) => (

                        <tr
                          key={`${item.id_venta}-${item.id_producto}`}
                        >

                          <td className="fw-semibold">
                            {obtenerProducto(
                              item.id_producto
                            )}
                          </td>

                          <td>
                            {item.cantidad}
                          </td>

                          <td>
                            S/. {Number(
                              item.precio_unitario
                            ).toFixed(2)}
                          </td>

                          <td className="fw-semibold text-success">
                            S/. {Number(
                              item.subtotal
                            ).toFixed(2)}
                          </td>

                        </tr>

                      ))}

                    {/* Sin datos */}
                    {!cargando &&
                      detalles.length === 0 && (

                        <tr>

                          <td
                            colSpan="4"
                            className="text-center text-secondary py-4"
                          >
                            Esta venta no tiene productos registrados.
                          </td>

                        </tr>

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

export default DetalleVenta;