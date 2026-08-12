import { useState } from "react";
import Alerta from "../../components/utils/Alerta";
import "./ventas.css";

function Ventas({ setPagina }) {
  const [venta, setVenta] = useState({
    fecha_venta: "",
    total_venta: "",
    id_cliente: ""
  });

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Datos temporales
  const clientes = [
    {
      id_cliente: 1,
      nombre: "Carlos",
      apellido: "Ramírez"
    },
    {
      id_cliente: 2,
      nombre: "María",
      apellido: "Torres"
    },
    {
      id_cliente: 3,
      nombre: "Luis",
      apellido: "Fernández"
    }
  ];

  const ventas = [
    {
      id_venta: 10,
      fecha_venta: "2026-08-10",
      total_venta: "120.90",
      id_cliente: 1
    },
    {
      id_venta: 9,
      fecha_venta: "2026-08-09",
      total_venta: "85.50",
      id_cliente: 2
    },
    {
      id_venta: 8,
      fecha_venta: "2026-08-08",
      total_venta: "160.00",
      id_cliente: 3
    }
  ];

  const cambiarDato = (e) => {
    setVenta({
      ...venta,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setVenta({
      fecha_venta: "",
      total_venta: "",
      id_cliente: ""
    });

    setAlerta({
      tipo: "",
      mensaje: ""
    });
  };

  const guardarVenta = (e) => {
    e.preventDefault();

    // Luego aquí irá el POST al backend
    console.log(venta);

    setAlerta({
      tipo: "success",
      mensaje: "Venta preparada correctamente."
    });
  };

  const obtenerCliente = (idCliente) => {
    const cliente = clientes.find(
      (item) => item.id_cliente === idCliente
    );

    if (!cliente) {
      return "Cliente no encontrado";
    }

    return `${cliente.nombre} ${cliente.apellido}`;
  };

  const mostrarFecha = (fecha) => {
    if (!fecha) {
      return "-";
    }

    const partes = fecha.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

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
                  156
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
                  S/. 850.50
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
                  10
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

                  <label
                    htmlFor="id_cliente"
                    className="form-label fw-semibold"
                  >
                    Cliente *
                  </label>

                  <select
                    className="form-select"
                    id="id_cliente"
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

                  <label
                    htmlFor="fecha_venta"
                    className="form-label fw-semibold"
                  >
                    Fecha de venta *
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    id="fecha_venta"
                    name="fecha_venta"
                    value={venta.fecha_venta}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Total */}
                <div className="mb-4">

                  <label
                    htmlFor="total_venta"
                    className="form-label fw-semibold"
                  >
                    Total de venta *
                  </label>

                  <div className="input-group">

                    <span className="input-group-text">
                      S/.
                    </span>

                    <input
                      type="number"
                      className="form-control"
                      id="total_venta"
                      name="total_venta"
                      placeholder="0.00"
                      min="0"
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

        {/* Tabla */}
        <div className="col-12 col-lg-8">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-header bg-white border-0 p-4">

              <div className="row align-items-center g-3">

                <div className="col">

                  <div className="d-flex align-items-center gap-3">

                    <span className="fs-2">
                      📋
                    </span>

                    <div>
                      <h4 className="fw-bold mb-1">
                        Ventas registradas
                      </h4>

                      <small className="text-secondary">
                        Historial de ventas del sistema
                      </small>
                    </div>

                  </div>

                </div>

                <div className="col-12 col-sm-auto">

                  <span className="badge bg-success-subtle text-success fs-6">
                    {ventas.length} ventas
                  </span>

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
                        Acciones
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {ventas.map((item) => (

                      <tr key={item.id_venta}>

                        <td className="text-secondary">
                          #{item.id_venta}
                        </td>

                        <td className="fw-semibold">
                          {obtenerCliente(item.id_cliente)}
                        </td>

                        <td>
                          {mostrarFecha(item.fecha_venta)}
                        </td>

                        <td>

                          <span className="badge bg-success-subtle text-success">
                            S/. {item.total_venta}
                          </span>

                        </td>

                        <td>

                          <div className="d-flex justify-content-center gap-2">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                setPagina("detalleVenta")
                              }
                            >
                              👁 Ver detalle
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                            >
                              🗑️ Eliminar
                            </button>

                          </div>

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
export default Ventas;