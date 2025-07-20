import React, { useState, useEffect } from 'react';
import KardexModal from './KardexModal';
import { useNavigate } from 'react-router-dom';

export function KardexVista() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const token = localStorage.getItem('token');

  const handleClick = () => navigate('/componentes/CompraFormulario');
  const handleClick2 = () => navigate('/componentes/KardexVista');
  const handleClick3 = () => navigate('/componentes/VentaFormulario');
  const handleClick4 = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchAllKardex = async () => {
      try {
        const response = await fetch(`https://localhost:7270/api/Compras/Listar_Kardex?id=1`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 401) {
              console.warn('No autorizado. Redirigiendo al login o mostrando mensaje.');
        // Por ejemplo: redirigir al login o mostrar alerta           
                navigate('/');
           return;
           
      }
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        }
      } catch (err) {
        console.error(`Error al obtener Kardex`, err);
      }
    };

    fetchAllKardex();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center gap-2 mb-4">
        <button className="btn btn-primary" onClick={handleClick}>Compras</button>
        <button className="btn btn-secondary" onClick={handleClick2}>Kardex</button>
        <button className="btn btn-success" onClick={handleClick3}>Ventas</button>
         <button className="btn btn-outline-success" onClick={handleClick4}>Cerrar sesion</button>
      </div>

      <h2 className="text-center mb-4">Lista Kardex de Productos</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Stock Actual</th>
              <th>Costo</th>
              <th>Precio Venta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id_producto}>
                <td>{p.id_producto}</td>
                <td>{p.nombre_producto}</td>
                <td>{p.stock_actual}</td>
                <td>{p.costo}</td>
                <td>{p.precioVenta}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => setProductoSeleccionado(p.id_producto)}
                  >
                    Ver Movimientos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productoSeleccionado && (
        <KardexModal
          idProducto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default KardexVista;
