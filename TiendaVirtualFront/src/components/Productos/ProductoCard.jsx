/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "../../css/producard.css";

export function ProductoCard({ produc }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/vistaproducto", {
      state: { producto: produc },
    });
  };

  return (
    <div className="producto-card" onClick={handleCardClick}>
      <img
        className="logo"
        src={`http://127.0.0.1:8000${produc.logo}`}
        alt={produc.nombre}
      />
      <h1>{produc.nombre}</h1>
      <p>{produc.precio}</p>
      <hr />
    </div>
  );
}
