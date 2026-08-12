import { useEffect, useState } from "react";
import api from "../../api/api";
import Alerta from "../../components/utils/Alerta";
import "./cliente.css";

function Cliente() {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    telefono: "",
    fecha_registro: ""
  });

  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Obtener clientes
  const cargarClientes = async () => {
    setCargando(true);

    try {
      const respuesta = await api.get("/clientes/");
      setClientes(respuesta.data);

    } catch (error) {
      console.error(error);

      setClientes([]);

      setAlerta({
        tipo: "danger",
        mensaje: "No se pudo obtener la información de clientes."
      });

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  // Cambiar campos
  const cambiarDato = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setCliente({
      nombre: "",
      apellido: "",
      dni: "",
      correo: "",
      telefono: "",
      fecha_registro: ""
    });

    setClienteEditando(null);
  };

  // Obtener error del backend
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

  // Guardar o editar cliente
  const guardarCliente = async (e) => {
    e.preventDefault();

    try {
      if (clienteEditando !== null) {
        await api.put(
          `/clientes/${clienteEditando}`,
          cliente
        );

        setAlerta({
          tipo: "success",
          mensaje: "Cliente actualizado correctamente."
        });

      } else {
        await api.post(
          "/clientes/",
          cliente
        );

        setAlerta({
          tipo: "success",
          mensaje: "Cliente registrado correctamente."
        });
      }

      limpiarFormulario();
      await cargarClientes();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
  };

  // Editar cliente
  const editarCliente = (item) => {
    setCliente({
      nombre: item.nombre,
      apellido: item.apellido,
      dni: item.dni,
      correo: item.correo,
      telefono: item.telefono,
      fecha_registro: item.fecha_registro
    });

    setClienteEditando(item.id_cliente);

    setAlerta({
      tipo: "info",
      mensaje: "Puedes modificar los datos del cliente."
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Eliminar cliente
  const eliminarCliente = async (idCliente) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este cliente?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(
        `/clientes/${idCliente}`
      );

      setAlerta({
        tipo: "success",
        mensaje: "Cliente eliminado correctamente."
      });

      await cargarClientes();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
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

  // Buscar clientes
  const clientesFiltrados = clientes.filter((item) => {
    const texto = busqueda.toLowerCase();

    return (
      item.nombre.toLowerCase().includes(texto) ||
      item.apellido.toLowerCase().includes(texto) ||
      item.correo.toLowerCase().includes(texto) ||
      item.dni.includes(texto)
    );
  });

  return (
    <div className="container-fluid p-0">

      {/* Título */}
      <div className="mb-4">

        <h1 className="fw-bold display-6 mb-1">
          Gestión de Clientes
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Registra y administra los clientes de IndieZone
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

      <div className="row g-4">

        {/* Formulario */}
        <div className="col-12 col-lg-4">

          <div className="card cliente-card border-0 shadow-sm rounded-4">

            <div
              className={
                clienteEditando
                  ? "card-header bg-warning-subtle border-0 p-4"
                  : "card-header bg-primary-subtle border-0 p-4"
              }
            >

              <div className="d-flex align-items-center gap-3">

                <div className="cliente-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    👤
                  </span>
                </div>

                <div>

                  <h4 className="fw-bold mb-1">
                    {clienteEditando
                      ? "Editar cliente"
                      : "Nuevo cliente"}
                  </h4>

                  <small className="text-secondary">
                    {clienteEditando
                      ? "Modifica los datos"
                      : "Completa los datos del cliente"}
                  </small>

                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <form onSubmit={guardarCliente}>

                {/* Nombre */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ej. Carlos"
                    maxLength="50"
                    value={cliente.nombre}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Apellido */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Apellido *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    placeholder="Ej. Ramírez"
                    maxLength="50"
                    value={cliente.apellido}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* DNI */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    DNI *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="dni"
                    placeholder="Ej. 12345678"
                    maxLength="8"
                    pattern="[0-9]{8}"
                    value={cliente.dni}
                    onChange={cambiarDato}
                    required
                  />

                  <div className="form-text">
                    Debe contener exactamente 8 números.
                  </div>

                </div>

                {/* Correo */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Correo *
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    placeholder="Ej. cliente@gmail.com"
                    maxLength="100"
                    value={cliente.correo}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Teléfono */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Teléfono *
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    name="telefono"
                    placeholder="Ej. 987654321"
                    maxLength="15"
                    value={cliente.telefono}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Fecha */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Fecha de registro *
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="fecha_registro"
                    value={cliente.fecha_registro}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Botones */}
                <div className="d-grid gap-2">

                  <button
                    type="submit"
                    className={
                      clienteEditando
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                  >
                    {clienteEditando
                      ? "Guardar cambios"
                      : "Guardar cliente"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={limpiarFormulario}
                  >
                    {clienteEditando
                      ? "Cancelar edición"
                      : "Limpiar"}
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
                    Clientes registrados
                  </h4>

                  <small className="text-secondary">
                    Total: {clientes.length}
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
                      placeholder="Buscar por nombre, correo o DNI"
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
                      <th>DNI</th>
                      <th>Correo</th>
                      <th>Teléfono</th>
                      <th>Registro</th>
                      <th className="text-center">
                        Acciones
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {cargando && (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center text-secondary py-4"
                        >
                          Cargando clientes...
                        </td>
                      </tr>
                    )}

                    {!cargando &&
                      clientesFiltrados.map((item) => (

                        <tr key={item.id_cliente}>

                          <td>
                            #{item.id_cliente}
                          </td>

                          <td className="fw-semibold">
                            {item.nombre} {item.apellido}
                          </td>

                          <td>
                            {item.dni}
                          </td>

                          <td>
                            {item.correo}
                          </td>

                          <td>
                            {item.telefono}
                          </td>

                          <td>
                            {mostrarFecha(
                              item.fecha_registro
                            )}
                          </td>

                          <td>

                            <div className="d-flex justify-content-center gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  editarCliente(item)
                                }
                              >
                                ✏️ Editar
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  eliminarCliente(
                                    item.id_cliente
                                  )
                                }
                              >
                                🗑️ Eliminar
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    {!cargando &&
                      clientesFiltrados.length === 0 && (

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center text-secondary py-4"
                          >
                            {busqueda
                              ? "No se encontraron clientes."
                              : "No hay clientes registrados."}
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

export default Cliente;