import React from 'react';

export function ProductoVentaRow({ index, item, productos, onChange }) {
  return (
    <div className="border rounded p-3 mb-3 bg-light">
      <div className="row fw-bold mb-2 text-center">
        <div className="col-md-2">Producto</div>
        <div className="col-md-2">Cantidad</div>
        <div className="col-md-2">Precio</div>
        <div className="col-md-2">Subtotal</div>
        <div className="col-md-2">IGV</div>
        <div className="col-md-2">Total</div>
      </div>

      <div className="row mb-2">
        <div className="col-md-2">
          <select
            className="form-select"
            value={item.id_producto}
            onChange={(e) => onChange(index, 'id_producto', e.target.value)}
          >
            <option value="">Seleccione producto</option>
            {productos.map((p) => (
              <option key={p.id_producto} value={p.id_producto}>
                {p.nombre_producto} - Stock: {p.stock_actual} - S/. {p.precioVenta}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            value={item.cantidad}
            min={1}
            onChange={(e) => onChange(index, 'cantidad', e.target.value)}
            placeholder="Cantidad"
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control bg-secondary-subtle"
            value={item.precio ?? ''}
            readOnly
            placeholder="Precio"
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control bg-secondary-subtle"
            value={item.sub_Total ?? ''}
            readOnly
            placeholder="Subtotal"
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control bg-secondary-subtle"
            value={item.igv ?? ''}
            readOnly
            placeholder="IGV"
          />
        </div>

        <div className="col-md-2">
          <input
            type="text"
            className="form-control bg-secondary-subtle"
            value={item.total ?? ''}
            readOnly
            placeholder="Total"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductoVentaRow;
