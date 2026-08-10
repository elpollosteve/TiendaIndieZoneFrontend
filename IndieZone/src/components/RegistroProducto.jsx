import { useState } from "react";

function RegistroProducto({ setPagina }) {

  // =========================================================
  // PRODUCTO
  // Los nombres coinciden con PostgreSQL
  // =========================================================

  const [producto, setProducto] = useState({
    nombre_producto: "",
    tipo_producto: "",
    descripcion_producto: "",
    precio: "",
    stock: "",
    id_categoria: "",
    id_oferta: ""
  });


  const categorias = [
    {
      id_categoria: 1,
      nombre: "Videojuegos"
    },
    {
      id_categoria: 2,
      nombre: "Consolas"
    },
    {
      id_categoria: 3,
      nombre: "Accesorios"
    }
  ];


  const ofertas = [
    {
      id_oferta: 1,
      nombre: "Oferta Indie",
      porcentaje_descuento: 10
    },
    {
      id_oferta: 2,
      nombre: "Oferta Gamer",
      porcentaje_descuento: 15
    }
  ];


  // =========================================================
  // CAMBIAR DATOS
  // =========================================================

  const cambiarDato = (e) => {

    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });

  };


  // =========================================================
  // GUARDAR PRODUCTO
  // Por ahora solo prueba el formulario.
  // Luego aquí irá el fetch hacia FastAPI.
  // =========================================================

  const guardarProducto = (e) => {

    e.preventDefault();

    console.log(producto);

    alert("Producto registrado correctamente");

  };


  // =========================================================
  // LIMPIAR
  // =========================================================

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

  };


  return (

    <div className="container-fluid p-0">


      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="row align-items-center g-3 mb-4">

        <div className="col">

          <h1 className="fw-bold display-6 mb-1">
            Registro de Producto
          </h1>

          <p className="text-secondary fs-5 mb-0">
            Completa los datos para registrar un nuevo producto
          </p>

        </div>


        <div className="col-12 col-sm-auto">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setPagina("dashboard")}
          >
            ← Volver al Dashboard
          </button>

        </div>

      </div>


      {/* =====================================================
          TARJETA DEL FORMULARIO
      ===================================================== */}

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-header bg-white border-0 px-4 pt-4">

          <div className="d-flex align-items-center gap-3">

            <span className="fs-3">
              🎮
            </span>

            <div>

              <h4 className="fw-bold mb-1">
                Datos del producto
              </h4>

              <p className="text-secondary mb-0">
                Ingresa la información principal del producto
              </p>

            </div>

          </div>

        </div>


        <div className="card-body p-4">

          <form onSubmit={guardarProducto}>

            <div className="row g-4">


              {/* =============================================
                  NOMBRE PRODUCTO
              ============================================= */}

              <div className="col-12 col-md-6">

                <label
                  htmlFor="nombre_producto"
                  className="form-label fw-semibold"
                >
                  Nombre del producto *
                </label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nombre_producto"
                  name="nombre_producto"
                  placeholder="Ej. Hollow Knight"
                  maxLength="100"
                  value={producto.nombre_producto}
                  onChange={cambiarDato}
                  required
                />

              </div>


              {/* =============================================
                  TIPO PRODUCTO
              ============================================= */}

              <div className="col-12 col-md-6">

                <label
                  htmlFor="tipo_producto"
                  className="form-label fw-semibold"
                >
                  Tipo de producto *
                </label>

                <select
                  className="form-select form-select-lg"
                  id="tipo_producto"
                  name="tipo_producto"
                  value={producto.tipo_producto}
                  onChange={cambiarDato}
                  required
                >

                  <option value="">
                    Seleccionar tipo
                  </option>

                  <option value="Videojuego">
                    Videojuego
                  </option>

                  <option value="Consola">
                    Consola
                  </option>

                  <option value="Accesorio">
                    Accesorio
                  </option>

                </select>

              </div>


              {/* =============================================
                  PRECIO
              ============================================= */}

              <div className="col-12 col-md-6">

                <label
                  htmlFor="precio"
                  className="form-label fw-semibold"
                >
                  Precio *
                </label>

                <div className="input-group input-group-lg">

                  <span className="input-group-text">
                    S/.
                  </span>

                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="precio"
                    placeholder="45.90"
                    min="0"
                    step="0.01"
                    value={producto.precio}
                    onChange={cambiarDato}
                    required
                  />

                </div>

              </div>


              {/* =============================================
                  STOCK
              ============================================= */}

              <div className="col-12 col-md-6">

                <label
                  htmlFor="stock"
                  className="form-label fw-semibold"
                >
                  Stock *
                </label>

                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="stock"
                  name="stock"
                  placeholder="Ej. 20"
                  min="0"
                  value={producto.stock}
                  onChange={cambiarDato}
                  required
                />

              </div>


              {/* =============================================
                  CATEGORÍA
              ============================================= */}

              <div className="col-12 col-md-6">

                <label
                  htmlFor="id_categoria"
                  className="form-label fw-semibold"
                >
                  Categoría *
                </label>

                <select
                  className="form-select form-select-lg"
                  id="id_categoria"
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

              </div>


              {/* =============================================
                  OFERTA
              ============================================= */}

              <div className="col-12 col-md-6">

                <label
                  htmlFor="id_oferta"
                  className="form-label fw-semibold"
                >
                  Oferta
                </label>

                <select
                  className="form-select form-select-lg"
                  id="id_oferta"
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

                <div className="form-text">
                  Este campo es opcional.
                </div>

              </div>


              {/* =============================================
                  DESCRIPCIÓN
              ============================================= */}

              <div className="col-12">

                <label
                  htmlFor="descripcion_producto"
                  className="form-label fw-semibold"
                >
                  Descripción
                </label>

                <textarea
                  className="form-control"
                  id="descripcion_producto"
                  name="descripcion_producto"
                  rows="4"
                  maxLength="200"
                  placeholder="Describe el producto y sus características..."
                  value={producto.descripcion_producto}
                  onChange={cambiarDato}
                />

                <div className="form-text">
                  Máximo 200 caracteres.
                </div>

              </div>

            </div>


            {/* =============================================
                BOTONES
            ============================================= */}

            <hr className="my-4" />


            <div className="d-flex flex-column flex-sm-row justify-content-end gap-2">

              <button
                type="button"
                className="btn btn-light border px-4"
                onClick={limpiarFormulario}
              >
                Limpiar
              </button>


              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() => setPagina("dashboard")}
              >
                Cancelar
              </button>


              <button
                type="submit"
                className="btn btn-primary px-4"
              >
                💾 Guardar producto
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default RegistroProducto;