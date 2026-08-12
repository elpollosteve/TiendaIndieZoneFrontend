import { useState } from "react";
import Alerta from "../../components/utils/Alerta";
import "./categoria.css";

function Categoria() {
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: ""
  });

  const [categoriaEditando, setCategoriaEditando] = useState(null);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Datos temporales
  const [categorias, setCategorias] = useState([
    {
      id_categoria: 1,
      nombre: "Videojuegos",
      descripcion: "Juegos disponibles para diferentes plataformas"
    },
    {
      id_categoria: 2,
      nombre: "Consolas",
      descripcion: "Consolas para videojuegos"
    },
    {
      id_categoria: 3,
      nombre: "Accesorios",
      descripcion: "Controles, audífonos y otros accesorios"
    }
  ]);

  const cambiarDato = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setCategoria({
      nombre: "",
      descripcion: ""
    });

    setCategoriaEditando(null);

    setAlerta({
      tipo: "",
      mensaje: ""
    });
  };

  const editarCategoria = (item) => {
    setCategoria({
      nombre: item.nombre,
      descripcion: item.descripcion
    });

    setCategoriaEditando(item.id_categoria);

    setAlerta({
      tipo: "info",
      mensaje: "Puedes modificar los datos de la categoría."
    });
  };

  const guardarCategoria = (e) => {
    e.preventDefault();

    if (categoriaEditando !== null) {
      const nuevasCategorias = categorias.map((item) =>
        item.id_categoria === categoriaEditando
          ? {
              ...item,
              nombre: categoria.nombre,
              descripcion: categoria.descripcion
            }
          : item
      );

      setCategorias(nuevasCategorias);

      setAlerta({
        tipo: "success",
        mensaje: "Categoría actualizada correctamente."
      });

      setCategoria({
        nombre: "",
        descripcion: ""
      });

      setCategoriaEditando(null);

      return;
    }

    const nuevaCategoria = {
      id_categoria: categorias.length + 1,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    };

    setCategorias([...categorias, nuevaCategoria]);

    setAlerta({
      tipo: "success",
      mensaje: "Categoría registrada correctamente."
    });

    setCategoria({
      nombre: "",
      descripcion: ""
    });
  };

  return (
    <div className="container-fluid p-0">

      {/* Título */}
      <div className="mb-4">
        <h1 className="fw-bold display-6 mb-1">
          Gestión de Categorías
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Registra y organiza las categorías de IndieZone
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

          <div className="card categoria-card border-0 shadow-sm rounded-4">

            <div
              className={
                categoriaEditando
                  ? "card-header bg-warning-subtle border-0 p-4"
                  : "card-header bg-info-subtle border-0 p-4"
              }
            >

              <div className="d-flex align-items-center gap-3">

                <div className="categoria-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🏷️
                  </span>
                </div>

                <div>
                  <h4 className="fw-bold mb-1">
                    {categoriaEditando
                      ? "Editar categoría"
                      : "Nueva categoría"}
                  </h4>

                  <small className="text-secondary">
                    {categoriaEditando
                      ? "Modifica los datos"
                      : "Completa los datos"}
                  </small>
                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <form onSubmit={guardarCategoria}>

                <div className="mb-3">
                  <label
                    htmlFor="nombre"
                    className="form-label fw-semibold"
                  >
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    maxLength="50"
                    value={categoria.nombre}
                    onChange={cambiarDato}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="descripcion"
                    className="form-label fw-semibold"
                  >
                    Descripción
                  </label>

                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    rows="4"
                    maxLength="150"
                    value={categoria.descripcion}
                    onChange={cambiarDato}
                  />
                </div>

                <div className="d-grid gap-2">

                  <button
                    type="submit"
                    className={
                      categoriaEditando
                        ? "btn btn-warning"
                        : "btn btn-info"
                    }
                  >
                    {categoriaEditando
                      ? "Guardar cambios"
                      : "Guardar categoría"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={limpiarFormulario}
                  >
                    {categoriaEditando
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
                Categorías registradas
              </h4>

              <small className="text-secondary">
                Lista de categorías disponibles
              </small>

            </div>

            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

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

                      <tr key={item.id_categoria}>

                        <td>
                          #{item.id_categoria}
                        </td>

                        <td className="fw-semibold">
                          {item.nombre}
                        </td>

                        <td>
                          {item.descripcion}
                        </td>

                        <td className="text-center">

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => editarCategoria(item)}
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
export default Categoria;