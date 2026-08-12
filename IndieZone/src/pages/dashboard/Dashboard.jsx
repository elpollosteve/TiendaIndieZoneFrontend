import { useEffect, useState } from "react";
import "./dashboard.css";

function Dashboard({ setPagina }) {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const reloj = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(reloj);
  }, []);

  const fechaActual = fechaHora.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const horaActual = fechaHora.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Datos temporales
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

  const obtenerCategoria = (idCategoria) => {
    const categoria = categorias.find(
      (item) => item.id_categoria === idCategoria
    );

    return categoria ? categoria.nombre : "Sin categoría";
  };

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

      {/* Título */}
      <div className="row align-items-center g-3 mb-4">

        <div className="col-12 col-lg">

          <h1 className="fw-bold display-6 mb-1">
            Panel Principal
          </h1>

          <p className="text-secondary fs-5 mb-0">
            Resumen general del sistema
          </p>

        </div>

        <div className="col-12 col-lg-auto">

          <div className="card dashboard-date border-0 shadow-sm rounded-4">

            <div className="card-body py-3 px-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-3">
                  📅
                </span>

                <div>

                  <div className="fw-semibold text-capitalize">
                    {fechaActual}
                  </div>

                  <small className="text-secondary">
                    {horaActual}
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Resumen */}
      <div className="row g-4 mb-4">

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-card border-0 shadow-sm bg-primary-subtle h-100 rounded-4">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3 mb-3">

                <div className="dashboard-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🎮
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">
                    28
                  </h2>

                  <span className="text-secondary">
                    Productos
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => setPagina("producto")}
              >
                Ver productos
              </button>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-card border-0 shadow-sm bg-info-subtle h-100 rounded-4">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3 mb-3">

                <div className="dashboard-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🏷️
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">
                    7
                  </h2>

                  <span className="text-secondary">
                    Categorías
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="btn btn-info btn-sm"
                onClick={() => setPagina("categoria")}
              >
                Ver categorías
              </button>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-card border-0 shadow-sm bg-success-subtle h-100 rounded-4">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3 mb-3">

                <div className="dashboard-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🛒
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">
                    156
                  </h2>

                  <span className="text-secondary">
                    Ventas
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => setPagina("ventas")}
              >
                Ver ventas
              </button>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-card border-0 shadow-sm bg-warning-subtle h-100 rounded-4">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3 mb-3">

                <div className="dashboard-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    👥
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">
                    42
                  </h2>

                  <span className="text-secondary">
                    Clientes
                  </span>

                </div>

              </div>

              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={() => setPagina("cliente")}
              >
                Ver clientes
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Productos recientes */}
      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-header bg-white border-0 p-4">

          <div className="row align-items-center g-3">

            <div className="col">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  📦
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Productos recientes
                  </h4>

                  <small className="text-secondary">
                    Últimos productos registrados
                  </small>

                </div>

              </div>

            </div>

            <div className="col-12 col-sm-auto">

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setPagina("producto")}
              >
                Agregar productos
              </button>

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

                      <td>

                        <div className="fw-semibold">
                          {producto.nombre_producto}
                        </div>

                        <small className="text-secondary">
                          {producto.descripcion_producto}
                        </small>

                      </td>

                      <td>
                        {producto.tipo_producto}
                      </td>

                      <td>
                        {obtenerCategoria(
                          producto.id_categoria
                        )}
                      </td>

                      <td className="fw-semibold">
                        S/. {producto.precio}
                      </td>

                      <td>

                        <span className="badge bg-primary-subtle text-primary">
                          {producto.stock}
                        </span>

                      </td>

                      <td>

                        {oferta ? (
                          <span className="badge bg-success-subtle text-success">
                            {oferta.porcentaje_descuento}% descuento
                          </span>
                        ) : (
                          <span className="text-secondary">
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

      </div>

    </div>
  );
}
export default Dashboard;