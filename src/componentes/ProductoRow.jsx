import React from 'react';

export function ProductoRow({ index, item, productos, onChange, onAgregarProducto }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Producto</label>
            <select
              className="form-select"
              value={item.id_producto}
              onChange={(e) => onChange(index, 'id_producto', e.target.value)}
            >
              <option value="">Seleccione un producto</option>
              {productos.map(p => (
                <option key={p.id_producto} value={p.id_producto}>
                  {p.nombre_producto}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control"
              value={item.cantidad}
              min="1"
              onChange={(e) => onChange(index, 'cantidad', e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Precio</label>
            <input
              type="text"
              className="form-control"
              value={item.precio ?? ''}
              onChange={(e) => onChange(index, 'precio', e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">SubTotal</label>
            <input
              type="text"
              className="form-control"
              value={item.sub_Total ?? ''}
              disabled
            />
          </div>

          <div className="col-md-1">
            <label className="form-label">IGV</label>
            <input
              type="text"
              className="form-control"
              value={item.igv ?? ''}
              disabled
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Total</label>
            <input
              type="text"
              className="form-control"
              value={item.Total ?? ''}
              disabled
            />
          </div>

          <div className="col-12 mt-2">
            <button type="button" onClick={onAgregarProducto} className="btn btn-primary">
              Registrar producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoRow;
