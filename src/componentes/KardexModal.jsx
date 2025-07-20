import React, { useEffect, useState } from 'react';

export function KardexModal({ idProducto, onClose }) {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovimientos = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`https://localhost:7270/api/Compras/Listar_Movimientos?id=${idProducto}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener movimientos');
        }

        const data = await response.json();
        setMovimientos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovimientos();
  }, [idProducto]);

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Movimientos del Producto ID {idProducto}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Fecha Registro</th>
                    <th>Tipo Movimiento</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {movimientos.length > 0 ? (
                    movimientos.map((mov, i) => (
                      <tr key={i}>
                        <td>{new Date(mov.fecRegistro).toLocaleDateString()}</td>
                        <td>{mov.tipoMovimiento}</td>
                        <td>{mov.cantidad}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">No hay movimientos</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KardexModal;
