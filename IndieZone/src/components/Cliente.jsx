import { useState } from "react";
import Alerta from "./Alerta";

function Cliente() {

  // =========================================================
  // FORMULARIO
  // Los nombres coinciden con el backend y PostgreSQL
  // =========================================================

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    telefono: "",
    fecha_registro: ""
  });


  // =========================================================
  // CLIENTE QUE SE ESTÁ EDITANDO
  // null significa que estamos registrando uno nuevo
  // =========================================================

  const [clienteEditando, setClienteEditando] = useState(null);


  // =========================================================
  // ALERTAS
  // =========================================================

  const [alerta, setAlerta] = useState({
    tipo: "",
    mensaje: ""
  });


  // =========================================================
  // DATOS TEMPORALES
  // Luego serán reemplazados por GET /clientes/
  // =========================================================

  const [clientes, setClientes] = useState([

    {
      id_cliente: 1,
      nombre: "Carlos",
      apellido: "Ramírez",
      dni: "12345678",
      correo: "carlos@gmail.com",
      telefono: "987654321",
      fecha_registro: "2026-08-01"
    },

    {
      id_cliente: 2,
      nombre: "María",
      apellido: "Torres",
      dni: "87654321",
      correo: "maria@gmail.com",
      telefono: "912345678",
      fecha_registro: "2026-08-03"
    },

    {
      id_cliente: 3,
      nombre: "Luis",
      apellido: "Fernández",
      dni: "45678912",
      correo: "luis@gmail.com",
      telefono: "934567890",
      fecha_registro: "2026-08-05"
    }

  ]);


  // =========================================================
  // CAMBIAR DATOS DEL FORMULARIO
  // =========================================================

  const cambiarDato = (e) => {

    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });

  };


  // =========================================================
  // MOSTRAR ALERTA
  // =========================================================

  const mostrarAlerta = (tipo, mensaje) => {

    setAlerta({
      tipo,
      mensaje
    });

  };


  // =========================================================
  // CERRAR ALERTA
  // =========================================================

  const cerrarAlerta = () => {

    setAlerta({
      tipo: "",
      mensaje: ""
    });

  };


  // =========================================================
  // LIMPIAR FORMULARIO
  // =========================================================

  const limpiarFormulario = () => {

    setCliente({
      nombre: "",
      apellido: "",
      dni: "",
      correo: "",
      telefono: "",
      fecha_registro: ""
    });

    setClienteEditando(null);

  };


  // =========================================================
  // GUARDAR CLIENTE
  //
  // Por ahora trabaja de forma local.
  // Después aquí irá:
  //
  // POST /clientes/
  //
  // o:
  //
  // PUT /clientes/{id}
  // =========================================================

  const guardarCliente = (e) => {

    e.preventDefault();

    cerrarAlerta();


    // ---------------------------------------------------------
    // Validación sencilla del navegador/frontend.
    //
    // El backend seguirá siendo quien valide realmente.
    // ---------------------------------------------------------

    if (!/^\d{8}$/.test(cliente.dni)) {

      mostrarAlerta(
        "warning",
        "El DNI debe tener exactamente 8 dígitos numéricos."
      );

      return;
    }


    // =========================================================
    // EDITAR
    // =========================================================

    if (clienteEditando !== null) {

      const clientesActualizados = clientes.map((item) => {

        if (item.id_cliente === clienteEditando) {

          return {
            ...item,
            ...cliente
          };

        }

        return item;

      });


      setClientes(clientesActualizados);


      mostrarAlerta(
        "success",
        "Cliente actualizado correctamente."
      );


      limpiarFormulario();

      return;

    }


    // =========================================================
    // REGISTRAR
    // =========================================================

    const nuevoCliente = {

      id_cliente: clientes.length + 1,

      nombre: cliente.nombre,

      apellido: cliente.apellido,

      dni: cliente.dni,

      correo: cliente.correo,

      telefono: cliente.telefono,

      fecha_registro: cliente.fecha_registro

    };


    setClientes([
      ...clientes,
      nuevoCliente
    ]);


    mostrarAlerta(
      "success",
      "Cliente registrado correctamente."
    );


    limpiarFormulario();

  };


  // =========================================================
  // EDITAR CLIENTE
  // =========================================================

  const editarCliente = (item) => {

    setCliente({

      nombre: item.nombre,

      apellido: item.apellido,

      dni: item.dni,

      correo: item.correo,

      telefono: item.telefono,

      fecha_registro: item.fecha_registro

    });


    setClienteEditando(
      item.id_cliente
    );


    mostrarAlerta(
      "info",
      `Editando al cliente ${item.nombre} ${item.apellido}.`
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // =========================================================
  // ELIMINAR CLIENTE
  //
  // Luego aquí utilizaremos:
  // DELETE /clientes/{cliente_id}
  // =========================================================

  const eliminarCliente = (idCliente) => {

    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este cliente?"
    );


    if (!confirmar) {
      return;
    }


    const nuevosClientes = clientes.filter(
      (item) => item.id_cliente !== idCliente
    );


    setClientes(nuevosClientes);


    mostrarAlerta(
      "success",
      "Cliente eliminado correctamente."
    );

  };


  // =========================================================
  // FORMATEAR FECHA
  // =========================================================

  const mostrarFecha = (fecha) => {

    if (!fecha) {
      return "-";
    }

    const partes = fecha.split("-");

    if (partes.length !== 3) {
      return fecha;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

  };


  // =========================================================
  // INTERFAZ
  // =========================================================

  return (

    <div className="container-fluid p-0">


      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="mb-4">

        <h1 className="fw-bold display-6 mb-1">
          Gestión de Clientes
        </h1>

        <p className="text-secondary fs-5 mb-0">
          Registra y administra los clientes de IndieZone
        </p>

      </div>


      {/* =====================================================
          ALERTA
      ===================================================== */}

      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        cerrar={cerrarAlerta}
      />


      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <div className="row g-4">


        {/* ===================================================
            FORMULARIO
        =================================================== */}

        <div className="col-12 col-xl-4">

          <div className="card border-0 shadow-sm rounded-4">


            {/* CABECERA */}

            <div
              className={
                clienteEditando
                  ? "card-header bg-warning-subtle border-0 p-4"
                  : "card-header bg-primary-subtle border-0 p-4"
              }
            >

              <div className="d-flex align-items-center gap-3">

                <span className="fs-2">
                  👤
                </span>


                <div>

                  <h4 className="fw-bold mb-1">

                    {clienteEditando
                      ? "Editar cliente"
                      : "Nuevo cliente"
                    }

                  </h4>


                  <small className="text-secondary">

                    {clienteEditando
                      ? "Modifica los datos seleccionados"
                      : "Completa los datos del cliente"
                    }

                  </small>

                </div>

              </div>

            </div>


            {/* CUERPO */}

            <div className="card-body p-4">

              <form onSubmit={guardarCliente}>


                {/* ===========================================
                    NOMBRE
                =========================================== */}

                <div className="mb-3">

                  <label
                    htmlFor="nombreCliente"
                    className="form-label fw-semibold"
                  >
                    Nombre *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="nombreCliente"
                    name="nombre"
                    placeholder="Ej. Carlos"
                    maxLength="50"
                    value={cliente.nombre}
                    onChange={cambiarDato}
                    required
                  />

                </div>


                {/* ===========================================
                    APELLIDO
                =========================================== */}

                <div className="mb-3">

                  <label
                    htmlFor="apellidoCliente"
                    className="form-label fw-semibold"
                  >
                    Apellido *
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    id="apellidoCliente"
                    name="apellido"
                    placeholder="Ej. Ramírez"
                    maxLength="50"
                    value={cliente.apellido}
                    onChange={cambiarDato}
                    required
                  />

                </div>


                {/* ===========================================
                    DNI
                =========================================== */}

                <div className="mb-3">

                  <label
                    htmlFor="dniCliente"
                    className="form-label fw-semibold"
                  >
                    DNI *
                  </label>


                  <input
                    type="text"
                    inputMode="numeric"
                    className="form-control"
                    id="dniCliente"
                    name="dni"
                    placeholder="Ej. 12345678"
                    maxLength="8"
                    value={cliente.dni}
                    onChange={cambiarDato}
                    required
                  />


                  <div className="form-text">
                    Debe contener exactamente 8 números.
                  </div>

                </div>


                {/* ===========================================
                    CORREO
                =========================================== */}

                <div className="mb-3">

                  <label
                    htmlFor="correoCliente"
                    className="form-label fw-semibold"
                  >
                    Correo electrónico *
                  </label>


                  <input
                    type="email"
                    className="form-control"
                    id="correoCliente"
                    name="correo"
                    placeholder="Ej. cliente@gmail.com"
                    maxLength="100"
                    value={cliente.correo}
                    onChange={cambiarDato}
                    required
                  />

                </div>


                {/* ===========================================
                    TELÉFONO
                =========================================== */}

                <div className="mb-3">

                  <label
                    htmlFor="telefonoCliente"
                    className="form-label fw-semibold"
                  >
                    Teléfono *
                  </label>


                  <input
                    type="tel"
                    className="form-control"
                    id="telefonoCliente"
                    name="telefono"
                    placeholder="Ej. 987654321"
                    maxLength="15"
                    value={cliente.telefono}
                    onChange={cambiarDato}
                    required
                  />

                </div>


                {/* ===========================================
                    FECHA REGISTRO
                =========================================== */}

                <div className="mb-4">

                  <label
                    htmlFor="fechaCliente"
                    className="form-label fw-semibold"
                  >
                    Fecha de registro *
                  </label>


                  <input
                    type="date"
                    className="form-control"
                    id="fechaCliente"
                    name="fecha_registro"
                    value={cliente.fecha_registro}
                    onChange={cambiarDato}
                    required
                  />

                </div>


                {/* ===========================================
                    BOTONES
                =========================================== */}

                <div className="d-grid gap-2">

                  <button
                    type="submit"
                    className={
                      clienteEditando
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                  >

                    {clienteEditando
                      ? "💾 Guardar cambios"
                      : "+ Registrar cliente"
                    }

                  </button>


                  {clienteEditando && (

                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={limpiarFormulario}
                    >
                      Cancelar edición
                    </button>

                  )}

                </div>

              </form>

            </div>

          </div>

        </div>


        {/* ===================================================
            TABLA DE CLIENTES
        =================================================== */}

        <div className="col-12 col-xl-8">

          <div className="card border-0 shadow-sm rounded-4">


            {/* CABECERA */}

            <div className="card-header bg-white border-0 p-4">

              <div className="row align-items-center g-3">


                <div className="col">

                  <div className="d-flex align-items-center gap-3">

                    <span className="fs-2">
                      👥
                    </span>


                    <div>

                      <h4 className="fw-bold mb-1">
                        Clientes registrados
                      </h4>


                      <small className="text-secondary">

                        Total: {clientes.length} clientes

                      </small>

                    </div>

                  </div>

                </div>


                <div className="col-12 col-sm-auto">

                  <span className="badge bg-primary-subtle text-primary fs-6">

                    {clientes.length} registrados

                  </span>

                </div>

              </div>

            </div>


            {/* TABLA */}

            <div className="card-body pt-0">

              <div className="table-responsive">

                <table className="table table-hover align-middle mb-0">


                  {/* CABECERA TABLA */}

                  <thead className="table-light">

                    <tr>

                      <th>ID</th>

                      <th>Cliente</th>

                      <th>DNI</th>

                      <th>Contacto</th>

                      <th>Registro</th>

                      <th className="text-center">
                        Acciones
                      </th>

                    </tr>

                  </thead>


                  {/* CUERPO */}

                  <tbody>

                    {clientes.map((item) => (

                      <tr key={item.id_cliente}>


                        {/* ID */}

                        <td className="text-secondary">

                          #{item.id_cliente}

                        </td>


                        {/* CLIENTE */}

                        <td>

                          <div className="fw-semibold">

                            {item.nombre} {item.apellido}

                          </div>

                          <small className="text-secondary">

                            {item.correo}

                          </small>

                        </td>


                        {/* DNI */}

                        <td>

                          <span className="badge text-bg-light">

                            {item.dni}

                          </span>

                        </td>


                        {/* TELÉFONO */}

                        <td>

                          <span>
                            📞 {item.telefono}
                          </span>

                        </td>


                        {/* FECHA */}

                        <td>

                          {mostrarFecha(
                            item.fecha_registro
                          )}

                        </td>


                        {/* ACCIONES */}

                        <td>

                          <div className="d-flex justify-content-center gap-2">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                editarCliente(item)
                              }
                            >
                              ✏️
                              <span className="d-none d-lg-inline ms-1">
                                Editar
                              </span>
                            </button>


                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                eliminarCliente(
                                  item.id_cliente
                                )
                              }
                            >
                              🗑️
                              <span className="d-none d-lg-inline ms-1">
                                Eliminar
                              </span>
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}


                    {/* =======================================
                        TABLA VACÍA
                    ======================================= */}

                    {clientes.length === 0 && (

                      <tr>

                        <td
                          colSpan="6"
                          className="text-center py-5 text-secondary"
                        >

                          No hay clientes registrados.

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

export default Cliente;