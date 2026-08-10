import { useState } from "react";
function Oferta() {

  // =========================================================
  // FORMULARIO
  // =========================================================

  const [oferta, setOferta] = useState({
    nombre: "",
    porcentaje_descuento: "",
    fecha_inicio: "",
    fecha_fin: ""
  });

  // =========================================================
  // DATOS TEMPORALES
  // Después vienen desde FastAPI
  // =========================================================

  const ofertas = [

    {
      id: 1,
      nombre: "Oferta Indie",
      porcentaje: 10,
      inicio: "01/08/2026",
      fin: "15/08/2026"
    },

    {
      id: 2,
      nombre: "Oferta Gamer",
      porcentaje: 15,
      inicio: "10/08/2026",
      fin: "31/08/2026"
    }

  ];

  // =========================================================
  // CAMBIAR DATOS
  // =========================================================
  const cambiarDato = (e) => {

    setOferta({
      ...oferta,
      [e.target.name]: e.target.value
    });

  };

  // =========================================================
  // GUARDAR
  // =========================================================

  const guardarOferta = (e) => {

    e.preventDefault();
    console.log(oferta);
    alert("Oferta registrada correctamente");

  };

  return (

    <div className="container-fluid p-0">

      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="mb-4">

        <h1 className="fw-bold display-6 mb-1">
          Gestión de Ofertas
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Administra las promociones y descuentos
        </p>

      </div>

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div className="row g-4">

        {/* ===================================================
            FORMULARIO
        =================================================== */}

        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-success-subtle border-0 p-4">
              <div className="d-flex align-items-center gap-3">
                <span className="fs-3">
                  💲
                </span>
                <div>

                  <h4 className="fw-bold mb-1">
                    Nueva oferta
                  </h4>
                  <small className="text-secondary">
                    Crea una promoción
                  </small>
                </div>
              </div>
            </div>


            <div className="card-body p-4">

              <form onSubmit={guardarOferta}>

                {/* NOMBRE */}

                <div className="mb-3">
                  <label
                    htmlFor="nombreOferta"
                    className="form-label fw-semibold"
                  >
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombreOferta"
                    name="nombre"
                    placeholder="Ej. Oferta de verano"
                    value={oferta.nombre}
                    onChange={cambiarDato}
                    required
                  />
                </div>


                {/* DESCUENTO */}
                <div className="mb-3">

                  <label
                    htmlFor="porcentaje"
                    className="form-label fw-semibold"
                  >
                    Descuento *
                  </label>
                  <div className="input-group">

                    <input
                      type="number"
                      className="form-control"
                      id="porcentaje"
                      name="porcentaje_descuento"
                      placeholder="10"
                      min="1"
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

                {/* FECHA INICIO */}

                <div className="mb-3">
                  <label
                    htmlFor="fechaInicio"
                    className="form-label fw-semibold"
                  >
                    Fecha de inicio *
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    id="fechaInicio"
                    name="fecha_inicio"
                    value={oferta.fecha_inicio}
                    onChange={cambiarDato}
                    required
                  />
                </div>

                {/* FECHA FIN */}

                <div className="mb-4">

                  <label
                    htmlFor="fechaFin"
                    className="form-label fw-semibold"
                  >
                    Fecha de finalización *
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    id="fechaFin"
                    name="fecha_fin"
                    value={oferta.fecha_fin}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* BOTÓN */}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    + Registrar oferta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ===================================================
            OFERTAS REGISTRADAS
        =================================================== */}

        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-0 p-4">
              <div className="d-flex align-items-center gap-3">
                <span className="fs-3">
                  🏷️
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Ofertas registradas
                  </h4>

                  <small className="text-secondary">
                    Total: {ofertas.length} ofertas
                  </small>
                </div>
              </div>
            </div>

            <div className="card-body pt-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>

                      <th>ID</th>

                      <th>Oferta</th>

                      <th>Descuento</th>

                      <th>Inicio</th>

                      <th>Finalización</th>

                      <th className="text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {ofertas.map((item) => (
                      <tr key={item.id}>

                        <td className="text-secondary">
                          #{item.id}
                        </td>

                        <td className="fw-semibold">
                          {item.nombre}
                        </td>

                        <td>

                          <span className="badge bg-success-subtle text-success border border-success-subtle fs-6">

                            {item.porcentaje}%

                          </span>

                        </td>

                        <td>
                          {item.inicio}
                        </td>

                        <td>
                          {item.fin}
                        </td>

                        <td>

                          <div className="d-flex justify-content-center gap-2">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                            >
                              ✏️ Editar
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
export default Oferta;