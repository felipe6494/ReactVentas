import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoVentaRow from './ProductoVentaRow';

export function VentaFormulario() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [items, setItems] = useState([{ id_producto: '', cantidad: 1 }]);
  const [subTotalGeneral, setSubTotalGeneral] = useState(0);
  const [igvGeneral, setIgvGeneral] = useState(0);
  const [totalGeneral, setTotalGeneral] = useState(0);
  const token = localStorage.getItem('token');
  const ids = [1];

  const handleClick = () => navigate('/componentes/CompraFormulario');
  const handleClick2 = () => navigate('/componentes/KardexVista');
  const handleClick3 = () => navigate('/componentes/VentaFormulario');
  const handleClick4 = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch(`https://localhost:7270/api/Compras/Listar_Kardex?id=${ids}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
              console.warn('No autorizado. Redirigiendo al login o mostrando mensaje.');
        // Por ejemplo: redirigir al login o mostrar alerta
                navigate('/');
           return;
           
      }
      const data = await response.json();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const handleItemChange = (index, field, value) => {
    const nuevosItems = [...items];
    nuevosItems[index][field] = value;

    const producto = productos.find(p => p.id_producto == nuevosItems[index].id_producto);
    const precio = producto?.precioVenta || 0;
    const stock = producto?.stock_actual || 0;
    const cantidad = parseFloat(nuevosItems[index].cantidad || 0);

    if (cantidad > stock) {
      alert('La cantidad no puede ser mayor al stock disponible');
      nuevosItems[index].cantidad = stock;
      return;
    }

    const sub_Total = cantidad * precio;
    const igv = sub_Total * 0.18;
    const total = sub_Total + igv;

    nuevosItems[index].precio = precio;
    nuevosItems[index].stock_actual = stock;
    nuevosItems[index].sub_Total = sub_Total.toFixed(2);
    nuevosItems[index].igv = igv.toFixed(2);
    nuevosItems[index].total = total.toFixed(2);

    setItems(nuevosItems);
  };

  useEffect(() => {
    const sub = items.reduce((acc, item) => acc + parseFloat(item.sub_Total || 0), 0);
    const igv = items.reduce((acc, item) => acc + parseFloat(item.igv || 0), 0);
    const tot = items.reduce((acc, item) => acc + parseFloat(item.total || 0), 0);

    setSubTotalGeneral(sub.toFixed(2));
    setIgvGeneral(igv.toFixed(2));
    setTotalGeneral(tot.toFixed(2));
  }, [items]);

  const handleAgregarFila = () => {
    setItems([...items, { id_producto: '', cantidad: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const venta = {
      id_ventaCab: 0,
      fecRegistro: new Date().toISOString(),
      subTotal: parseFloat(subTotalGeneral),
      igv: parseFloat(igvGeneral),
      total: parseFloat(totalGeneral),
      detalles: items.map(i => ({
        id_producto: parseInt(i.id_producto),
        cantidad: parseFloat(i.cantidad),
        precio: parseFloat(i.precio),
        sub_Total: parseFloat(i.sub_Total),
        igv: parseFloat(i.igv),
        total: parseFloat(i.total)
      }))
    };

    const response = await fetch('https://localhost:7270/api/Ventas/Registrar_Venta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(venta)
    });

    if (response.ok) {
      alert('Venta registrada correctamente');
      setItems([{ id_producto: '', cantidad: 1 }]);
    } else {
      alert('Error al registrar venta');
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <button className="btn btn-outline-primary me-2" onClick={handleClick}>Compras</button>
        <button className="btn btn-outline-info me-2" onClick={handleClick2}>Kardex</button>
        <button className="btn btn-outline-success" onClick={handleClick3}>Ventas</button>
         <button className="btn btn-outline-success" onClick={handleClick4}>Cerrar sesion</button>
     
      </div>

      <div className="card">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Registrar Venta</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {items.map((item, idx) => (
              <ProductoVentaRow
                key={idx}
                index={idx}
                item={item}
                productos={productos}
                onChange={handleItemChange}
              />
            ))}

            <div className="mb-3">
              <button type="button" className="btn btn-secondary" onClick={handleAgregarFila}>
                + Agregar producto
              </button>
            </div>

            <div className="mb-3">
              <p><strong>Subtotal General:</strong> S/ {subTotalGeneral}</p>
              <p><strong>IGV General:</strong> S/ {igvGeneral}</p>
              <p><strong>Total General:</strong> S/ {totalGeneral}</p>
            </div>

            <button type="submit" className="btn btn-primary">Guardar Venta</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VentaFormulario;
