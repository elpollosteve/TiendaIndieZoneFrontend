import { useState } from "react";
import Alerta from "../../components/utils/Alerta";
import "./oferta.css";

function Oferta() {
  const [oferta, setOferta] = useState({
    nombre: "",
    porcentaje_descuento: "",
    fecha_inicio: "",
    fecha_fin: ""
  });

  const [ofertaEditando, setOfertaEditando] = useState(null);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Datos temporales
  const [ofertas, setOfertas] = useState([
    {
      id_oferta: 1,
      nombre: "Oferta Indie",
      porcentaje_descuento: 10,
      fecha_inicio: "2026-08-01",
      fecha_fin: "2026-08-15"
    },
    {
      id_oferta: 2,
      nombre: "Oferta Gamer",
      porcentaje_descuento: 15,
      fecha_inicio: "2026-08-10",
      fecha_fin: "2026-08-31"
    }
  ]);

  const cambiarDato = (e) => {
    setOferta({
      ...oferta,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setOferta({
      nombre: "",
      porcentaje_descuento: "",
      fecha_inicio: "",
      fecha_fin: ""
    });

    setOfertaEditando(null);

    setAlerta({
      tipo: "",
      mensaje: ""
    });
  };

  const editarOferta = (item) => {
    setOferta({
      nombre: item.nombre,
      porcentaje_descuento: item.porcentaje_descuento,
      fecha_inicio: item.fecha_inicio,
      fecha_fin: item.fecha_fin
    });

    setOfertaEditando(item.id_oferta);

    setAlerta({
      tipo: "info",
      mensaje: "Puedes modificar los datos de la oferta."
    });
  };

  const guardarOferta = (e) => {
    e.preventDefault();

    if (ofertaEditando !== null) {
      const nuevasOfertas = ofertas.map((item) =>
        item.id_oferta === ofertaEditando
          ? {
              ...item,
              ...oferta
            }
          : item
      );

      setOfertas(nuevasOfertas);

      setAlerta({
        tipo: "success",
        mensaje: "Oferta actualizada correctamente."
      });

      setOferta({
        nombre: "",
        porcentaje_descuento: "",
        fecha_inicio: "",
        fecha_fin: ""
      });

      setOfertaEditando(null);

      return;
    }

    const nuevaOferta = {
      id_oferta: ofertas.length + 1,
      ...oferta
    };

    setOfertas([...ofertas, nuevaOferta]);

    setAlerta({
      tipo: "success",
      mensaje: "Oferta registrada correctamente."
    });

    setOferta({
      nombre: "",
      porcentaje_descuento: "",
      fecha_inicio: "",
      fecha_fin: ""
    });
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
                    Completa los datos de la oferta
                  </small>
                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <form onSubmit={guardarOferta}>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    maxLength="80"
                    value={oferta.nombre}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Descuento *
                  </label>

                  <div className="input-group">

                    <input
                      type="number"
                      className="form-control"
                      name="porcentaje_descuento"
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

        {/* Tabla */}
        <div className="col-12 col-lg-8">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-header bg-white border-0 p-4">
              <h4 className="fw-bold mb-1">
                Ofertas registradas
              </h4>

              <small className="text-secondary">
                Lista de promociones disponibles
              </small>
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

                    {ofertas.map((item) => (

                      <tr key={item.id_oferta}>

                        <td>
                          #{item.id_oferta}
                        </td>

                        <td className="fw-semibold">
                          {item.nombre}
                        </td>

                        <td>
                          {item.porcentaje_descuento}%
                        </td>

                        <td>
                          {mostrarFecha(item.fecha_inicio)}
                        </td>

                        <td>
                          {mostrarFecha(item.fecha_fin)}
                        </td>

                        <td className="text-center">

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editarOferta(item)}
                          >
                            ✏️ Editar
                          </button>

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

          </div>

        </div>

      </div>

    </div>
  );
}
export default Oferta;