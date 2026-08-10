import { useState } from "react";

import Login from "./components/Login";
import Navbar from "./components/Navbar";

import Dashboard from "./components/Dashboard";
import RegistroProducto from "./components/RegistroProducto";
import Categoria from "./components/Categoria";
import Oferta from "./components/Oferta";
import Ventas from "./components/Ventas";
import DetalleVenta from "./components/DetalleVenta";
import Cliente from "./components/Cliente";
import Reportes from "./components/Reportes";


function App() {

  const [sesionIniciada, setSesionIniciada] = useState(false);

  const [pagina, setPagina] = useState("dashboard");


  // =========================================================
  // LOGIN
  // =========================================================

  if (!sesionIniciada) {

    return (
      <Login
        setSesionIniciada={setSesionIniciada}
      />
    );

  }


  // =========================================================
  // SISTEMA
  // =========================================================

  return (
    <div className="min-vh-100 bg-body-tertiary">


      {/* NAVBAR */}

      <Navbar
        pagina={pagina}
        setPagina={setPagina}
        setSesionIniciada={setSesionIniciada}
      />


      {/* CONTENIDO */}

      <main className="container-fluid px-3 px-md-4 px-lg-5 py-4">


        {/* DASHBOARD */}

        {pagina === "dashboard" && (

          <Dashboard
            setPagina={setPagina}
          />

        )}


        {/* PRODUCTOS */}

        {pagina === "producto" && (

          <RegistroProducto
            setPagina={setPagina}
          />

        )}


        {/* CATEGORÍAS */}

        {pagina === "categoria" && (

          <Categoria />

        )}


        {/* OFERTAS */}

        {pagina === "oferta" && (

          <Oferta />

        )}


        {/* VENTAS */}

        {pagina === "ventas" && (

          <Ventas
            setPagina={setPagina}
          />

        )}


        {/* DETALLE DE VENTA */}

        {pagina === "detalleVenta" && (

          <DetalleVenta
            setPagina={setPagina}
          />

        )}


        {/* CLIENTES */}

        {pagina === "cliente" && (

          <Cliente />

        )}


        {/* REPORTES */}

        {pagina === "reportes" && (

          <Reportes />

        )}

      </main>

    </div>
  );
}

export default App;