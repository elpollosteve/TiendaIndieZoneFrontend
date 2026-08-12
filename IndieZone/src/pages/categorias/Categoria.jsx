import { useEffect, useState } from "react";
import api from "../../api/api";
import Alerta from "../../components/utils/Alerta";
import "./categoria.css";

function Categoria() {
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Obtener categorías
  const cargarCategorias = async () => {
    setCargando(true);

    try {
      const respuesta = await api.get("/categorias/");

      setCategorias(respuesta.data);

    } catch (error) {
      console.error(error);

      setCategorias([]);

      setAlerta({
        tipo: "danger",
        mensaje: "No se pudo obtener la información de categorías."
      });

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // Cambiar campos
  const cambiarDato = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setCategoria({
      nombre: "",
      descripcion: ""
    });

    setCategoriaEditando(null);
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
  const guardarCategoria = async (e) => {
    e.preventDefault();

    const datos = {
      nombre: categoria.nombre,
      descripcion:
        categoria.descripcion === ""
          ? null
          : categoria.descripcion
    };

    try {
      if (categoriaEditando !== null) {
        await api.put(
          `/categorias/${categoriaEditando}`,
          datos
        );

        setAlerta({
          tipo: "success",
          mensaje: "Categoría actualizada correctamente."
        });

      } else {
        await api.post(
          "/categorias/",
          datos
        );

        setAlerta({
          tipo: "success",
          mensaje: "Categoría registrada correctamente."
        });
      }

      limpiarFormulario();
      await cargarCategorias();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
  };

  // Editar
  const editarCategoria = (item) => {
    setCategoria({
      nombre: item.nombre,
      descripcion: item.descripcion || ""
    });

    setCategoriaEditando(item.id_categoria);

    setAlerta({
      tipo: "info",
      mensaje: "Puedes modificar los datos de la categoría."
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Eliminar
  const eliminarCategoria = async (idCategoria) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar esta categoría?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(
        `/categorias/${idCategoria}`
      );

      setAlerta({
        tipo: "success",
        mensaje: "Categoría eliminada correctamente."
      });

      await cargarCategorias();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
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
                      : "Completa los datos de la categoría"}

                  </small>

                </div>

              </div>

            </div>

            <div className="card-body p-4">

              <form onSubmit={guardarCategoria}>

                {/* Nombre */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ej. Videojuegos"
                    maxLength="50"
                    value={categoria.nombre}
                    onChange={cambiarDato}
                    required
                  />

                </div>

                {/* Descripción */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Descripción
                  </label>

                  <textarea
                    className="form-control"
                    name="descripcion"
                    rows="4"
                    maxLength="150"
                    placeholder="Ej. Juegos disponibles para diferentes plataformas"
                    value={categoria.descripcion}
                    onChange={cambiarDato}
                  />

                  <div className="form-text">
                    Máximo 150 caracteres.
                  </div>

                </div>

                {/* Botones */}
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

        {/* Lista */}
        <div className="col-12 col-lg-8">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h4 className="fw-bold mb-1">
                    Categorías registradas
                  </h4>

                  <small className="text-secondary">
                    Total: {categorias.length}
                  </small>

                </div>

                <span className="badge bg-info-subtle text-info-emphasis fs-6">
                  {categorias.length} categorías
                </span>

              </div>

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

                    {/* Cargando */}
                    {cargando && (
                      <tr>

                        <td
                          colSpan="4"
                          className="text-center text-secondary py-4"
                        >
                          Cargando categorías...
                        </td>

                      </tr>
                    )}

                    {/* Categorías */}
                    {!cargando &&
                      categorias.map((item) => (

                        <tr key={item.id_categoria}>

                          <td>
                            #{item.id_categoria}
                          </td>

                          <td className="fw-semibold">
                            {item.nombre}
                          </td>

                          <td>
                            {item.descripcion || "Sin descripción"}
                          </td>

                          <td>

                            <div className="d-flex justify-content-center gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  editarCategoria(item)
                                }
                              >
                                ✏️ Editar
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  eliminarCategoria(
                                    item.id_categoria
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
                      categorias.length === 0 && (

                        <tr>

                          <td
                            colSpan="4"
                            className="text-center text-secondary py-4"
                          >
                            No hay categorías registradas.
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

export default Categoria;