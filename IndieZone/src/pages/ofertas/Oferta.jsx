import { useEffect, useState } from "react";
import api from "../../api/api";
import Alerta from "../../components/utils/Alerta";
import "./oferta.css";

function Oferta() {
  const [oferta, setOferta] = useState({
    nombre: "",
    porcentaje_descuento: "",
    fecha_inicio: "",
    fecha_fin: ""
  });

  const [ofertas, setOfertas] = useState([]);
  const [ofertaEditando, setOfertaEditando] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Obtener ofertas
  const cargarOfertas = async () => {
    setCargando(true);

    try {
      const respuesta = await api.get("/ofertas/");

      setOfertas(respuesta.data);

    } catch (error) {
      console.error(error);

      setOfertas([]);

      setAlerta({
        tipo: "danger",
        mensaje: "No se pudo obtener la información de ofertas."
      });

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarOfertas();
  }, []);

  // Cambiar campos
  const cambiarDato = (e) => {
    setOferta({
      ...oferta,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setOferta({
      nombre: "",
      porcentaje_descuento: "",
      fecha_inicio: "",
      fecha_fin: ""
    });

    setOfertaEditando(null);
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

  // Guardar o editar
  const guardarOferta = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: oferta.nombre,
      porcentaje_descuento:
        Number(oferta.porcentaje_descuento),
      fecha_inicio: oferta.fecha_inicio,
      fecha_fin: oferta.fecha_fin
    };

    try {
      if (ofertaEditando !== null) {
        await api.put(
          `/ofertas/${ofertaEditando}`,
          datos
        );

        setAlerta({
          tipo: "success",
          mensaje: "Oferta actualizada correctamente."
        });

      } else {
        await api.post(
          "/ofertas/",
          datos
        );

        setAlerta({
          tipo: "success",
          mensaje: "Oferta registrada correctamente."
        });
      }

      limpiarFormulario();
      await cargarOfertas();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
  };

  // Editar
  const editarOferta = (item) => {
    setOferta({
      nombre: item.nombre,
      porcentaje_descuento:
        item.porcentaje_descuento,
      fecha_inicio: item.fecha_inicio,
      fecha_fin: item.fecha_fin
    });

    setOfertaEditando(item.id_oferta);

    setAlerta({
      tipo: "info",
      mensaje: "Puedes modificar los datos de la oferta."
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Eliminar
  const eliminarOferta = async (idOferta) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar esta oferta?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(
        `/ofertas/${idOferta}`
      );

      setAlerta({
        tipo: "success",
        mensaje: "Oferta eliminada correctamente."
      });

      await cargarOfertas();

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

  return (
    <div className="container-fluid p-0">

      {/* Título */}
      <div className="mb-4">

        <h1 className="fw-bold display-6 mb-1">
          Gestión de Ofertas
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Registra y administra las ofertas de IndieZone
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

          <div className="card oferta-card border-0 shadow-sm rounded-4">

            <div
              className={
                ofertaEditando
                  ? "card-header bg-warning-subtle border-0 p-4"
                  : "card-header bg-success-subtle border-0 p-4"
              }
            >

              <div className="d-flex align-items-center gap-3">

                <div className="oferta-icon bg-white rounded-circle d-flex align-items-center justify-content-center">

                  <span className="fs-2">
                    💲
                  </span>

                </div>

                <div>

                  <h4 className="fw-bold mb-1">

                    {ofertaEditando
                      ? "Editar oferta"
                      : "Nueva oferta"}

                  </h4>

                  <small className="text-secondary">

                    {ofertaEditando
                      ? "Modifica los datos"
                      : "Completa los datos de la oferta"}

                  </small>

                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <form onSubmit={guardarOferta}>

                {/* Nombre */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ej. Oferta Gamer"
                    maxLength="80"
                    value={oferta.nombre}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Descuento */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Porcentaje de descuento *
                  </label>

                  <div className="input-group">

                    <input
                      type="number"
                      className="form-control"
                      name="porcentaje_descuento"
                      placeholder="Ej. 15"
                      min="0"
                      max="100"
                      step="0.01"
                      value={oferta.porcentaje_descuento}
                      onChange={cambiarDato}
                      required
                    />

                    <span className="input-group-text">
                      %
                    </span>

                  </div>

                </div>

                {/* Inicio */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Fecha de inicio *
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="fecha_inicio"
                    value={oferta.fecha_inicio}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Fin */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Fecha de fin *
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="fecha_fin"
                    value={oferta.fecha_fin}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Botones */}
                <div className="d-grid gap-2">

                  <button
                    type="submit"
                    className={
                      ofertaEditando
                        ? "btn btn-warning"
                        : "btn btn-success"
                    }
                  >

                    {ofertaEditando
                      ? "Guardar cambios"
                      : "Guardar oferta"}

                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={limpiarFormulario}
                  >

                    {ofertaEditando
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

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h4 className="fw-bold mb-1">
                    Ofertas registradas
                  </h4>

                  <small className="text-secondary">
                    Total: {ofertas.length}
                  </small>

                </div>

                <span className="badge bg-success-subtle text-success fs-6">
                  {ofertas.length} ofertas
                </span>

              </div>

            </div>

            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>
                      <th>ID</th>
                      <th>Oferta</th>
                      <th>Descuento</th>
                      <th>Inicio</th>
                      <th>Fin</th>

                      <th className="text-center">
                        Acciones
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {/* Cargando */}
                    {cargando && (

                      <tr>

                        <td
                          colSpan="6"
                          className="text-center text-secondary py-4"
                        >
                          Cargando ofertas...
                        </td>

                      </tr>

                    )}

                    {/* Ofertas */}
                    {!cargando &&
                      ofertas.map((item) => (

                        <tr key={item.id_oferta}>

                          <td>
                            #{item.id_oferta}
                          </td>

                          <td className="fw-semibold">
                            {item.nombre}
                          </td>

                          <td>

                            <span className="badge bg-success-subtle text-success">
                              {item.porcentaje_descuento}%
                            </span>

                          </td>

                          <td>
                            {mostrarFecha(
                              item.fecha_inicio
                            )}
                          </td>

                          <td>
                            {mostrarFecha(
                              item.fecha_fin
                            )}
                          </td>

                          <td>

                            <div className="d-flex justify-content-center gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  editarOferta(item)
                                }
                              >
                                ✏️ Editar
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  eliminarOferta(
                                    item.id_oferta
                                  )
                                }
                              >
                                🗑️ Eliminar
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    {/* Sin datos */}
                    {!cargando &&
                      ofertas.length === 0 && (

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center text-secondary py-4"
                          >
                            No hay ofertas registradas.
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

export default Oferta;