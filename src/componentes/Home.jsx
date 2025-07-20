import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

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
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-5 text-center" style={{ minWidth: '300px' }}>
        <h1 className="mb-4">Bienvenido</h1>

        <div className="d-grid gap-3">
          <button onClick={handleClick} className="btn btn-primary">
            Compras
          </button>

          <button onClick={handleClick2} className="btn btn-secondary">
            Kardex
          </button>

          <button onClick={handleClick3} className="btn btn-success">
            Venta
          </button>
          <button onClick={handleClick4} className="btn btn-success">
            Cerrar sesion
          </button>
        </div>
      </div>
    </div>
  );
}
