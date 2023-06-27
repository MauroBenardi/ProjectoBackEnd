import { useLocation } from "react-router-dom";
import {VistaPrd} from '../components/Productos/VistaPrd';

export function VistaProducto() {
  const location = useLocation();
  const { producto, producId } = location.state; 
  return (
    <div>
      <VistaPrd id={producId} produc={producto} />
    </div>

  );

}
