import { useState } from "react";

// Componentes
import Navbar from "./components/navbar/Navbar";

// Páginas
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import RegistroProducto from "./pages/productos/RegistroProducto";
import Categoria from "./pages/categorias/Categoria";
import Oferta from "./pages/ofertas/Oferta";
import Cliente from "./pages/clientes/Cliente";
import Ventas from "./pages/ventas/Ventas";
import DetalleVenta from "./pages/ventas/DetalleVenta";
import Reportes from "./pages/reportes/Reportes";

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [pagina, setPagina] = useState("dashboard");

  // Login
  if (!sesionIniciada) {
    return (
      <Login
        setSesionIniciada={setSesionIniciada}
      />
    );
  }

  return (
    <div className="min-vh-100 bg-body-tertiary">

      {/* Menú */}
      <Navbar
        pagina={pagina}
        setPagina={setPagina}
        setSesionIniciada={setSesionIniciada}
      />

      {/* Páginas */}
      <main className="container-fluid px-3 px-md-4 px-lg-5 py-4">

        {pagina === "dashboard" && (
          <Dashboard setPagina={setPagina} />
        )}

        {pagina === "producto" && (
          <RegistroProducto setPagina={setPagina} />
        )}

        {pagina === "categoria" && (
          <Categoria />
        )}

        {pagina === "oferta" && (
          <Oferta />
        )}

        {pagina === "cliente" && (
          <Cliente />
        )}

        {pagina === "ventas" && (
          <Ventas setPagina={setPagina} />
        )}

        {pagina === "detalleVenta" && (
          <DetalleVenta setPagina={setPagina} />
        )}

        {pagina === "reportes" && (
          <Reportes />
        )}

      </main>

    </div>
  );
}
export default App;