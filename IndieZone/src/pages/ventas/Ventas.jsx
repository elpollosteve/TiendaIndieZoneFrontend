import { useEffect, useState } from "react";
import api from "../../api/api";
import Alerta from "../../components/utils/Alerta";
import "./ventas.css";

function Ventas({ setPagina, setVentaSeleccionada }) {
  const [venta, setVenta] = useState({
    fecha_venta: "",
    total_venta: "",
    id_cliente: ""
  });

  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Obtener datos
  const cargarDatos = async () => {
    setCargando(true);

    try {
      const [
        respuestaVentas,
        respuestaClientes
      ] = await Promise.all([
        api.get("/ventas/"),
        api.get("/clientes/")
      ]);

      setVentas(respuestaVentas.data);
      setClientes(respuestaClientes.data);

    } catch (error) {
      console.error(error);

      setVentas([]);
      setClientes([]);

      setAlerta({
        tipo: "danger",
        mensaje: "No se pudo obtener la información de ventas."
      });

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Cambiar campos
  const cambiarDato = (e) => {
    setVenta({
      ...venta,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setVenta({
      fecha_venta: "",
      total_venta: "",
      id_cliente: ""
    });
  };

  // Error del backend
  const obtenerMensajeError = (error) => {
    const detalle = error.response?.data?.detail;

    if (typeof detalle === "string") {
      return detalle;
    }

    if (Array.isArray(detalle) && detalle.length > 0) {
      return detalle[0].msg.replace("Value error, ", "");
    }

    return "No se pudo completar la operación.";
  };

  // Registrar venta
  const guardarVenta = async (e) => {
    e.preventDefault();

    const datos = {
      fecha_venta: venta.fecha_venta,
      total_venta: Number(venta.total_venta),
      id_cliente: Number(venta.id_cliente)
    };

    try {
      await api.post(
        "/ventas/",
        datos
      );

      setAlerta({
        tipo: "success",
        mensaje: "Venta registrada correctamente."
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

  // Nombre del cliente
  const obtenerCliente = (idCliente) => {
    const cliente = clientes.find(
      (item) => item.id_cliente === idCliente
    );

    if (!cliente) {
      return "Cliente no encontrado";
    }

    return `${cliente.nombre} ${cliente.apellido}`;
  };

  // Mostrar fecha
  const mostrarFecha = (fecha) => {
    if (!fecha) {
      return "-";
    }

    const partes = fecha.split("-");

    if (partes.length !== 3) {
      return fecha;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  // Ver detalle
  const verDetalle = (item) => {
    setVentaSeleccionada({
      ...item,
      nombre_cliente: obtenerCliente(item.id_cliente)
    });

    setPagina("detalleVenta");
  };

  // Buscar ventas
  const ventasFiltradas = ventas.filter((item) => {
    const texto = busqueda.toLowerCase();

    const cliente = obtenerCliente(
      item.id_cliente
    ).toLowerCase();

    const total = String(
      item.total_venta
    ).toLowerCase();

    return (
      cliente.includes(texto) ||
      total.includes(texto)
    );
  });

  // Total vendido
  const totalVendido = ventas.reduce(
    (total, item) =>
      total + Number(item.total_venta),
    0
  );

  // Ventas del mes
  const fechaActual = new Date();

  const ventasMes = ventas.filter((item) => {
    const fecha = new Date(
      `${item.fecha_venta}T00:00:00`
    );

    return (
      fecha.getMonth() === fechaActual.getMonth() &&
      fecha.getFullYear() === fechaActual.getFullYear()
    );
  }).length;

  return (
    <div className="container-fluid p-0">

      {/* Título */}
      <div className="mb-4">

        <h1 className="fw-bold display-6 mb-1">
          Gestión de Ventas
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Registra y consulta las ventas de IndieZone
        </p>

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
                🛒
              </span>

              <div>

                <h3 className="fw-bold mb-0">
                  {ventas.length}
                </h3>

                <span className="text-secondary">
                  Ventas realizadas
                </span>

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

                <h3 className="fw-bold mb-0">
                  S/. {totalVendido.toFixed(2)}
                </h3>

                <span className="text-secondary">
                  Total vendido
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="col-12 col-md-4">

          <div className="card border-0 shadow-sm bg-warning-subtle rounded-4 h-100">

            <div className="card-body d-flex align-items-center gap-3">

              <span className="fs-2">
                📅
              </span>

              <div>

                <h3 className="fw-bold mb-0">
                  {ventasMes}
                </h3>

                <span className="text-secondary">
                  Ventas este mes
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="row g-4">

        {/* Formulario */}
        <div className="col-12 col-lg-4">

          <div className="card ventas-card border-0 shadow-sm rounded-4">

            <div className="card-header bg-success-subtle border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="ventas-icon bg-white rounded-circle d-flex align-items-center justify-content-center">

                  <span className="fs-2">
                    🧾
                  </span>

                </div>

                <div>

                  <h4 className="fw-bold mb-1">
                    Nueva venta
                  </h4>

                  <small className="text-secondary">
                    Completa los datos de la venta
                  </small>

                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <form onSubmit={guardarVenta}>

                {/* Cliente */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Cliente *
                  </label>

                  <select
                    className="form-select"
                    name="id_cliente"
                    value={venta.id_cliente}
                    onChange={cambiarDato}
                    required
                  >

                    <option value="">
                      Seleccionar cliente
                    </option>

                    {clientes.map((cliente) => (

                      <option
                        key={cliente.id_cliente}
                        value={cliente.id_cliente}
                      >
                        {cliente.nombre} {cliente.apellido}
                      </option>

                    ))}

                  </select>

                </div>

                {/* Fecha */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Fecha de venta *
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="fecha_venta"
                    value={venta.fecha_venta}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Total */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Total de venta *
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      S/.
                    </span>

                    <input
                      type="number"
                      className="form-control"
                      name="total_venta"
                      placeholder="Ej. 120.90"
                      min="0.01"
                      step="0.01"
                      value={venta.total_venta}
                      onChange={cambiarDato}
                      required
                    />

                  </div>

                </div>

                {/* Botones */}
                <div className="d-grid gap-2">

                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    Guardar venta
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

              <div className="row align-items-center g-3">

                <div className="col">

                  <h4 className="fw-bold mb-1">
                    Ventas registradas
                  </h4>

                  <small className="text-secondary">
                    Total: {ventas.length}
                  </small>

                </div>

                {/* Buscar */}
                <div className="col-12 col-md-6">

                  <div className="input-group">

                    <span className="input-group-text">
                      🔍
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar por cliente o precio"
                      value={busqueda}
                      onChange={(e) =>
                        setBusqueda(e.target.value)
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Total</th>

                      <th className="text-center">
                        Acción
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {/* Cargando */}
                    {cargando && (

                      <tr>

                        <td
                          colSpan="5"
                          className="text-center text-secondary py-4"
                        >
                          Cargando ventas...
                        </td>

                      </tr>

                    )}

                    {/* Ventas */}
                    {!cargando &&
                      ventasFiltradas.map((item) => (

                        <tr key={item.id_venta}>

                          <td>
                            #{item.id_venta}
                          </td>

                          <td className="fw-semibold">
                            {obtenerCliente(
                              item.id_cliente
                            )}
                          </td>

                          <td>
                            {mostrarFecha(
                              item.fecha_venta
                            )}
                          </td>

                          <td>

                            <span className="badge bg-success-subtle text-success fs-6">
                              S/. {Number(
                                item.total_venta
                              ).toFixed(2)}
                            </span>

                          </td>

                          <td className="text-center">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                verDetalle(item)
                              }
                            >
                              👁 Ver detalle
                            </button>

                          </td>

                        </tr>

                      ))}

                    {/* Sin resultados */}
                    {!cargando &&
                      ventasFiltradas.length === 0 && (

                        <tr>

                          <td
                            colSpan="5"
                            className="text-center text-secondary py-4"
                          >
                            {busqueda
                              ? "No se encontraron ventas."
                              : "No hay ventas registradas."}
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

export default Ventas;