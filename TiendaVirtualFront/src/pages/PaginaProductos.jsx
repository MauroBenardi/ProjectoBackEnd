import { useParams } from "react-router-dom";
import { ProductAll } from "../components/Productos/ProductAll";

export function PaginaProductos() {
  const { id, clasificacion } = useParams();
  return <ProductAll id={id} clasificacion={clasificacion} />;
}
