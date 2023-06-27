import axios from "axios";

const productoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/productos",
});


export const getProductosPorCategoria = (id, clasificacion) => productoApi.get("/por_categoria/", { params: { id: id, clasificacion: clasificacion } });

export const getCategoriaSubcategoria = () => productoApi.get("/getCategoriaSubcategoria/");







