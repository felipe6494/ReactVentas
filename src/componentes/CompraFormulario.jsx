import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductoRow from './ProductoRow';
import RegistrarProductoModal from './RegistrarProductoModal.jsx';

export function CompraFormulario() {
    const navigate = useNavigate();
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const token = localStorage.getItem('token');
  const [items, setItems] = useState([{ id_producto: '', cantidad: 1 }]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [subTotalGeneral, setSubTotalGeneral] = useState(0);
  const [igvGeneral, setIgvGeneral] = useState(0);
  const [totalGeneral, setTotalGeneral] = useState(0);
  const handleAgregarFila = () => {
    setItems([...items, { id_producto: '', cantidad: 1 }]);
  };
const handleClick2 = () => {
    navigate('/componentes/KardexVista');
  };
    const handleClick = () => {
    navigate('/componentes/CompraFormulario');
  }; 
  const handleClick3 = () => {
    navigate('/componentes/VentaFormulario');
  };
  const handleClick4 = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
 const handleItemChange = (index, field, value) => {
  const nuevosItems = [...items];
  nuevosItems[index][field] = value;

  if (field === 'precio') {
    const precio = parseFloat(value);
    const cantidad = parseFloat(nuevosItems[index]['cantidad']) || 0; 
    const SubTotal=precio*cantidad;
    const igv = !isNaN(precio) ? parseFloat((precio * 0.18*cantidad).toFixed(2)) : 0;
    const Total = !isNaN(SubTotal) ? parseFloat((SubTotal + igv).toFixed(2)) : 0;
    
    nuevosItems[index]['sub_Total'] = SubTotal;
    nuevosItems[index]['igv'] = igv;
    nuevosItems[index]['Total'] = Total;
  }
   

  setItems(nuevosItems);
};
 useEffect(() => {
    const subTotal = items.reduce((acc, item) => acc + (parseFloat(item.sub_Total) || 0), 0);
    const igv = items.reduce((acc, item) => acc + (parseFloat(item.igv) || 0), 0);
    const total = items.reduce((acc, item) => acc + (parseFloat(item.Total) || 0), 0);

    setSubTotalGeneral(subTotal);
    setIgvGeneral(igv);
    setTotalGeneral(total);
  }, [items]);

  const fetchDataC = async () => {
      try {
        const response = await fetch('https://localhost:7270/api/Compras/Registrar_Compra', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },body: JSON.stringify(
            {
            "id_CompraCab": 0,
            "fecRegistro": "2025-07-19T01:04:55.738Z",
            "subTotal": subTotalGeneral,
            "igv": igvGeneral,
            "total": totalGeneral,
            "detalles": items
                    }
          )
        });
        if (response.status === 401) {
            console.warn('No autorizado. Redirigiendo al login o mostrando mensaje.');
      // Por ejemplo: redirigir al login o mostrar alerta
      navigate('/componentes/Formulario');
            Seterror2(true)
         return;
         
    }
        if (!response.ok) {
            console.log('',response);
           throw new Error(`Error HTTP: ${response.status}`);
          
        }

        const result = await response.json();
        console.log('Datos recibidos:', result);
  setItems([{
  id_producto: '',
  cantidad: 1,
  precio: '',
  sub_Total: '',
  igv: '',
  Total: ''
}]);
setSubTotalGeneral(0);
setIgvGeneral(0);
setTotalGeneral(0);

// Opcional: mostrar mensaje de éxito
alert('Compra registrada exitosamente');
      } catch (error) {
        console.error('Error en fetch:', error);
        
      }
    };

   useEffect(() => {
  const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7270/api/Compras/Listar_producto?id=0', {
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
        if (!response.ok) {
            console.log('',response);
           throw new Error(`Error HTTP: ${response.status}`);
          
        }

        const result = await response.json();
        console.log('Datos recibidos:', result);
      setProductosDisponibles(result);
      } catch (error) {
        console.error('Error en fetch:', error);
        
      }
    };
    fetchData();
     }, []);



  const handleRegistrarProducto = (nuevoProducto) => {
    setProductosDisponibles([...productosDisponibles, nuevoProducto]);
    setMostrarModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDataC();
    console.log('Compra registrada con productos:', items);
    // Aquí podrías hacer un POST al backend con los datos
  };
     

  return (
  <form onSubmit={handleSubmit} className="container mt-4">
    <div className="mb-3 d-flex gap-2">
      <button type="button" onClick={handleClick} className="btn btn-outline-primary">Compras</button>
      <button type="button" onClick={handleClick2} className="btn btn-outline-secondary">Kardex</button>
      <button type="button" onClick={handleClick3} className="btn btn-outline-success">Ventas</button>
      <button type="button" onClick={handleClick4} className="btn btn-outline-success">Cerrar sesion</button>
     
    </div>

    <h2 className="mb-4">Registrar Compra</h2>

    {items.map((item, idx) => (
      <ProductoRow
        key={item.id_producto || idx}
        index={idx}
        item={item}
        productos={productosDisponibles}
        onChange={handleItemChange}
        onAgregarProducto={() => setMostrarModal(true)}
      />
    ))}

    <button
      type="button"
      onClick={handleAgregarFila}
      className="btn btn-success mt-3"
    >
      + Agregar producto
    </button>

    <div className="mt-4">
      <button type="submit" className="btn btn-warning">Guardar Compra</button>
    </div>

    <div className="mt-4 text-end">
      <p><strong>Subtotal:</strong> S/ {subTotalGeneral.toFixed(2)}</p>
      <p><strong>IGV:</strong> S/ {igvGeneral.toFixed(2)}</p>
      <p><strong>Total:</strong> S/ {totalGeneral.toFixed(2)}</p>
    </div>

    {mostrarModal && (
      <RegistrarProductoModal
        onClose={() => setMostrarModal(false)}
        onSave={handleRegistrarProducto}
      />
    )}
  </form>
);

}

export default CompraFormulario;