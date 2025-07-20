import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RegistrarProductoModal({ onClose, onSave }) {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7270/api/Compras/Registrar_Producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_producto: 0,
          nombre_producto: nombre,
          nroLote: '2-C',
          fec_registro: '2025-07-17T20:41:27.003',
          costo: 20,
          precioVenta: 23.15
        })
      });

      if (response.status === 401) {
        console.warn('No autorizado. Redirigiendo al login.');
        navigate('/');
        return;
      }

      if (!response.ok) {
        console.log('Error en la respuesta:', response);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Datos recibidos:', result);
    } catch (error) {
      console.error('Error en fetch:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre) return;
    fetchData();
    setNombre('');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Registrar Producto</h5>
        </div>
        <div className="card-body">
          
            <div className="mb-3">
              <label className="form-label">Nombre del producto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Aceite de motor"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-success me-2"onClick={handleSubmit}>Guardar</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            </div>
          
        </div>
      </div>
    </div>
  );
}

export default RegistrarProductoModal;
