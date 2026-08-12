import { useEffect, useState } from "react";
import api from "../../api/api";
import Alerta from "../../components/utils/Alerta";
import "./reportes.css";

function Reportes() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [detalles, setDetalles] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });

  // Obtener datos
  const cargarReportes = async () => {
    setCargando(true);

    try {
      const [
        respuestaProductos,
        respuestaCategorias,
        respuestaOfertas,
        respuestaClientes,
        respuestaVentas,
        respuestaDetalles
      ] = await Promise.all([
        api.get("/productos/"),
        api.get("/categorias/"),
        api.get("/ofertas/"),
        api.get("/clientes/"),
        api.get("/ventas/"),
        api.get("/detalle-ventas/")
      ]);

      setProductos(respuestaProductos.data);
      setCategorias(respuestaCategorias.data);
      setOfertas(respuestaOfertas.data);
      setClientes(respuestaClientes.data);
      setVentas(respuestaVentas.data);
      setDetalles(respuestaDetalles.data);

    } catch (error) {
      console.error(error);

      setProductos([]);
      setCategorias([]);
      setOfertas([]);
      setClientes([]);
      setVentas([]);
      setDetalles([]);

      setAlerta({
        tipo: "danger",
        mensaje: "No se pudo obtener la información de reportes."
      });

    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  // Total de ingresos
  const totalIngresos = ventas.reduce(
    (total, venta) =>
      total + Number(venta.total_venta),
    0
  );

  // Obtener producto
  const obtenerProducto = (idProducto) => {
    return productos.find(
      (producto) =>
        producto.id_producto === idProducto
    );
  };

  // Productos más vendidos
  const calcularProductosVendidos = () => {
    const resumen = {};

    detalles.forEach((detalle) => {
      const idProducto = detalle.id_producto;

      if (!resumen[idProducto]) {
        resumen[idProducto] = {
          id_producto: idProducto,
          cantidad: 0,
          total: 0
        };
      }

      resumen[idProducto].cantidad += Number(
        detalle.cantidad
      );

      resumen[idProducto].total += Number(
        detalle.subtotal
      );
    });

    return Object.values(resumen)
      .sort(
        (a, b) =>
          b.cantidad - a.cantidad
      )
      .slice(0, 5);
  };

  const productosMasVendidos =
    calcularProductosVendidos();

  return (
    <div className="container-fluid p-0">

      {/* Título */}
      <div className="mb-4">

        <h1 className="fw-bold display-6 mb-1">
          Reportes
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Resumen general de IndieZone
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

      {/* Tarjetas */}
      <div className="row g-4 mb-4">

        {/* Productos */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-primary-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🎮
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">
                    {cargando
                      ? "..."
                      : productos.length}
                  </h2>

                  <div className="fw-semibold">
                    Productos
                  </div>

                  <small className="text-secondary">
                    Registrados
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Clientes */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-info-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    👥
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">
                    {cargando
                      ? "..."
                      : clientes.length}
                  </h2>

                  <div className="fw-semibold">
                    Clientes
                  </div>

                  <small className="text-secondary">
                    Registrados
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Ventas */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-success-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    🛒
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">
                    {cargando
                      ? "..."
                      : ventas.length}
                  </h2>

                  <div className="fw-semibold">
                    Ventas
                  </div>

                  <small className="text-secondary">
                    Realizadas
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Ingresos */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card border-0 shadow-sm bg-warning-subtle rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-3">

                <div className="reporte-icon bg-white rounded-circle d-flex align-items-center justify-content-center">
                  <span className="fs-2">
                    💰
                  </span>
                </div>

                <div>

                  <h2 className="fw-bold mb-0">

                    {cargando
                      ? "..."
                      : `S/. ${totalIngresos.toFixed(2)}`}

                  </h2>

                  <div className="fw-semibold">
                    Ingresos
                  </div>

                  <small className="text-secondary">
                    Total registrado
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Información */}
      <div className="row g-4">

        {/* Resumen general */}
        <div className="col-12 col-lg-5">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  📊
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Resumen general
                  </h4>

                  <small className="text-secondary">
                    Estado actual del sistema
                  </small>

                </div>

              </div>

            </div>

            <div className="card-body pt-2 px-4 pb-4">

              {/* Categorías */}
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                <span>
                  Categorías registradas
                </span>

                <span className="badge rounded-pill bg-primary">
                  {cargando
                    ? "..."
                    : categorias.length}
                </span>

              </div>

              {/* Ofertas */}
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                <span>
                  Ofertas registradas
                </span>

                <span className="badge rounded-pill bg-success">
                  {cargando
                    ? "..."
                    : ofertas.length}
                </span>

              </div>

              {/* Productos */}
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                <span>
                  Productos registrados
                </span>

                <span className="badge rounded-pill bg-info text-dark">
                  {cargando
                    ? "..."
                    : productos.length}
                </span>

              </div>

              {/* Clientes */}
              <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

                <span>
                  Clientes registrados
                </span>

                <span className="badge rounded-pill bg-secondary">
                  {cargando
                    ? "..."
                    : clientes.length}
                </span>

              </div>

              {/* Ventas */}
              <div className="d-flex justify-content-between align-items-center py-3">

                <span>
                  Ventas realizadas
                </span>

                <span className="badge rounded-pill bg-warning text-dark">
                  {cargando
                    ? "..."
                    : ventas.length}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Productos más vendidos */}
        <div className="col-12 col-lg-7">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-header bg-white border-0 p-4">

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  🏆
                </span>

                <div>

                  <h4 className="fw-bold mb-1">
                    Productos más vendidos
                  </h4>

                  <small className="text-secondary">
                    Productos con mayor cantidad vendida
                  </small>

                </div>

              </div>

            </div>

            <div className="card-body pt-2 px-4 pb-4">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">

                  <thead className="table-light">

                    <tr>
                      <th>Posición</th>
                      <th>Producto</th>
                      <th className="text-center">
                        Cantidad
                      </th>
                      <th className="text-end">
                        Total
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
                          Cargando reportes...
                        </td>

                      </tr>

                    )}

                    {/* Productos vendidos */}
                    {!cargando &&
                      productosMasVendidos.map(
                        (item, index) => {

                          const producto =
                            obtenerProducto(
                              item.id_producto
                            );

                          return (

                            <tr key={item.id_producto}>

                              <td>

                                <span className="badge bg-light text-dark">
                                  #{index + 1}
                                </span>

                              </td>

                              <td className="fw-semibold">

                                {producto
                                  ? producto.nombre_producto
                                  : "Producto no encontrado"}

                              </td>

                              <td className="text-center">

                                <span className="badge bg-primary-subtle text-primary">
                                  {item.cantidad}
                                </span>

                              </td>

                              <td className="text-end fw-semibold text-success">

                                S/. {item.total.toFixed(2)}

                              </td>

                            </tr>

                          );
                        }
                      )}

                    {/* Sin ventas */}
                    {!cargando &&
                      productosMasVendidos.length === 0 && (

                        <tr>

                          <td
                            colSpan="4"
                            className="text-center text-secondary py-4"
                          >
                            No hay productos vendidos para mostrar.
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

export default Reportes;