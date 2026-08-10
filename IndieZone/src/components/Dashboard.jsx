import { useEffect, useState } from "react";

function Dashboard({ setPagina }) {

  // =========================================================
  // FECHA Y HORA
  // =========================================================

  const [fechaHora, setFechaHora] = useState(new Date());


  useEffect(() => {

    const reloj = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(reloj);

  }, []);


  const fechaActual = fechaHora.toLocaleDateString(
    "es-PE",
    {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  );


  const horaActual = fechaHora.toLocaleTimeString(
    "es-PE",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }
  );


  // =========================================================
  // CATEGORÍAS TEMPORALES
  // =========================================================

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


  // =========================================================
  // OFERTAS TEMPORALES
  // =========================================================

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
  // PRODUCTOS TEMPORALES
  // Campos iguales a PostgreSQL
  // =========================================================

  const productos = [

    {
      id_producto: 4,
      nombre_producto: "Hollow Knight",
      tipo_producto: "Videojuego",
      descripcion_producto: "Juego de acción y aventura",
      precio: "40.90",
      stock: 32,
      id_categoria: 1,
      id_oferta: 1
    },

    {
      id_producto: 3,
      nombre_producto: "Celeste",
      tipo_producto: "Videojuego",
      descripcion_producto: "Juego de plataformas",
      precio: "50.90",
      stock: 15,
      id_categoria: 1,
      id_oferta: null
    },

    {
      id_producto: 2,
      nombre_producto: "Stardew Valley",
      tipo_producto: "Videojuego",
      descripcion_producto: "Juego de simulación",
      precio: "30.50",
      stock: 10,
      id_categoria: 1,
      id_oferta: 2
    },

    {
      id_producto: 1,
      nombre_producto: "Undertale",
      tipo_producto: "Videojuego",
      descripcion_producto: "Juego RPG independiente",
      precio: "20.00",
      stock: 22,
      id_categoria: 1,
      id_oferta: null
    }

  ];


  // =========================================================
  // OBTENER NOMBRE DE CATEGORÍA
  // =========================================================

  const obtenerCategoria = (idCategoria) => {

    const categoria = categorias.find(
      (item) => item.id_categoria === idCategoria
    );

    return categoria
      ? categoria.nombre
      : "Sin categoría";

  };


  // =========================================================
  // OBTENER OFERTA
  // =========================================================

  const obtenerOferta = (idOferta) => {

    if (!idOferta) {
      return null;
    }

    return ofertas.find(
      (item) => item.id_oferta === idOferta
    );

  };


  return (

    <div className="container-fluid p-0">


      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="row align-items-center g-3 mb-4">


        <div className="col-12 col-md">

          <h1 className="fw-bold display-6 mb-1">
            Panel Principal
          </h1>

          <p className="text-secondary fs-5 mb-0">
            Resumen general del sistema
          </p>

        </div>


        {/* FECHA Y HORA */}

        <div className="col-12 col-md-auto">

          <div className="card border-0 shadow-sm">

            <div className="card-body py-2 px-3">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-3">
                  📅
                </span>

                <div>

                  <div className="fw-semibold text-capitalize">
                    {fechaActual}
                  </div>

                  <div className="text-primary fw-bold">
                    {horaActual}
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          TARJETAS
      ===================================================== */}

      <div className="row g-4 mb-4">


        {/* PRODUCTOS */}

        <div className="col-12 col-sm-6 col-xl-3">

          <button
            type="button"
            className="card border-0 shadow-sm bg-primary-subtle h-100 w-100 text-start"
            onClick={() => setPagina("producto")}
          >

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-white bg-opacity-75 rounded-circle d-inline-flex align-items-center justify-content-center p-3 flex-shrink-0">

                  <span className="fs-2 lh-1">
                    🎮
                  </span>

                </div>


                <div>

                  <h2 className="fw-bold mb-0">
                    28
                  </h2>

                  <div className="fw-semibold fs-5">
                    Productos
                  </div>

                  <small className="text-secondary">
                    Registrados
                  </small>

                </div>

              </div>

            </div>

          </button>

        </div>


        {/* CATEGORÍAS */}

        <div className="col-12 col-sm-6 col-xl-3">

          <button
            type="button"
            className="card border-0 shadow-sm bg-info-subtle h-100 w-100 text-start"
            onClick={() => setPagina("categoria")}
          >

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-white bg-opacity-75 rounded-circle d-inline-flex align-items-center justify-content-center p-3 flex-shrink-0">

                  <span className="fs-2 lh-1">
                    🏷️
                  </span>

                </div>


                <div>

                  <h2 className="fw-bold mb-0">
                    7
                  </h2>

                  <div className="fw-semibold fs-5">
                    Categorías
                  </div>

                  <small className="text-secondary">
                    Registradas
                  </small>

                </div>

              </div>

            </div>

          </button>

        </div>


        {/* VENTAS */}

        <div className="col-12 col-sm-6 col-xl-3">

          <button
            type="button"
            className="card border-0 shadow-sm bg-success-subtle h-100 w-100 text-start"
            onClick={() => setPagina("ventas")}
          >

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-white bg-opacity-75 rounded-circle d-inline-flex align-items-center justify-content-center p-3 flex-shrink-0">

                  <span className="fs-2 lh-1">
                    🛒
                  </span>

                </div>


                <div>

                  <h2 className="fw-bold mb-0">
                    156
                  </h2>

                  <div className="fw-semibold fs-5">
                    Ventas
                  </div>

                  <small className="text-secondary">
                    Realizadas
                  </small>

                </div>

              </div>

            </div>

          </button>

        </div>


        {/* CLIENTES */}

        <div className="col-12 col-sm-6 col-xl-3">

          <button
            type="button"
            className="card border-0 shadow-sm bg-danger-subtle h-100 w-100 text-start"
            onClick={() => setPagina("cliente")}
          >

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="bg-white bg-opacity-75 rounded-circle d-inline-flex align-items-center justify-content-center p-3 flex-shrink-0">

                  <span className="fs-2 lh-1">
                    👥
                  </span>

                </div>


                <div>

                  <h2 className="fw-bold mb-0">
                    42
                  </h2>

                  <div className="fw-semibold fs-5">
                    Clientes
                  </div>

                  <small className="text-secondary">
                    Registrados
                  </small>

                </div>

              </div>

            </div>

          </button>

        </div>

      </div>


      {/* =====================================================
          PRODUCTOS RECIENTES
      ===================================================== */}

      <div className="card border-0 shadow-sm rounded-4">


        {/* CABECERA */}

        <div className="card-header bg-white border-0 pt-4 px-4">

          <div className="row align-items-center g-3">


            <div className="col">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-3">
                  📦
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Productos recientes
                  </h4>

                  <p className="text-secondary mb-0">
                    Últimos productos registrados
                  </p>

                </div>

              </div>

            </div>


            <div className="col-12 col-sm-auto">

              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={() => setPagina("producto")}
              >
                + Registrar producto
              </button>

            </div>

          </div>

        </div>


        {/* TABLA */}

        <div className="card-body px-4">

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>

                  <th>ID</th>

                  <th>Nombre</th>

                  <th>Tipo</th>

                  <th>Precio</th>

                  <th>Stock</th>

                  <th>Categoría</th>

                  <th>Oferta</th>

                </tr>

              </thead>


              <tbody>

                {productos.map((producto) => {

                  const oferta = obtenerOferta(
                    producto.id_oferta
                  );

                  return (

                    <tr key={producto.id_producto}>

                      <td className="text-secondary">

                        #{producto.id_producto}

                      </td>


                      <td className="fw-semibold">

                        {producto.nombre_producto}

                      </td>


                      <td>

                        {producto.tipo_producto}

                      </td>


                      <td className="fw-semibold">

                        S/. {producto.precio}

                      </td>


                      <td>

                        <span
                          className={
                            producto.stock <= 10
                              ? "badge text-bg-warning"
                              : "badge text-bg-light"
                          }
                        >

                          {producto.stock}

                        </span>

                      </td>


                      <td>

                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">

                          {obtenerCategoria(
                            producto.id_categoria
                          )}

                        </span>

                      </td>


                      <td>

                        {oferta ? (

                          <span className="badge bg-success-subtle text-success border border-success-subtle">

                            {oferta.porcentaje_descuento}%

                          </span>

                        ) : (

                          <span className="badge text-bg-light">

                            Sin oferta

                          </span>

                        )}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>


        {/* PIE */}

        <div className="card-footer bg-white border-0 px-4 pb-4">

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">

            <small className="text-secondary">

              Mostrando {productos.length} productos recientes

            </small>


            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => setPagina("producto")}
            >
              Ver productos →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;