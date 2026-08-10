import { useState } from "react";
function Categoria() {

  // =========================================================
  // FORMULARIO
  // =========================================================

  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: ""
  });

  // =========================================================
  // DATOS TEMPORALES
  // Después vienen desde FastAPI
  // =========================================================

  const categorias = [

    {
      id: 1,
      nombre: "Videojuegos",
      descripcion: "Juegos disponibles para diferentes plataformas"
    },

    {
      id: 2,
      nombre: "Consolas",
      descripcion: "Consolas para videojuegos"
    },

    {
      id: 3,
      nombre: "Accesorios",
      descripcion: "Controles, audífonos y otros accesorios"
    }

  ];

  // =========================================================
  // CAMBIAR DATOS
  // =========================================================

  const cambiarDato = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  };

  // =========================================================
  // GUARDAR
  // =========================================================

  const guardarCategoria = (e) => {
    e.preventDefault();
    console.log(categoria);
    alert("Categoría registrada correctamente");
  };


  return (
    <div className="container-fluid p-0">

      {/* =====================================================
          ENCABEZADO
      ===================================================== */}
      <div className="mb-4">
        <h1 className="fw-bold display-6 mb-1">
          Gestión de Categorías
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Registra y administra las categorías de IndieZone
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
            <div className="card-header bg-primary-subtle border-0 p-4">
              <div className="d-flex align-items-center gap-3">

                <span className="fs-3">
                  🏷️
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Nueva categoría
                  </h4>

                  <small className="text-secondary">
                    Completa los datos
                  </small>

                </div>
              </div>
            </div>

            <div className="card-body p-4">
              <form onSubmit={guardarCategoria}>

                {/* NOMBRE */}

                <div className="mb-4">

                  <label
                    htmlFor="nombreCategoria"
                    className="form-label fw-semibold"
                  >
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombreCategoria"
                    name="nombre"
                    placeholder="Ej. Videojuegos"
                    value={categoria.nombre}
                    onChange={cambiarDato}
                    required
                  />

                </div>


                {/* DESCRIPCIÓN */}

                <div className="mb-4">

                  <label
                    htmlFor="descripcionCategoria"
                    className="form-label fw-semibold"
                  >
                    Descripción
                  </label>

                  <textarea
                    className="form-control"
                    id="descripcionCategoria"
                    name="descripcion"
                    rows="5"
                    placeholder="Describe la categoría..."
                    value={categoria.descripcion}
                    onChange={cambiarDato}
                  />

                </div>

                {/* BOTÓN */}

                <div className="d-grid">

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    + Registrar categoría
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ===================================================
            TABLA
        =================================================== */}

        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-header bg-white border-0 p-4">
              <div className="d-flex align-items-center gap-3">

                <span className="fs-3">
                  📋
                </span>
                <div>

                  <h4 className="fw-bold mb-1">
                    Categorías registradas
                  </h4>

                  <small className="text-secondary">
                    Total: {categorias.length} categorías
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

                      <th>Nombre</th>

                      <th>Descripción</th>

                      <th className="text-center">
                        Acciones
                      </th>
                    </tr>
                  </thead>


                  <tbody>

                    {categorias.map((item) => (

                      <tr key={item.id}>

                        <td className="text-secondary">
                          #{item.id}
                        </td>


                        <td>

                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-6">

                            {item.nombre}

                          </span>

                        </td>


                        <td className="text-secondary">
                          {item.descripcion}
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
export default Categoria;