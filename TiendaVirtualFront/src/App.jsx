import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navegacion } from "./components/Navegacion/Navegacion";
import { Home } from "./pages/Home";
import { PaginaProductos } from "./pages/PaginaProductos";
import { VistaProducto } from "./pages/VistaProducto";
import { PaginaCarrito } from "./pages/PaginaCarrito";
import { EstadoCarrito } from "./context/EstadoCarrito";

function App() {
  return (
    <EstadoCarrito>
      <BrowserRouter>
      <div className="contenedor-principal">
        <Navegacion />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/paginaproductos/:id/:clasificacion" element={<PaginaProductos />} />
          <Route path="/paginaproductos" element={<PaginaProductos />} />
          <Route path="/vistaproducto/" element={<VistaProducto />} />
         <Route path="/paginacarrito/" element={<PaginaCarrito />} />
        </Routes>
        </div>
      </BrowserRouter>
    </EstadoCarrito>
  );
}
export default App;
