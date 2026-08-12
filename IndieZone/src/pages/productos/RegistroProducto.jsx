import { useEffect, useState } from "react";
import api from "../../api/api";
import Alerta from "../../components/utils/Alerta";
import "./producto.css";

function RegistroProducto({ setPagina }) {
  const [producto, setProducto] = useState({
    nombre_producto: "",
    tipo_producto: "",
    descripcion_producto: "",
    precio: "",
    stock: "",
    id_categoria: "",
    id_oferta: ""
  });

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [ofertas, setOfertas] = useState([]);

  const [productoEditando, setProductoEditando] = useState(null);
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
        respuestaProductos,
        respuestaCategorias,
        respuestaOfertas
      ] = await Promise.all([
        api.get("/productos/"),
        api.get("/categorias/"),
        api.get("/ofertas/")
      ]);

      setProductos(respuestaProductos.data);
      setCategorias(respuestaCategorias.data);
      setOfertas(respuestaOfertas.data);

    } catch (error) {
      console.error(error);

      setProductos([]);
      setCategorias([]);
      setOfertas([]);

      setAlerta({
        tipo: "danger",
        mensaje: "No se pudo obtener la información de productos."
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
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setProducto({
      nombre_producto: "",
      tipo_producto: "",
      descripcion_producto: "",
      precio: "",
      stock: "",
      id_categoria: "",
      id_oferta: ""
    });

    setProductoEditando(null);
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
  const guardarProducto = async (e) => {
    e.preventDefault();

    const datos = {
      nombre_producto: producto.nombre_producto,
      tipo_producto: producto.tipo_producto,
      descripcion_producto:
        producto.descripcion_producto || null,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
      id_categoria: Number(producto.id_categoria),
      id_oferta:
        producto.id_oferta === ""
          ? null
          : Number(producto.id_oferta)
    };

    try {
      if (productoEditando !== null) {
        await api.put(
          `/productos/${productoEditando}`,
          datos
        );

        setAlerta({
          tipo: "success",
          mensaje: "Producto actualizado correctamente."
        });

      } else {
        await api.post(
          "/productos/",
          datos
        );

        setAlerta({
          tipo: "success",
          mensaje: "Producto registrado correctamente."
        });
      }

      limpiarFormulario();
      await cargarDatos();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
  };

  // Editar producto
  const editarProducto = (item) => {
    setProducto({
      nombre_producto: item.nombre_producto,
      tipo_producto: item.tipo_producto,
      descripcion_producto:
        item.descripcion_producto || "",
      precio: item.precio,
      stock: item.stock,
      id_categoria: item.id_categoria,
      id_oferta:
        item.id_oferta === null
          ? ""
          : item.id_oferta
    });

    setProductoEditando(item.id_producto);

    setAlerta({
      tipo: "info",
      mensaje: "Puedes modificar los datos del producto."
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Eliminar producto
  const eliminarProducto = async (idProducto) => {
    const confirmar = window.confirm(
      "¿Deseas eliminar este producto?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(
        `/productos/${idProducto}`
      );

      setAlerta({
        tipo: "success",
        mensaje: "Producto eliminado correctamente."
      });

      await cargarDatos();

    } catch (error) {
      setAlerta({
        tipo: "danger",
        mensaje: obtenerMensajeError(error)
      });
    }
  };

  // Nombre de categoría
  const obtenerCategoria = (idCategoria) => {
    const categoria = categorias.find(
      (item) =>
        item.id_categoria === idCategoria
    );

    return categoria
      ? categoria.nombre
      : "Sin categoría";
  };

  // Nombre de oferta
  const obtenerOferta = (idOferta) => {
    if (!idOferta) {
      return "Sin oferta";
    }

    const oferta = ofertas.find(
      (item) =>
        item.id_oferta === idOferta
    );

    return oferta
      ? `${oferta.nombre} (${oferta.porcentaje_descuento}%)`
      : "Sin oferta";
  };

  // Buscar productos
  const productosFiltrados = productos.filter((item) => {
    const texto = busqueda.toLowerCase();

    const categoria = obtenerCategoria(
      item.id_categoria
    ).toLowerCase();

    return (
      item.nombre_producto
        .toLowerCase()
        .includes(texto) ||
      item.tipo_producto
        .toLowerCase()
        .includes(texto) ||
      categoria.includes(texto)
    );
  });

  return (
    <div className="container-fluid p-0">

      {/* Título */}
      <div className="row align-items-center g-3 mb-4">

        <div className="col">

          <h1 className="fw-bold display-6 mb-1">
            Gestión de Productos
          </h1>

          <p className="text-secondary fs-5 mb-0">
            Registra y administra los productos de IndieZone
          </p>

        </div>

        <div className="col-12 col-sm-auto">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() =>
              setPagina("dashboard")
            }
          >
            ← Volver
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

      {/* Formulario */}
      <div className="card producto-card border-0 shadow-sm rounded-4 mb-4">

        <div
          className={
            productoEditando
              ? "card-header bg-warning-subtle border-0 p-4"
              : "card-header bg-primary-subtle border-0 p-4"
          }
        >

          <div className="d-flex align-items-center gap-3">

            <div className="producto-icon bg-white rounded-circle d-flex align-items-center justify-content-center">

              <span className="fs-2">
                🎮
              </span>

            </div>

            <div>

              <h4 className="fw-bold mb-1">
                {productoEditando
                  ? "Editar producto"
                  : "Nuevo producto"}
              </h4>

              <small className="text-secondary">
                {productoEditando
                  ? "Modifica los datos del producto"
                  : "Completa la información del producto"}
              </small>

            </div>

          </div>

        </div>

        <div className="card-body p-4">

          <form onSubmit={guardarProducto}>

            <div className="row g-4">

              {/* Nombre */}
              <div className="col-12 col-md-6">

                <label className="form-label fw-semibold">
                  Nombre del producto *
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="nombre_producto"
                  placeholder="Ej. Hollow Knight"
                  maxLength="100"
                  value={producto.nombre_producto}
                  onChange={cambiarDato}
                  required
                />

              </div>

              {/* Tipo */}
              <div className="col-12 col-md-6">

                <label className="form-label fw-semibold">
                  Tipo / género / modelo *
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="tipo_producto"
                  placeholder="Ej. Indie, Horror, Shooter, Portátil..."
                  maxLength="30"
                  value={producto.tipo_producto}
                  onChange={cambiarDato}
                  required
                />

                <div className="form-text">
                  Género del videojuego, tipo de consola o modelo del accesorio.
                </div>

              </div>

              {/* Precio */}
              <div className="col-12 col-md-6">

                <label className="form-label fw-semibold">
                  Precio *
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    S/.
                  </span>

                  <input
                    type="number"
                    className="form-control"
                    name="precio"
                    placeholder="Ej. 40.90"
                    min="0.01"
                    step="0.01"
                    value={producto.precio}
                    onChange={cambiarDato}
                    required
                  />

                </div>

              </div>

              {/* Stock */}
              <div className="col-12 col-md-6">

                <label className="form-label fw-semibold">
                  Stock *
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  placeholder="Ej. 20"
                  min="0"
                  value={producto.stock}
                  onChange={cambiarDato}
                  required
                />

              </div>

              {/* Categoría */}
              <div className="col-12 col-md-6">

                <label className="form-label fw-semibold">
                  Categoría *
                </label>

                <select
                  className="form-select"
                  name="id_categoria"
                  value={producto.id_categoria}
                  onChange={cambiarDato}
                  required
                >

                  <option value="">
                    Seleccionar categoría
                  </option>

                  {categorias.map((categoria) => (

                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {categoria.nombre}
                    </option>

                  ))}

                </select>

                <div className="form-text">
                  Ej. Videojuegos, Consolas o Accesorios.
                </div>

              </div>

              {/* Oferta */}
              <div className="col-12 col-md-6">

                <label className="form-label fw-semibold">
                  Oferta
                </label>

                <select
                  className="form-select"
                  name="id_oferta"
                  value={producto.id_oferta}
                  onChange={cambiarDato}
                >

                  <option value="">
                    Sin oferta
                  </option>

                  {ofertas.map((oferta) => (

                    <option
                      key={oferta.id_oferta}
                      value={oferta.id_oferta}
                    >
                      {oferta.nombre} - {oferta.porcentaje_descuento}%
                    </option>

                  ))}

                </select>

              </div>

              {/* Descripción */}
              <div className="col-12">

                <label className="form-label fw-semibold">
                  Descripción
                </label>

                <textarea
                  className="form-control"
                  name="descripcion_producto"
                  rows="3"
                  maxLength="200"
                  placeholder="Ej. Videojuego indie de acción y aventura"
                  value={producto.descripcion_producto}
                  onChange={cambiarDato}
                />

                <div className="form-text">
                  Máximo 200 caracteres.
                </div>

              </div>

            </div>

            {/* Botones */}
            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 mt-4">

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={limpiarFormulario}
              >
                {productoEditando
                  ? "Cancelar edición"
                  : "Limpiar"}
              </button>

              <button
                type="submit"
                className={
                  productoEditando
                    ? "btn btn-warning px-4"
                    : "btn btn-primary px-4"
                }
              >
                {productoEditando
                  ? "Guardar cambios"
                  : "Guardar producto"}
              </button>

            </div>

          </form>

        </div>

      </div>

      {/* Lista */}
      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-header bg-white border-0 p-4">

          <div className="row align-items-center g-3">

            <div className="col">

              <h4 className="fw-bold mb-1">
                Productos registrados
              </h4>

              <small className="text-secondary">
                Total: {productos.length}
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
                  placeholder="Buscar por nombre, tipo o categoría"
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
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Oferta</th>
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
                      colSpan="8"
                      className="text-center text-secondary py-4"
                    >
                      Cargando productos...
                    </td>

                  </tr>

                )}

                {/* Productos */}
                {!cargando &&
                  productosFiltrados.map((item) => (

                    <tr key={item.id_producto}>

                      <td>
                        #{item.id_producto}
                      </td>

                      <td>

                        <div className="fw-semibold">
                          {item.nombre_producto}
                        </div>

                        <small className="text-secondary">
                          {item.descripcion_producto ||
                            "Sin descripción"}
                        </small>

                      </td>

                      <td>
                        {item.tipo_producto}
                      </td>

                      <td>
                        {obtenerCategoria(
                          item.id_categoria
                        )}
                      </td>

                      <td className="fw-semibold">
                        S/. {Number(
                          item.precio
                        ).toFixed(2)}
                      </td>

                      <td>
                        {item.stock}
                      </td>

                      <td>
                        {obtenerOferta(
                          item.id_oferta
                        )}
                      </td>

                      <td>

                        <div className="d-flex justify-content-center gap-2">

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              editarProducto(item)
                            }
                          >
                            ✏️ Editar
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              eliminarProducto(
                                item.id_producto
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
                  productosFiltrados.length === 0 && (

                    <tr>

                      <td
                        colSpan="8"
                        className="text-center text-secondary py-4"
                      >
                        {busqueda
                          ? "No se encontraron productos."
                          : "No hay productos registrados."}
                      </td>

                    </tr>

                  )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegistroProducto;